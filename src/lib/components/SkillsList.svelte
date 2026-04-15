<!-- Grouped skill chips. One section per `SkillGroup`. -->
<script lang="ts">
	import type { SkillGroup } from '$lib/data/skills';

	interface Props {
		groups: SkillGroup[];
	}
	let { groups }: Props = $props();
</script>

<div class="wrap">
	{#each groups as g}
		<section>
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
		gap: 9px;
		background: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: 14px;
		padding: 11px 13px;
		box-shadow: var(--card-shadow);
	}
	.title {
		margin: 0 0 4px;
		font-size: 11px;
		font-weight: 600;
		color: var(--fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}
	.chip {
		font-size: 12px;
		font-weight: 500;
		padding: 4px 9px;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent);
	}
	@media (max-width: 480px) {
		.wrap {
			padding: 10px 11px;
			gap: 8px;
		}
		.title {
			font-size: 10px;
			margin-bottom: 3px;
		}
		.chips {
			gap: 4px;
		}
		.chip {
			font-size: 11px;
			padding: 3px 8px;
		}
	}
	@media (max-width: 375px) {
		.wrap {
			padding: 8px 9px;
			gap: 6px;
		}
		.title {
			font-size: 9px;
			margin-bottom: 2px;
		}
		.chips {
			gap: 3px;
		}
		.chip {
			font-size: 10px;
			padding: 2px 7px;
		}
	}
</style>
