<!-- Header icon button that flips light/dark via the `theme` singleton. -->
<script lang="ts">
	import { theme } from '$lib/theme.svelte';
</script>

<button
	type="button"
	class="icon-btn"
	aria-label="Toggle color theme"
	title="Toggle theme"
	onclick={() => theme.toggle()}
>
	{#if theme.value === 'dark'}
		<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
			<circle cx="12" cy="12" r="4" fill="currentColor" />
			<g stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<line x1="12" y1="2" x2="12" y2="4" />
				<line x1="12" y1="20" x2="12" y2="22" />
				<line x1="2" y1="12" x2="4" y2="12" />
				<line x1="20" y1="12" x2="22" y2="12" />
				<line x1="4.9" y1="4.9" x2="6.3" y2="6.3" />
				<line x1="17.7" y1="17.7" x2="19.1" y2="19.1" />
				<line x1="4.9" y1="19.1" x2="6.3" y2="17.7" />
				<line x1="17.7" y1="6.3" x2="19.1" y2="4.9" />
			</g>
		</svg>
	{:else}
		<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
			<path
				d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
				fill="currentColor"
			/>
		</svg>
	{/if}
</button>
