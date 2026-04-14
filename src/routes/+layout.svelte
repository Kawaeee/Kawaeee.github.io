<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.ico" />
	<title>Kasidech C.</title>
</svelte:head>

{@render children()}
