<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { chatConfig } from '$lib/data/config';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.ico" />
	<title>{chatConfig.siteTitle}</title>
	<meta name="description" content={chatConfig.siteDescription} />
	<meta name="theme-color" content="#0084ff" />
</svelte:head>

{@render children()}
