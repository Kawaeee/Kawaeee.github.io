/**
 * Shared chat types.
 *
 * `MessageContent` is the tagged-union wire format between `topics.ts` (which
 * produces it) and `Message.svelte` (which dispatches on `kind` to render the
 * right component). Adding a new content variant requires updating both ends.
 */
import type { Experience } from './data/experiences';
import type { Project } from './data/projects';
import type { Contact } from './data/profile';
import type { SkillGroup } from './data/skills';

/**
 * One block inside a chat message. A single message may contain multiple
 * blocks (e.g. a text intro followed by a `projects` grid). The `kind` field
 * is the discriminant; `Message.svelte` switches on it.
 */
export type MessageContent =
	| { kind: 'text'; text: string }
	| { kind: 'experiences'; items: Experience[] }
	| { kind: 'projects'; items: Project[] }
	| { kind: 'contacts'; items: Contact[] }
	| { kind: 'skills'; groups: SkillGroup[] }
	| { kind: 'suggestions'; items: string[] };

/** A single row in the chat transcript. */
export interface ChatMessage {
	/** Stable key for `{#each}`; assigned monotonically at creation time. */
	id: number;
	/** Who sent it — drives bubble alignment and colour. */
	role: 'user' | 'bot';
	/** Ordered list of blocks to render inside the bubble. */
	content: MessageContent[];
	/** Locale-formatted `HH:MM` string, or `''` during SSR to avoid hydration mismatch. */
	time: string;
}
