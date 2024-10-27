<script lang="ts">
	import { goto } from "$app/navigation";
	import { user } from "$lib/store";
	import { fade } from "svelte/transition";

	let username: string = "";
	let invalidInput: boolean = false;
	const registerUser = async () => {
		console.log(username);
		if (username == "") {
			invalidInput = true;
			return -1;
		}
		user.set(username);
		await goto("phishing");
	};
</script>

<h1 class="h1 text-center m-5 text-6xl">Don't Trust Tech.</h1>
<div class="justify-center align-middle flex-col gap-2 text-center">
	<div class="badge variant-ghost-warning my-4">Make sure to turn your volume up for the best experience.</div>
	<div class="h2 text-4xl mb-6">Enter your username here to get started:</div>
	<input
		class="p-1 text-base max-w-52 text-black"
		placeholder="your username here"
		bind:value={username}
	/>
</div>
<div class="start">
	<button on:click={registerUser} class="btn variant-outline-primary"
		>I'm Ready</button
	>
	{#if invalidInput}
		<aside class="alert variant-ghost-warning" transition:fade={{ duration: 200 }}>
			Please type in your username before proceeding!
		</aside>
	{/if}
</div>

<style>
	#dtt {
		font-size: 6em;
		text-align: center;
		margin-bottom: 8px;
	}
	.userinput {
		font-size: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 8px;
	}
	.userinput input {
		padding: 4px;
		font-size: medium;
	}
	.start {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.start button {
		font-size: 1.5rem;
		font-weight: bold;
		height: 3rem;
		margin: 30px;
	}
	.warning {
		color: red;
	}
</style>
