#!/usr/bin/env bash
# Deploy the built site to the `main` branch on origin.
#
# Publishes `docs/` (the `npm run build` output) plus `README.md` and
# `.gitignore` as the entire contents of `main`. GitHub Pages is configured
# to serve `main` /docs, so pushing this branch updates the live site.
#
# Usage: ./scripts/deploy.sh [--yes]
#   --yes   skip the confirmation prompt before force-pushing to origin/main

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

DEPLOY_BRANCH="main"
REMOTE="origin"
AUTO_YES="false"

for arg in "$@"; do
    case "$arg" in
        --yes|-y) AUTO_YES="true" ;;
        *) echo "unknown flag: $arg" >&2; exit 2 ;;
    esac
done

# Refuse to run from main itself — this script rewrites main.
CURRENT_BRANCH="$(git symbolic-ref --short HEAD)"
if [ "$CURRENT_BRANCH" = "$DEPLOY_BRANCH" ]; then
    echo "error: currently on '$DEPLOY_BRANCH'. Run this from a source branch (e.g. svelte-dev)." >&2
    exit 1
fi

# Clean working tree so we can safely check the source branch out again at the end.
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "error: working tree has uncommitted changes. Commit or stash first." >&2
    exit 1
fi

echo "==> Installing dependencies from lockfile"
npm ci

echo "==> Building static site"
npm run build

if [ ! -f "docs/index.html" ]; then
    echo "error: docs/index.html missing after build — aborting." >&2
    exit 1
fi

if [ "$AUTO_YES" != "true" ]; then
    echo
    echo "About to force-push a new '$DEPLOY_BRANCH' to '$REMOTE' with:"
    echo "  - docs/        (build output, $(find docs -type f | wc -l | tr -d ' ') files)"
    echo "  - README.md"
    echo "  - .gitignore"
    read -r -p "Proceed? [y/N] " reply
    case "$reply" in
        y|Y|yes|YES) ;;
        *) echo "aborted."; exit 0 ;;
    esac
fi

# Build an orphan commit containing only the artifacts, then move `main` onto it.
TMP_BRANCH="_deploy-$(date +%s)"

cleanup() {
    # Always return to the source branch, even if something fails mid-flight.
    git checkout -q "$CURRENT_BRANCH" 2>/dev/null || true
    git branch -D "$TMP_BRANCH" 2>/dev/null || true
}
trap cleanup EXIT

echo "==> Creating orphan deploy commit"
git checkout --orphan "$TMP_BRANCH"
git reset -q                                # unstage everything from HEAD
git add -f docs README.md .gitignore
git commit -q -m "🚀 deploy: $(git -c core.pager=cat log -1 --format=%h "$CURRENT_BRANCH") from $CURRENT_BRANCH"

echo "==> Moving $DEPLOY_BRANCH to the new commit"
git branch -f "$DEPLOY_BRANCH" "$TMP_BRANCH"

echo "==> Pushing $DEPLOY_BRANCH to $REMOTE (force-with-lease)"
git push "$REMOTE" "$DEPLOY_BRANCH" --force-with-lease

echo "==> Done. Live site should update in ~1 minute."
