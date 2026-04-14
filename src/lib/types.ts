import type { Experience } from './data/experiences';
import type { Project } from './data/projects';
import type { Contact } from './data/profile';
import type { SkillGroup } from './data/skills';

export type MessageContent =
	| { kind: 'text'; text: string }
	| { kind: 'experiences'; items: Experience[] }
	| { kind: 'projects'; items: Project[] }
	| { kind: 'contacts'; items: Contact[] }
	| { kind: 'skills'; groups: SkillGroup[] }
	| { kind: 'suggestions'; items: string[] };

export interface ChatMessage {
	id: number;
	role: 'user' | 'bot';
	content: MessageContent[];
	time: string;
}
