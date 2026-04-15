<!--
	Multiline composer with autosize, a 512-char cap, Enter-to-send (Shift+Enter
	for newline, IME compositions respected), and a live character counter
	that turns accent-coloured at 90 %.
-->
<script lang="ts">
	import { tick } from 'svelte';

	/** Focus API handed back to the parent via `onready`. */
	interface InputApi {
		focus: () => void;
	}

	interface Props {
		/** Called with the trimmed, length-capped message. */
		onsend: (text: string) => void;
		/** Disables the send button and drops Enter submits. */
		disabled?: boolean;
		placeholder?: string;
		/** Called once on mount with a focus handle. */
		onready?: (api: InputApi) => void;
	}

	/** Hard ceiling on message length (enforced both in markup and on submit). */
	const MAX_LENGTH = 512;

	let { onsend, disabled = false, placeholder = 'Message', onready }: Props = $props();

	let value = $state('');
	let textarea: HTMLTextAreaElement | null = $state(null);

	$effect(() => {
		if (textarea && onready) {
			onready({ focus: () => textarea?.focus() });
		}
	});

	function autosize() {
		if (!textarea) return;
		textarea.style.height = 'auto';
		textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
	}

	async function submit() {
		const trimmed = value.trim().slice(0, MAX_LENGTH);
		if (!trimmed || disabled) return;
		onsend(trimmed);
		value = '';
		await tick();
		autosize();
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
			e.preventDefault();
			submit();
		}
	}
</script>

<form
	class="composer"
	onsubmit={(e) => {
		e.preventDefault();
		submit();
	}}
>
	<textarea
		bind:this={textarea}
		bind:value
		{placeholder}
		rows="1"
		maxlength={MAX_LENGTH}
		aria-label="Message"
		oninput={autosize}
		{onkeydown}
	></textarea>
	{#if value.length > 0}
		<span
			class="count"
			class:warn={value.length >= MAX_LENGTH * 0.9}
			aria-live="polite"
		>
			{value.length}/{MAX_LENGTH}
		</span>
	{/if}
	<button type="submit" class="send" aria-label="Send" disabled={disabled || !value.trim()}>
		<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
			<path
				d="M4 12l16-8-6 16-2-7-8-1z"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linejoin="round"
				stroke-linecap="round"
			/>
		</svg>
	</button>
</form>

<style>
	.composer {
		display: flex;
		align-items: flex-end;
		gap: 8px;
		padding: 6px 6px 6px 14px;
		border: 1px solid var(--border);
		border-radius: 22px;
		background: var(--bg-elev-2);
		transition: border-color 120ms ease, background-color 120ms ease;
	}
	.composer:focus-within {
		border-color: var(--accent);
		background: var(--bg-elev);
	}

	textarea {
		flex: 1;
		resize: none;
		border: 0;
		outline: none;
		background: transparent;
		font-size: 16px;
		line-height: 1.45;
		max-height: 160px;
		padding: 8px 0;
		overflow-y: auto;
		min-width: 0;
	}
	textarea::placeholder {
		color: var(--fg-subtle);
	}

	.send {
		flex: 0 0 auto;
		width: 36px;
		height: 36px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		background: var(--accent);
		color: var(--accent-fg);
		transition: opacity 120ms ease, transform 120ms ease, background-color 120ms ease;
	}
	.send:not(:disabled):hover {
		background: var(--accent-strong);
		transform: translateY(-1px);
	}
	.send:not(:disabled):active {
		transform: translateY(0);
	}
	.send:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.count {
		flex: 0 0 auto;
		align-self: flex-end;
		padding-bottom: 12px;
		font-size: 10px;
		color: var(--fg-subtle);
		font-variant-numeric: tabular-nums;
		user-select: none;
	}
	.count.warn {
		color: var(--accent);
	}
</style>
