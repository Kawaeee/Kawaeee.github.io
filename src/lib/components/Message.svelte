<script lang="ts">
	interface Props {
		role: 'user' | 'bot';
		text: string;
		time?: string;
	}

	let { role, text, time }: Props = $props();
</script>

<div class="row" class:user={role === 'user'} class:bot={role === 'bot'}>
	<div class="bubble">
		<p class="text">{text}</p>
		{#if time}
			<span class="time">{time}</span>
		{/if}
	</div>
</div>

<style>
	.row {
		display: flex;
		width: 100%;
		margin: 6px 0;
	}
	.row.user {
		justify-content: flex-end;
	}
	.row.bot {
		justify-content: flex-start;
	}

	.bubble {
		max-width: min(78%, 640px);
		padding: 10px 15px;
		border-radius: var(--radius-bubble);
		font-size: var(--font-size-md);
		line-height: 1.45;
		word-wrap: break-word;
		overflow-wrap: anywhere;
		white-space: pre-wrap;
		transition: transform var(--duration-fast) var(--ease-out);
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

	.time {
		display: block;
		font-size: var(--font-size-xs);
		opacity: 0.75;
		margin-top: 4px;
	}

	.row.user .time {
		color: rgba(255, 255, 255, 0.85);
	}
	.row.bot .time {
		color: var(--fg-subtle);
		opacity: 1;
	}
</style>
