/**
 * Static-asset URL helper.
 *
 * Every image/icon path referenced from a Svelte component must go through
 * `asset()` so it composes with SvelteKit's `base`. This is a user GitHub
 * Pages site (served at the domain root) so `base` is currently `''`, but
 * routing this through `base` keeps the code portable if the site ever moves
 * under a subpath.
 */
import { base } from '$app/paths';
import { chatConfig } from './data/config';

/**
 * Resolve a static-asset path (e.g. `'images/foo.png'`) against the SvelteKit
 * `base` path. Strips any leading slashes from the input so callers can write
 * either `'foo.png'` or `'/foo.png'` without double-slash issues.
 */
export function asset(path: string): string {
	const clean = path.replace(/^\/+/, '');
	return `${base}/${clean}`;
}

/**
 * URL of the site-wide fallback image. Used as the `<img onerror>` target in
 * every card/avatar component — if the real asset 404s, we swap in this one.
 */
export const fallbackImage = () => asset(chatConfig.fallbackImagePath);
