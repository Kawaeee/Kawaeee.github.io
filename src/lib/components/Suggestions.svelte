<script lang="ts">
	interface Props {
		items: string[];
		onpick: (label: string) => void;
	}
	let { items, onpick }: Props = $props();
</script>

<div class="wrap" role="group" aria-label="Quick replies">
	{#each items as label}
		<button type="button" class="chip" onclick={() => onpick(label)}>
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
	.chip:hover {
		background: var(--chip-hover-bg);
		color: var(--chip-hover-fg);
		border-color: var(--chip-hover-border);
		transform: translateY(-1px);
	}
	.chip:active {
		transform: translateY(0);
	}
</style>
