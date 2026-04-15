<!-- One job-history card. Rendered inside a chat bubble when the `experience` topic matches. -->
<script lang="ts">
	import type { Experience } from '$lib/data/experiences';
	import { asset, fallbackImage } from '$lib/asset';

	interface Props {
		item: Experience;
	}
	let { item }: Props = $props();
</script>

<article class="card">
	<header class="head">
		<img
			class="logo"
			src={asset(item.icon)}
			alt={item.company}
			loading="lazy"
			onerror={(e) => {
				const img = e.currentTarget as HTMLImageElement;
				img.onerror = null;
				img.src = fallbackImage();
			}}
		/>
		<div class="meta">
			<h3 class="role">
				{item.role}
				{#if item.current}
					<span class="pill">current</span>
				{/if}
			</h3>
			<p class="company">
				{item.company}{#if item.employmentType}<span class="sep"> · </span>{item.employmentType}{/if}
			</p>
			<p class="duration">
				{item.duration}{#if item.location}<span class="sep"> · </span>{item.location}{/if}
			</p>
		</div>
	</header>
	<ul class="details">
		{#each item.details as d}
			<li>{d}</li>
		{/each}
	</ul>
</article>

<style>
	.card {
		background: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: 14px;
		padding: 14px;
		box-shadow: var(--card-shadow);
		transition: box-shadow 180ms ease, transform 180ms ease;
	}
	.card:hover {
		box-shadow: var(--card-shadow-hover);
		transform: translateY(-1px);
	}

	.head {
		display: grid;
		grid-template-columns: 48px 1fr;
		gap: 12px;
		align-items: center;
	}
	.logo {
		width: 48px;
		height: 48px;
		object-fit: contain;
		background: var(--bg-elev-2);
		border-radius: 10px;
		padding: 4px;
	}
	.meta {
		min-width: 0;
	}
	.role {
		margin: 0;
		font-size: 15px;
		font-weight: 600;
		color: var(--fg);
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}
	.pill {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		padding: 2px 7px;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent);
	}
	.company {
		margin: 2px 0 0;
		font-size: 13px;
		color: var(--fg-muted);
	}
	.duration {
		margin: 2px 0 0;
		font-size: 12px;
		color: var(--fg-subtle);
	}
	.sep {
		color: var(--fg-subtle);
		opacity: 0.6;
	}

	.details {
		margin: 10px 0 0;
		padding-left: 18px;
		color: var(--fg-muted);
		font-size: 13.5px;
		line-height: 1.5;
	}
	.details li + li {
		margin-top: 3px;
	}

	@media (min-width: 560px) {
		.head {
			grid-template-columns: 56px 1fr;
		}
		.logo {
			width: 56px;
			height: 56px;
		}
		.role {
			font-size: 16px;
		}
		.company {
			font-size: 14px;
		}
	}
</style>
