<script lang="ts">
	import { tick } from 'svelte';
	import { base } from '$app/paths';
	import ThemeToggle from './ThemeToggle.svelte';
	import Message from './Message.svelte';
	import TypingIndicator from './TypingIndicator.svelte';
	import ChatInput from './ChatInput.svelte';

	interface ChatMessage {
		id: number;
		role: 'user' | 'bot';
		text: string;
		time: string;
	}

	let nextId = 0;
	const makeId = () => ++nextId;

	function now() {
		return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	let messages = $state<ChatMessage[]>([
		{
			id: makeId(),
			role: 'bot',
			text: "Hey, I'm Kasidech — welcome to my chat-style portfolio. Ask me about my bio, experience, projects, skills, or how to get in touch.",
			time: now()
		}
	]);
	let typing = $state(false);
	let scroller: HTMLDivElement | null = $state(null);

	async function scrollToBottom() {
		await tick();
		if (scroller) scroller.scrollTop = scroller.scrollHeight;
	}

	async function handleSend(text: string) {
		messages = [...messages, { id: makeId(), role: 'user', text, time: now() }];
		await scrollToBottom();
		typing = true;
		await scrollToBottom();

		// Placeholder reply — real topic matcher lands in the next step.
		setTimeout(async () => {
			typing = false;
			messages = [
				...messages,
				{
					id: makeId(),
					role: 'bot',
					text: "Got it — I'll have a proper answer for you once my topic matcher is wired up.",
					time: now()
				}
			];
			await scrollToBottom();
		}, 650);
	}
</script>

<div class="app">
	<header class="header">
		<div class="identity">
			<img class="avatar" src="{base}/images/profile-pictures/icon.png" alt="" />
			<div class="meta">
				<div class="name">Kasidech C.</div>
				<div class="status">online</div>
			</div>
		</div>
		<ThemeToggle />
	</header>

	<div class="messages" bind:this={scroller}>
		<div class="inner">
			{#each messages as m (m.id)}
				<Message role={m.role} text={m.text} time={m.time} />
			{/each}
			{#if typing}
				<TypingIndicator />
			{/if}
		</div>
	</div>

	<div class="composer-wrap">
		<ChatInput onsend={handleSend} disabled={typing} />
	</div>
</div>

<style>
	.app {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 100dvh;
		width: 100%;
		max-width: 820px;
		margin: 0 auto;
		background: var(--bg);
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
	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 999px;
		object-fit: cover;
		background: var(--bg-elev-2);
		flex: 0 0 auto;
	}
	.meta {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.name {
		font-weight: 600;
		font-size: 14px;
		color: var(--fg);
	}
	.status {
		font-size: 12px;
		color: var(--fg-muted);
	}

	.messages {
		overflow-y: auto;
		overscroll-behavior: contain;
		scroll-behavior: smooth;
	}
	.inner {
		padding: 16px 14px 8px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.composer-wrap {
		padding: 10px 12px;
		padding-bottom: calc(10px + env(safe-area-inset-bottom));
		border-top: 1px solid var(--border);
		background: var(--bg);
	}
</style>
