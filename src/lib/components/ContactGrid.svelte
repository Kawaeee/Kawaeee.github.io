<!-- Grid of external contact links (email, GitHub, LinkedIn, etc.). -->
<script lang="ts">
	import type { Contact } from '$lib/data/profile';
	import { asset, fallbackImage } from '$lib/asset';

	interface Props {
		items: Contact[];
	}
	let { items }: Props = $props();
</script>

<div class="grid">
	{#each items as c}
		<a class="item" href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
			<img
				class="icon"
				src={asset(c.icon)}
				alt=""
				loading="lazy"
				onerror={(e) => {
					const img = e.currentTarget as HTMLImageElement;
					img.onerror = null;
					img.src = fallbackImage();
				}}
			/>
			<span class="label">
				<span class="name">{c.name}</span>
				<span class="handle">{c.handle}</span>
			</span>
		</a>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 8px;
	}
	.item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		background: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: 12px;
		text-decoration: none;
		min-height: 52px;
		transition: background-color 120ms ease, border-color 120ms ease, transform 120ms ease;
	}
	.item:hover {
		background: var(--hover);
		border-color: var(--border-strong);
		text-decoration: none;
		transform: translateY(-1px);
	}
	.icon {
		width: 28px;
		height: 28px;
		object-fit: contain;
		flex: 0 0 auto;
		background: var(--bg-elev-2);
		border-radius: 6px;
		padding: 3px;
	}
	.label {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.name {
		font-size: 13px;
		font-weight: 600;
		color: var(--fg);
	}
	.handle {
		font-size: 12px;
		color: var(--fg-muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
