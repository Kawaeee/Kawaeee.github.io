import { profile } from './profile';

export interface ChatConfig {
	/** Header display name and status line. */
	headerName: string;
	headerStatus: string;
	/** Avatar asset under `static/` (no leading slash). */
	avatarPath: string;
	/** Fallback image when an asset 404s. */
	fallbackImagePath: string;
	/** Input placeholder. */
	inputPlaceholder: string;
	/** Quick-reply labels under the greeting. */
	quickReplies: string[];
	/** Typing-indicator delay before bot reply lands (ms). */
	typingDelayMs: number;
	/** First bot message shown on page load. */
	greetingText: string;
	/** Site metadata. */
	siteTitle: string;
	siteDescription: string;
}

export const chatConfig: ChatConfig = {
	headerName: profile.name,
	headerStatus: 'online · replies with canned answers',
	avatarPath: profile.avatar,
	fallbackImagePath: 'images/profile-pictures/icon.png',
	inputPlaceholder: 'Ask about bio, experience, projects, skills, contact…',
	quickReplies: ['About me', 'Experience', 'Projects', 'Skills', 'Contact'],
	typingDelayMs: 550,
	greetingText: `Hey, I'm ${profile.nickname} 👋 - welcome to my chat-style portfolio. Ask me about my bio, experience, projects, skills, or how to get in touch. Or tap a chip below.`,
	siteTitle: `${profile.name} - Portfolio`,
	siteDescription: profile.tagline
};
