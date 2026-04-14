import { topics, type TopicId } from './data/topics';

const STOPWORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'so', 'of', 'to', 'for', 'in', 'on', 'at', 'by',
    'is', 'are', 'am', 'was', 'were', 'be', 'been', 'do', 'does', 'did', 'it', 'this', 'that',
    'these', 'those', 'me', 'my', 'mine', 'i',
    'you', 'your', 'yours', 'we', 'us', 'our',
    'who', 'what', 'where', 'when', 'why', 'how',
    'can', 'could', 'will', 'would', 'should', 'shall', 'may', 'might'
]);

export interface MatcherConfig {
    /** Minimum score a topic needs to win. Below this we return fallback. */
    minScore: number;
    /** Points per exact-phrase hit. */
    phraseWeight: number;
    /** Points per keyword hit. */
    keywordWeight: number;
}

export const defaultMatcherConfig: MatcherConfig = {
    minScore: 1,
    phraseWeight: 3,
    keywordWeight: 1
};

function normalize(input: string): string {
    return input.toLowerCase().replace(/[^a-z0-9\s']/g, ' ');
}

function tokenize(normalized: string): string[] {
    return normalized.split(/\s+/).filter((t) => t.length > 0 && !STOPWORDS.has(t));
}

function escapeRegex(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Pre-compile phrase regexes once at module load so matchTopic stays cheap on every keystroke.
const compiled = topics.map((topic) => ({
    topic,
    phraseRegexes: (topic.phrases ?? []).map(
        (p) => new RegExp(`\\b${escapeRegex(normalize(p))}\\b`)
    )
}));

// Ties go to the FIRST topic in topics.ts — order specific intents before generic ones.
// Overlapping keywords/phrases across topics (e.g. "work" in both `experience` and `projects`,
// "github" in both `projects` and `contact`) are resolved purely by declaration order, so
// reordering topics.ts will silently reroute matches.
export function matchTopic(
    input: string,
    cfg: MatcherConfig = defaultMatcherConfig
): { id: TopicId; score: number } {
    const normalized = normalize(input);
    const tokens = new Set(tokenize(normalized));

    let best: { id: TopicId; score: number } = { id: 'fallback', score: 0 };
    for (const { topic, phraseRegexes } of compiled) {
        if (topic.id === 'fallback') continue;

        let score = 0;
        for (const regex of phraseRegexes) {
            if (regex.test(normalized)) score += cfg.phraseWeight;
        }
        for (const kw of topic.keywords) {
            if (tokens.has(kw)) score += cfg.keywordWeight;
        }

        if (score > best.score) best = { id: topic.id, score };
    }

    if (best.score < cfg.minScore) return { id: 'fallback', score: best.score };
    return best;
}
