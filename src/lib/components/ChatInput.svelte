<script lang="ts">
	interface Props {
		onsend: (text: string) => void;
		disabled?: boolean;
		placeholder?: string;
	}

	let { onsend, disabled = false, placeholder = 'Message' }: Props = $props();

	let value = $state('');
	let textarea: HTMLTextAreaElement | null = $state(null);

	function autosize() {
		if (!textarea) return;
		textarea.style.height = 'auto';
		textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
	}

	function submit() {
		const trimmed = value.trim();
		if (!trimmed || disabled) return;
		onsend(trimmed);
		value = '';
		queueMicrotask(autosize);
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
		aria-label="Message"
		oninput={autosize}
		{onkeydown}
	></textarea>
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
		padding: 10px;
		border: 1px solid var(--border);
		border-radius: 22px;
		background: var(--bg-elev);
		transition: border-color 120ms ease, background-color 120ms ease;
	}
	.composer:focus-within {
		border-color: var(--border-strong);
	}

	textarea {
		flex: 1;
		resize: none;
		border: 0;
		outline: none;
		background: transparent;
		font-size: 15px;
		line-height: 1.45;
		max-height: 160px;
		padding: 6px 4px 6px 8px;
		overflow-y: auto;
	}
	textarea::placeholder {
		color: var(--fg-subtle);
	}

	.send {
		flex: 0 0 auto;
		width: 34px;
		height: 34px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		background: var(--accent);
		color: var(--accent-fg);
		transition: opacity 120ms ease, transform 120ms ease;
	}
	.send:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
	.send:not(:disabled):hover {
		transform: translateY(-1px);
	}
	.send:not(:disabled):active {
		transform: translateY(0);
	}
</style>
