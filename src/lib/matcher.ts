import { topics, type TopicId, type TopicDef } from './data/topics';

const STOPWORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'so', 'of', 'to', 'for', 'in', 'on', 'at', 'by',
    'is', 'are', 'am', 'was', 'were', 'be', 'been', 'do', 'does', 'did', 'it', 'this', 'that',
    'these', 'those', 'me', 'my', 'mine', 'i',
    // --- Expanded to prevent false positives on common words ---
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

function tokenize(input: string): string[] {
    return normalize(input)
        .split(/\s+/)
        .filter((t) => t.length > 0 && !STOPWORDS.has(t));
}

function scoreTopic(topic: TopicDef, text: string, tokens: Set<string>, cfg: MatcherConfig): number {
    if (topic.id === 'fallback') return 0;
    let score = 0;
    
    if (topic.phrases) {
        for (const phrase of topic.phrases) {
            // Normalize the phrase so it matches the stripped user input perfectly
            const normalizedPhrase = normalize(phrase);
            
            // Escape regex characters just in case you ever use symbols in phrases
            const escapedPhrase = normalizedPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // \b ensures we only match whole words, preventing substring traps
            const regex = new RegExp(`\\b${escapedPhrase}\\b`);
            
            if (regex.test(text)) score += cfg.phraseWeight;
        }
    }
    
    for (const kw of topic.keywords) {
        if (tokens.has(kw.toLowerCase())) score += cfg.keywordWeight;
    }
    
    return score;
}

export function matchTopic(
    input: string,
    cfg: MatcherConfig = defaultMatcherConfig
): { id: TopicId; score: number } {
    const normalized = normalize(input);
    const tokens = new Set(tokenize(input));

    let best: { id: TopicId; score: number } = { id: 'fallback', score: 0 };
    
    for (const topic of topics) {
        const score = scoreTopic(topic, normalized, tokens, cfg);
        
        // Strict greater-than means the FIRST topic in topics.ts wins ties.
        // Tip: Order your topics.ts array with specific topics at the top, and generic (hello/help) at the bottom!
        if (score > best.score) best = { id: topic.id, score };
    }

    if (best.score < cfg.minScore) return { id: 'fallback', score: best.score };
    return best;
}