<!-- One project card with optional demo + source links. -->
<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { asset, fallbackImage } from '$lib/asset';

	interface Props {
		item: Project;
	}
	let { item }: Props = $props();
</script>

<article class="card">
	<img
		class="thumb"
		src={asset(item.icon)}
		alt={item.name}
		loading="lazy"
		onerror={(e) => {
			const img = e.currentTarget as HTMLImageElement;
			img.onerror = null;
			img.src = fallbackImage();
		}}
	/>
	<div class="body">
		<h3 class="name">{item.name}</h3>
		<p class="desc">{item.description}</p>
		<div class="links">
			{#if item.demoUrl}
				<a class="link primary" href={item.demoUrl} target="_blank" rel="noopener noreferrer">
					Live demo
				</a>
			{/if}
			{#if item.sourceUrl}
				<a class="link" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
					Source
				</a>
			{/if}
		</div>
	</div>
</article>

<style>
	.card {
		display: grid;
		grid-template-columns: 64px 1fr;
		gap: 12px;
		align-items: flex-start;
		background: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: 14px;
		padding: 12px;
		box-shadow: var(--card-shadow);
		transition: box-shadow 180ms ease, transform 180ms ease;
	}
	.card:hover {
		box-shadow: var(--card-shadow-hover);
		transform: translateY(-1px);
	}
	.thumb {
		width: 64px;
		height: 64px;
		object-fit: contain;
		background: var(--bg-elev-2);
		border-radius: 10px;
		padding: 6px;
	}
	.body {
		min-width: 0;
	}
	.name {
		margin: 0;
		font-size: 15px;
		font-weight: 600;
		color: var(--fg);
	}
	.desc {
		margin: 4px 0 8px;
		font-size: 13px;
		color: var(--fg-muted);
		line-height: 1.45;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.link {
		font-size: 12px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		color: var(--fg);
		text-decoration: none;
		background: var(--bg-elev-2);
		transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
	}
	.link:hover {
		background: var(--hover);
		text-decoration: none;
	}
	.link.primary {
		background: var(--accent);
		color: var(--accent-fg);
		border-color: var(--accent);
	}
	.link.primary:hover {
		background: var(--accent-strong);
		border-color: var(--accent-strong);
	}
</style>
