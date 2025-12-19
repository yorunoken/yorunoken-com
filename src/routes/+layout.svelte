<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<script
		defer
		src="https://umami.yorunoken.com/script.js"
		data-website-id="de3aa471-a055-45e5-ae3e-e4521b6746b5"
	></script>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
