import type { MessageContent } from '$lib/types';
import { profile, contacts } from './profile';
import { experiences } from './experiences';
import { projects } from './projects';
import { skillGroups } from './skills';

export type TopicId =
	| 'bio'
	| 'experience'
	| 'projects'
	| 'skills'
	| 'contact'
	| 'greeting'
	| 'thanks'
	| 'help'
	| 'fallback';

export interface TopicDef {
	id: TopicId;
	/** Words that when present boost the score. Match-any. */
	keywords: string[];
	/** Exact-phrase hits score higher than single-word hits. */
	phrases?: string[];
	/** Builds the reply blocks. */
	reply: () => MessageContent[];
}

const r = (text: string): MessageContent => ({ kind: 'text', text });

export const topics: TopicDef[] = [
	{
		id: 'bio',
		keywords: [
			'about',
			'bio',
			'yourself',
			'you',
			'who',
			'intro',
			'introduce',
			'background',
			'story',
			'kaw',
			'kasidech'
		],
		phrases: ['about you', 'who are you', 'tell me about'],
		reply: () => [
			r(profile.bio),
			r(`Currently: ${profile.currentRole}. Based in ${profile.location}.`)
		]
	},
	{
		id: 'experience',
		keywords: [
			'experience',
			'work',
			'job',
			'jobs',
			'career',
			'company',
			'employer',
			'resume',
			'cv',
			'history',
			'role',
			'roles',
			'where'
		],
		phrases: ['work experience', 'where have you worked'],
		reply: () => [
			r("Here's where I've worked, most recent first:"),
			{ kind: 'experiences', items: experiences }
		]
	},
	{
		id: 'projects',
		keywords: [
			'project',
			'projects',
			'portfolio',
			'build',
			'built',
			'made',
			'making',
			'github',
			'side',
			'repo',
			'open-source',
			'opensource'
		],
		phrases: ['side project', 'what have you built', 'your work'],
		reply: () => [
			r('A selection of things I built and open-sourced:'),
			{ kind: 'projects', items: projects }
		]
	},
	{
		id: 'skills',
		keywords: [
			'skill',
			'skills',
			'stack',
			'tech',
			'technology',
			'technologies',
			'tool',
			'tools',
			'language',
			'languages',
			'framework',
			'frameworks',
			'know',
			'use'
		],
		phrases: ['tech stack', 'what do you know', 'what do you use'],
		reply: () => [r("Here's the tech I reach for most:"), { kind: 'skills', groups: skillGroups }]
	},
	{
		id: 'contact',
		keywords: [
			'contact',
			'email',
			'reach',
			'linkedin',
			'social',
			'socials',
			'medium',
			'github',
			'hire',
			'message',
			'dm',
			'connect',
			'talk'
		],
		phrases: ['get in touch', 'how to reach', 'contact you', 'reach out'],
		reply: () => [
			r('Happy to chat — pick whichever works best:'),
			{ kind: 'contacts', items: contacts }
		]
	},
	{
		id: 'greeting',
		keywords: ['hi', 'hello', 'hey', 'yo', 'sup', 'hola', 'howdy', 'greetings'],
		phrases: ["what's up"],
		reply: () => [
			r(`Hey! 👋 I'm ${profile.nickname}. Ask me about my bio, experience, projects, skills, or contact info.`)
		]
	},
	{
		id: 'thanks',
		keywords: ['thanks', 'thank', 'thx', 'cheers', 'ty'],
		reply: () => [r("You're welcome! Anything else you'd like to know?")]
	},
	{
		id: 'help',
		keywords: ['help', 'menu', 'options', 'topics', 'what', 'can', 'ask'],
		phrases: ['what can i ask', 'what can you do', 'help me'],
		reply: () => [
			r('You can ask me about any of these — tap a chip below or type freely:'),
			{
				kind: 'suggestions',
				items: ['About me', 'Experience', 'Projects', 'Skills', 'Contact']
			}
		]
	},
	{
		id: 'fallback',
		keywords: [],
		reply: () => [
			r(
				"Hmm, I'm not sure I caught that. I'm a small canned-response bot — try asking about my bio, experience, projects, skills, or contact."
			),
			{
				kind: 'suggestions',
				items: ['About me', 'Experience', 'Projects', 'Skills', 'Contact']
			}
		]
	}
];

export const topicById = (id: TopicId) =>
	topics.find((t) => t.id === id) ?? topics.find((t) => t.id === 'fallback')!;
