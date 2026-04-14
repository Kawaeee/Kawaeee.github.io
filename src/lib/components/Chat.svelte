<script lang="ts">
	import { tick } from 'svelte';
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

	function now() {
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	let messages = $state<ChatMessage[]>([
		{
			id: makeId(),
			role: 'bot',
			content: [{ kind: 'text', text: chatConfig.greetingText }],
			time: now()
		}
	]);
	let typing = $state(false);
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

	async function handleSend(text: string) {
		messages = [
			...messages,
			{ id: makeId(), role: 'user', content: [{ kind: 'text', text }], time: now() }
		];
		await forceScrollToBottom();
		typing = true;
		await forceScrollToBottom();

		const { id } = matchTopic(text);
		const reply = topicById(id).reply();

		setTimeout(async () => {
			typing = false;
			messages = [...messages, { id: makeId(), role: 'bot', content: reply, time: now() }];
			await forceScrollToBottom();
		}, chatConfig.typingDelayMs);
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
						onerror={(e) => ((e.currentTarget as HTMLImageElement).src = fallbackImage())}
					/>
					<span class="online-dot" aria-hidden="true"></span>
				</span>
				<div class="meta">
					<div class="name">{chatConfig.headerName}</div>
					<div class="status">{chatConfig.headerStatus}</div>
				</div>
			</div>
			<ThemeToggle />
		</header>

		<div class="messages" bind:this={scroller}>
			<div class="inner" bind:this={inner}>
				{#each messages as m (m.id)}
					<Message role={m.role} content={m.content} time={m.time} onsuggestion={handleSend} />
				{/each}
				{#if typing}
					<TypingIndicator />
				{/if}
				<div class="bottom-sentinel" bind:this={sentinel} aria-hidden="true"></div>
			</div>
		</div>

		<div class="composer-wrap">
			<div class="quick">
				<Suggestions items={chatConfig.quickReplies} onpick={handleSend} />
			</div>
			<ChatInput onsend={handleSend} disabled={typing} placeholder={chatConfig.inputPlaceholder} />
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
		gap: 12px;
		padding: 10px 14px;
		padding-top: calc(10px + env(safe-area-inset-top));
		border-bottom: 1px solid var(--border);
		background: var(--bg-elev);
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
		width: 40px;
		height: 40px;
		border-radius: 999px;
		object-fit: cover;
		background: var(--bg-elev-2);
		display: block;
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

	.messages {
		overflow-y: auto;
		overscroll-behavior: contain;
		background: var(--bg);
		min-height: 0;
	}
	.inner {
		padding: 14px 12px 8px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.bottom-sentinel {
		height: 1px;
		width: 100%;
		flex: 0 0 auto;
	}

	.composer-wrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 10px 12px;
		padding-bottom: calc(10px + env(safe-area-inset-bottom));
		border-top: 1px solid var(--border);
		background: var(--bg);
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

	@media (min-width: 720px) {
		.app {
			padding: 16px;
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
