<!-- Row of tappable suggestion chips. Used for quick replies and inline prompts. -->
<script lang="ts">
	interface Props {
		/** Labels to render; also the text sent when the chip is tapped. */
		items: string[];
		/** Invoked with the chip label when the user taps it. */
		onpick: (label: string) => void;
		/** When true, chips are visually and functionally inert. */
		disabled?: boolean;
	}
	let { items, onpick, disabled = false }: Props = $props();
</script>

<div class="wrap" role="group" aria-label="Quick replies">
	{#each items as label}
		<button type="button" class="chip" {disabled} onclick={() => onpick(label)}>
			{label}
		</button>
	{/each}
</div>

<style>
	.wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.chip {
		font-size: 13px;
		font-weight: 500;
		padding: 7px 14px;
		min-height: 36px;
		border-radius: 999px;
		border: 1px solid var(--chip-border);
		background: var(--chip-bg);
		color: var(--chip-fg);
		transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease,
			transform 120ms ease;
	}
	@media (max-width: 480px) {
		.chip {
			font-size: 12px;
			padding: 6px 12px;
			min-height: 34px;
		}
	}
	@media (max-width: 375px) {
		.wrap {
			gap: 5px;
		}
		.chip {
			font-size: 11px;
			padding: 5px 10px;
			min-height: 32px;
		}
	}
	.chip:hover {
		background: var(--chip-hover-bg);
		color: var(--chip-hover-fg);
		border-color: var(--chip-hover-border);
		transform: translateY(-1px);
	}
	.chip:active {
		transform: translateY(0);
	}
	.chip:disabled {
		opacity: 0.45;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
