/**
 * Personal profile data — the single source of truth for name, bio, avatar,
 * and contact links. Changing a field here ripples through the header,
 * greeting, topics, and metadata automatically.
 */
export const profile = {
	name: 'Kasidech Chumkun',
	nickname: 'Kaw',
	tagline:
		'Data Scientist & ML Engineer · AI agents, LLM infrastructure, cloud-native backend systems',
	avatar: 'images/profile-pictures/icon-postelb.png',
	bio: "Hi, I'm Kaw, a Data Scientist with 4+ years building ML systems, data pipelines, and AI infrastructure in production. I'm currently at Osotspa, where I architected the company's internal AI platform and shipped applications on top of it, including a RAG system and an LLM-powered OCR pipeline on LINE. Before that I worked on computer vision at EATLAB and large-scale NLP data processing at Omniscien Technologies, where I contributed to the ParaCrawl synthesized data release 2.",
	currentRole: 'Data Scientist at Osotspa · Founder at Hedgehoglet',
	location: 'Bangkok, Thailand'
} as const;

/** One row in the contact grid — rendered by `ContactGrid.svelte`. */
export interface Contact {
	/** Display label (e.g. `'Email'`, `'GitHub'`). */
	name: string;
	/** Destination URL; opened in a new tab with `noopener noreferrer`. */
	url: string;
	/** Static-asset path for the icon, resolved via `asset()`. */
	icon: string;
	/** Short handle shown under the name (e.g. `'@Kawaeee'`). */
	handle: string;
}

/** External channels where I can be reached. */
export const contacts: Contact[] = [
	{
		name: 'Email',
		handle: 'kaw@hedgehoglet.dev',
		url: 'mailto:kaw@hedgehoglet.dev',
		icon: 'images/contacts/email.png'
	},
	{
		name: 'GitHub',
		handle: '@Kawaeee',
		url: 'https://github.com/kawaeee',
		icon: 'images/contacts/github.png'
	},
	{
		name: 'LinkedIn',
		handle: 'kasidech-kaw',
		url: 'https://www.linkedin.com/in/kasidech-kaw',
		icon: 'images/contacts/linkedin.png'
	},
	{
		name: 'Medium',
		handle: '@kawae',
		url: 'https://kawae.medium.com',
		icon: 'images/contacts/medium.png'
	}
];
