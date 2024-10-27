<script lang="ts">
	import { goto } from "$app/navigation";
	import { fade } from "svelte/transition";

	import { sessionStore } from "$lib/sessionstore";

	let username: string = "";
	let invalidInput: boolean = false;
	const registerUser = async () => {
		if (username == "") {
			invalidInput = true;
			return -1;
		}
		sessionStore.setSession(username, true);
		await goto("phishing");
	};
</script>

<div class="h-screen w-full flex flex-col justify-center items-center">
	<h1
		class="h1 text-center m-5 text-6xl text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-indigo-200 [text-shadow:_0_1px_5px_rgb(255_255_255_/_20%)]"
	>
		Don't Trust Tech.
	</h1>
	<div class="justify-center align-middle flex-col gap-2 text-center">
		<!-- <div class="badge variant-ghost-warning my-4">
			Make sure to turn your volume up for the best experience.
		</div> -->
		<div class="h2 text-4xl mb-6">
			Enter your username here to get started:
		</div>
		<input
			class="input p-2 text-base max-w-52 text-black"
			placeholder="your username here"
			bind:value={username}
		/>
	</div>
	<div class="flex align-middle justify-center flex-col max-w-96">
		<button
			on:click={registerUser}
			class="btn variant-outline-primary text-2xl font-bold h-12 m-8"
			>I'm Ready</button
		>
		{#if invalidInput}
			<aside
				class="alert variant-ghost-warning"
				transition:fade={{ duration: 200 }}
			>
				Please type in your username before proceeding!
			</aside>
		{/if}
	</div>
</div>
