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
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#eef1f6" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b0d11" />
</svelte:head>

{@render children()}
