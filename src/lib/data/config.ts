/**
 * App-wide chat UI config. Pulls from `profile.ts` so changing name/avatar
 * ripples everywhere (header, greeting, site title). Edit this file to tweak
 * greeting text, quick-reply chips, typing delay, or site metadata.
 */
import { profile } from './profile';

/** Shape of the shared chat config consumed by `Chat.svelte` and layout. */
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
	/**
	 * Typing-indicator delay range (ms). The actual delay is picked uniformly
	 * at random between `typingDelayMinMs` and `typingDelayMaxMs` for each
	 * reply so the bot doesn't always respond at the exact same cadence.
	 */
	typingDelayMinMs: number;
	typingDelayMaxMs: number;
	/** First bot message shown on page load. */
	greetingText: string;
	/** Site metadata. */
	siteTitle: string;
	siteDescription: string;
}

/** Live config instance. Mutate by editing the literal below. */
export const chatConfig: ChatConfig = {
	headerName: profile.name,
	headerStatus: 'online · replies with canned answers',
	avatarPath: profile.avatar,
	fallbackImagePath: 'images/profile-pictures/icon.png',
	inputPlaceholder: 'Ask about bio, experience, projects, skills, contact…',
	quickReplies: ['About me', 'Experience', 'Projects', 'Skills', 'Contact'],
	typingDelayMinMs: 450,
	typingDelayMaxMs: 1200,
	greetingText: `Hey, I'm ${profile.nickname} 👋 - welcome to my chat-style portfolio. Ask me about my bio, experience, projects, skills, or how to get in touch. Or tap a chip below.`,
	siteTitle: `${profile.name} - Portfolio`,
	siteDescription: profile.tagline
};
