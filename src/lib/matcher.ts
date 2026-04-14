import { topics, type TopicId, type TopicDef } from './data/topics';

const STOPWORDS = new Set([
	'a',
	'an',
	'the',
	'and',
	'or',
	'but',
	'so',
	'of',
	'to',
	'for',
	'in',
	'on',
	'at',
	'by',
	'is',
	'are',
	'am',
	'was',
	'were',
	'be',
	'been',
	'do',
	'does',
	'did',
	'it',
	'this',
	'that',
	'these',
	'those',
	'me',
	'my',
	'mine',
	'i'
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
			if (text.includes(phrase.toLowerCase())) score += cfg.phraseWeight;
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
		if (score > best.score) best = { id: topic.id, score };
	}

	if (best.score < cfg.minScore) return { id: 'fallback', score: best.score };
	return best;
}
