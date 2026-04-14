<script lang="ts">
	import type { MessageContent } from '$lib/types';
	import ExperienceCard from './ExperienceCard.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import ContactGrid from './ContactGrid.svelte';
	import SkillsList from './SkillsList.svelte';
	import Suggestions from './Suggestions.svelte';

	interface Props {
		role: 'user' | 'bot';
		content: MessageContent[];
		time?: string;
		onsuggestion?: (label: string) => void;
	}

	let { role, content, time, onsuggestion }: Props = $props();
</script>

<div class="row" class:user={role === 'user'} class:bot={role === 'bot'}>
	<div class="stack">
		{#each content as block, i (i)}
			{#if block.kind === 'text'}
				<div class="bubble">
					<p class="text">{block.text}</p>
				</div>
			{:else if block.kind === 'experiences'}
				<div class="deck">
					{#each block.items as item (item.id)}
						<ExperienceCard {item} />
					{/each}
				</div>
			{:else if block.kind === 'projects'}
				<div class="deck grid2">
					{#each block.items as item (item.id)}
						<ProjectCard {item} />
					{/each}
				</div>
			{:else if block.kind === 'contacts'}
				<ContactGrid items={block.items} />
			{:else if block.kind === 'skills'}
				<SkillsList groups={block.groups} />
			{:else if block.kind === 'suggestions'}
				<Suggestions items={block.items} onpick={(l) => onsuggestion?.(l)} />
			{/if}
		{/each}
		{#if time}
			<span class="time">{time}</span>
		{/if}
	</div>
</div>

<style>
	.row {
		display: flex;
		width: 100%;
		margin: 8px 0;
	}
	.row.user {
		justify-content: flex-end;
	}
	.row.bot {
		justify-content: flex-start;
	}

	@keyframes pop-in-right {
		0% {
			opacity: 0;
			transform: translate(8px, 10px) scale(0.92);
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 1;
			transform: translate(0, 0) scale(1);
		}
	}
	@keyframes pop-in-left {
		0% {
			opacity: 0;
			transform: translate(-8px, 10px) scale(0.92);
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 1;
			transform: translate(0, 0) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.row.user .stack,
		.row.bot .stack {
			animation: none;
		}
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-width: min(92%, 720px);
		min-width: 0;
	}
	.row.user .stack {
		align-items: flex-end;
		animation: pop-in-right 260ms cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
		transform-origin: bottom right;
	}
	.row.bot .stack {
		align-items: flex-start;
		animation: pop-in-left 260ms cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
		transform-origin: bottom left;
	}

	.bubble {
		padding: 9px 14px;
		border-radius: 20px;
		font-size: 14.5px;
		line-height: 1.45;
		word-wrap: break-word;
		overflow-wrap: anywhere;
		white-space: pre-wrap;
		max-width: 100%;
	}
	.row.user .bubble {
		background: var(--bubble-user-bg);
		color: var(--bubble-user-fg);
		box-shadow: var(--bubble-user-shadow);
		border-bottom-right-radius: 6px;
	}
	.row.bot .bubble {
		background: var(--bubble-bot-bg);
		color: var(--bubble-bot-fg);
		box-shadow: var(--bubble-bot-shadow);
		border-bottom-left-radius: 6px;
	}

	.text {
		margin: 0;
	}

	.deck {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}
	.deck.grid2 {
		display: grid;
		grid-template-columns: 1fr;
		gap: 8px;
	}

	.time {
		font-size: 11px;
		color: var(--fg-subtle);
		padding: 0 4px;
	}

	@media (min-width: 640px) {
		.stack {
			max-width: min(85%, 720px);
		}
		.deck.grid2 {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
