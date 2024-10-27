<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let to: string;

	let showButton = false;

	onMount(() => {
		const timer = setTimeout(() => {
			showButton = true;
		}, 5000);

		return () => {
			clearTimeout(timer); // Cleanup timeout if component unmounts
		};
	});

	async function handleClick() {
		await goto(to);
	}
</script>

<div class="flex items-center justify-center">
	{#if showButton}
		<button
			on:click={handleClick}
			in:fade={{ duration: 300 }}
			class="btn variant-ghost-primary text-3xl px-2 mt-0"
		>
			Next
		</button>
	{/if}
</div>
