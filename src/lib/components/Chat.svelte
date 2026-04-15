<!--
	Root chat UI. Owns the full transcript (`messages`), the typing indicator,
	and the scroll-sticky behaviour. The chat loop is:

	    input → matchTopic() → topicById().reply() → append bot message

	Three observers keep the list pinned to the bottom when the user is
	already there: an IntersectionObserver on a bottom sentinel drives the
	`stickToBottom` flag, a ResizeObserver re-snaps on content growth, and a
	capturing `load` listener re-snaps after late-loading images.
-->
<script lang="ts">
	import { tick } from 'svelte';
	import { browser } from '$app/environment';
	import ThemeToggle from './ThemeToggle.svelte';
	import Message from './Message.svelte';
	import TypingIndicator from './TypingIndicator.svelte';
	import ChatInput from './ChatInput.svelte';
	import Suggestions from './Suggestions.svelte';
	import { asset, fallbackImage } from '$lib/asset';
	import { chatConfig } from '$lib/data/config';
	import { matchTopic } from '$lib/matcher';
	import { topicById } from '$lib/data/topics';
	import type { ChatMessage } from '$lib/types';

	let nextId = 0;
	const makeId = () => ++nextId;

	// Empty string on the server so prerendered HTML has no timestamp —
	// hydration can't then mismatch against whatever the client clock reads.
	function now(): string {
		if (!browser) return '';
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function greetingMessage(): ChatMessage {
		return {
			id: makeId(),
			role: 'bot',
			content: [{ kind: 'text', text: chatConfig.greetingText }],
			time: now()
		};
	}

	let messages = $state<ChatMessage[]>([greetingMessage()]);
	let input: { focus: () => void } | null = null;
	let typing = $state(false);
	let replyTimer: ReturnType<typeof setTimeout> | null = null;
	let scroller: HTMLDivElement | null = $state(null);
	let inner: HTMLDivElement | null = $state(null);
	let sentinel: HTMLDivElement | null = $state(null);
	// "Is the bottom of the list visible to the user right now?"
	// Driven by IntersectionObserver so mid-layout measurements can't lie about it.
	let stickToBottom = $state(true);

	function jumpToBottom() {
		if (!scroller) return;
		scroller.scrollTop = scroller.scrollHeight;
	}

	async function forceScrollToBottom() {
		stickToBottom = true;
		await tick();
		jumpToBottom();
		// Two rAFs lets late-computed layout (card heights, fonts) settle before the final snap.
		requestAnimationFrame(() => requestAnimationFrame(jumpToBottom));
	}

	// Bottom sentinel → stickToBottom. When the sentinel is visible the user is at the
	// bottom; when it leaves the viewport they've scrolled up to read history.
	$effect(() => {
		if (!sentinel || !scroller) return;
		const io = new IntersectionObserver(
			(entries) => {
				stickToBottom = entries[0]?.isIntersecting ?? true;
			},
			{ root: scroller, threshold: 0, rootMargin: '0px 0px 40px 0px' }
		);
		io.observe(sentinel);
		return () => io.disconnect();
	});

	// Whenever content grows (new message, typing indicator, late-loading images),
	// re-pin to the bottom if the user was already there.
	$effect(() => {
		if (!inner) return;
		const ro = new ResizeObserver(() => {
			if (stickToBottom) jumpToBottom();
		});
		ro.observe(inner);
		return () => ro.disconnect();
	});

	// Late image loads: capture and re-snap.
	$effect(() => {
		if (!inner) return;
		const handler = () => {
			if (stickToBottom) jumpToBottom();
		};
		inner.addEventListener('load', handler, true);
		return () => inner?.removeEventListener('load', handler, true);
	});

	// Greeting's `time` is empty on the server to avoid a hydration mismatch;
	// backfill it on the client after mount.
	$effect(() => {
		if (messages.length > 0 && messages[0].role === 'bot' && !messages[0].time) {
			messages[0] = { ...messages[0], time: now() };
		}
	});

	function cancelPendingReply() {
		if (replyTimer !== null) {
			clearTimeout(replyTimer);
			replyTimer = null;
		}
	}

	async function handleReset() {
		cancelPendingReply();
		typing = false;
		messages = [greetingMessage()];
		await forceScrollToBottom();
		input?.focus();
	}

	async function handleSend(text: string) {
		// Ignore rapid re-entries while a bot reply is still pending — otherwise
		// mashing a suggestion chip would queue up a wall of identical user
		// messages and only one reply (because cancelPendingReply drops the
		// older timers).
		if (typing) return;
		cancelPendingReply();
		messages = [
			...messages,
			{ id: makeId(), role: 'user', content: [{ kind: 'text', text }], time: now() }
		];
		await forceScrollToBottom();
		typing = true;
		await forceScrollToBottom();

		const { id } = matchTopic(text);
		const reply = topicById(id).reply();

		replyTimer = setTimeout(async () => {
			replyTimer = null;
			typing = false;
			messages = [...messages, { id: makeId(), role: 'bot', content: reply, time: now() }];
			await forceScrollToBottom();
			input?.focus();
		}, pickTypingDelay(reply));
	}

	/**
	 * Pick a humanish "typing" delay: uniform random inside the configured
	 * range, plus a small per-text-character bonus so long replies feel like
	 * they took a moment to compose. Capped at `typingDelayMaxMs * 1.4`.
	 */
	function pickTypingDelay(reply: ReturnType<ReturnType<typeof topicById>['reply']>): number {
		const { typingDelayMinMs: min, typingDelayMaxMs: max } = chatConfig;
		const base = min + Math.random() * (max - min);
		const textChars = reply.reduce(
			(n, b) => n + (b.kind === 'text' ? b.text.length : 0),
			0
		);
		const lengthBonus = Math.min(textChars * 4, max * 0.6);
		return Math.round(Math.min(base + lengthBonus, max * 1.4));
	}
</script>

<div class="app">
	<div class="frame">
		<header class="header">
			<div class="identity">
				<span class="avatar-wrap">
					<img
						class="avatar"
						src={asset(chatConfig.avatarPath)}
						alt=""
						onerror={(e) => {
							const img = e.currentTarget as HTMLImageElement;
							img.onerror = null;
							img.src = fallbackImage();
						}}
					/>
					<span class="online-dot" aria-hidden="true"></span>
				</span>
				<div class="meta">
					<div class="name">{chatConfig.headerName}</div>
					<div class="status">{chatConfig.headerStatus}</div>
				</div>
			</div>
			<div class="actions">
				<button
					type="button"
					class="icon-btn"
					aria-label="Reset conversation"
					title="Reset conversation"
					onclick={handleReset}
				>
					<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
						<path
							d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7Z"
							fill="currentColor"
						/>
					</svg>
				</button>
				<ThemeToggle />
			</div>
		</header>

		<div
			class="messages"
			bind:this={scroller}
			role="log"
			aria-live="polite"
			aria-atomic="false"
			aria-label="Conversation"
		>
			<div class="inner" bind:this={inner}>
				{#each messages as m (m.id)}
					<Message
						role={m.role}
						content={m.content}
						time={m.time}
						onsuggestion={handleSend}
						suggestionsDisabled={typing}
					/>
				{/each}
				{#if typing}
					<TypingIndicator />
				{/if}
				<div class="bottom-sentinel" bind:this={sentinel} aria-hidden="true"></div>
			</div>
		</div>

		<div class="composer-wrap">
			<div class="quick">
				<Suggestions items={chatConfig.quickReplies} onpick={handleSend} disabled={typing} />
			</div>
			<ChatInput
				onsend={handleSend}
				disabled={typing}
				placeholder={chatConfig.inputPlaceholder}
				onready={(api) => (input = api)}
			/>
			<p class="footer">© 2026 Kawaeee.</p>
		</div>
	</div>
</div>

<style>
	.app {
		height: 100dvh;
		background: var(--bg-app);
		display: flex;
		justify-content: center;
		overflow: hidden;
	}

	.frame {
		display: grid;
		grid-template-rows: auto 1fr auto;
		width: 100%;
		max-width: 860px;
		background: var(--bg);
		height: 100%;
		min-height: 0;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 9px 12px;
		padding-top: calc(9px + env(safe-area-inset-top));
		border-bottom: 1px solid var(--border);
		background: var(--bg-elev);
	}
	@media (max-width: 480px) {
		.header {
			padding: 8px 10px;
			padding-top: calc(8px + env(safe-area-inset-top));
			gap: 8px;
		}
	}
	@media (max-width: 375px) {
		.header {
			padding: 6px 8px;
			padding-top: calc(6px + env(safe-area-inset-top));
			gap: 6px;
		}
	}

	.identity {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
	}
	.avatar-wrap {
		position: relative;
		flex: 0 0 auto;
	}
	.avatar {
		width: 38px;
		height: 38px;
		border-radius: 999px;
		object-fit: cover;
		background: var(--bg-elev-2);
		display: block;
	}
	@media (max-width: 480px) {
		.avatar {
			width: 36px;
			height: 36px;
		}
	}
	@media (max-width: 375px) {
		.avatar {
			width: 32px;
			height: 32px;
		}
	}
	.online-dot {
		position: absolute;
		right: -1px;
		bottom: -1px;
		width: 11px;
		height: 11px;
		background: var(--online);
		border: 2px solid var(--bg-elev);
		border-radius: 999px;
	}
	.meta {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.name {
		font-weight: 600;
		font-size: 15px;
		color: var(--fg);
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 60vw;
	}
	.status {
		font-size: 12px;
		color: var(--fg-muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 60vw;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.messages {
		overflow-y: auto;
		overscroll-behavior: contain;
		background: var(--bg);
		min-height: 0;
	}
	.inner {
		padding: 12px 10px 6px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	@media (max-width: 480px) {
		.inner {
			padding: 10px 8px 4px;
		}
	}
	@media (max-width: 375px) {
		.inner {
			padding: 8px 6px 2px;
		}
	}
	.bottom-sentinel {
		height: 1px;
		width: 100%;
		flex: 0 0 auto;
	}

	.composer-wrap {
		display: flex;
		flex-direction: column;
		gap: 7px;
		padding: 10px 10px;
		padding-bottom: calc(10px + env(safe-area-inset-bottom));
		border-top: 1px solid var(--border);
		background: var(--bg);
	}
	@media (max-width: 480px) {
		.composer-wrap {
			padding: 8px 8px;
			padding-bottom: calc(8px + env(safe-area-inset-bottom));
			gap: 6px;
		}
	}
	@media (max-width: 375px) {
		.composer-wrap {
			padding: 6px 6px;
			padding-bottom: calc(6px + env(safe-area-inset-bottom));
			gap: 5px;
		}
	}

	.quick {
		display: flex;
		overflow-x: auto;
		padding-bottom: 2px;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}
	.quick :global(> div) {
		flex-wrap: nowrap;
	}
	.quick::-webkit-scrollbar {
		display: none;
	}

	.footer {
		margin: 2px 0 0;
		text-align: center;
		font-size: 8px;
		color: var(--fg-subtle);
	}
	@media (max-width: 480px) {
		.footer {
			font-size: 7px;
		}
	}

	@media (min-width: 720px) {
		.app {
			padding: 16px;
			background:
				radial-gradient(60ch 50ch at 12% 18%, var(--wallpaper-blob-1), transparent 60%),
				radial-gradient(70ch 55ch at 88% 82%, var(--wallpaper-blob-2), transparent 62%),
				radial-gradient(50ch 40ch at 80% 12%, var(--wallpaper-blob-3), transparent 65%),
				var(--bg-app);
		}
		.frame {
			border: 1px solid var(--border);
			border-radius: 16px;
			overflow: hidden;
			box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
		}
		.inner {
			padding: 18px 20px 10px;
		}
		.composer-wrap {
			padding: 12px 16px;
		}
		.quick :global(> div) {
			flex-wrap: wrap;
		}
		.name {
			max-width: none;
		}
		.status {
			max-width: 400px;
		}
	}
</style>
