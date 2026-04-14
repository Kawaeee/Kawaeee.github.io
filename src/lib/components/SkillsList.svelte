<script lang="ts">
	import type { SkillGroup } from '$lib/data/skills';

	interface Props {
		groups: SkillGroup[];
	}
	let { groups }: Props = $props();
</script>

<div class="wrap">
	{#each groups as g}
		<section class="group">
			<h4 class="title">{g.title}</h4>
			<div class="chips">
				{#each g.items as s}
					<span class="chip">{s}</span>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: 14px;
		padding: 12px 14px;
		box-shadow: var(--card-shadow);
	}
	.title {
		margin: 0 0 6px;
		font-size: 12px;
		font-weight: 600;
		color: var(--fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.chip {
		font-size: 12.5px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent);
	}
</style>
