<script lang="ts">
	import Close from "$lib/assets/svg/Close.svelte";
	import Menu from "$lib/assets/svg/Menu.svelte";
	import { slide } from "svelte/transition";
	import { sessionStore } from "./sessionstore";
	import { get } from "svelte/store";

	const session = get(sessionStore);

	let sidebar = false;
	let display = "hidden";

	$: display = session.userThere ? "block" : "hidden";
</script>

<div id="navbar">
	<nav>
		{#if sidebar}
			<ul class="sidebar" transition:slide>
				<button on:click={() => (sidebar = false)}><Close /></button>
				<li><a href="/" on:click={() => (sidebar = false)}>Home</a></li>
				<li>
					<a
						href="/phishing"
						class={display}
						on:click={() => (sidebar = false)}>Phishing</a
					>
				</li>
				<li>
					<a
						href="/keylogger/resetpassword"
						class={display}
						on:click={() => (sidebar = false)}>Keyloggers</a
					>
				</li>
				<li>
					<a
						href="/passwords"
						class={display}
						on:click={() => (sidebar = false)}>Passwords</a
					>
				</li>
				<li>
					<a
						href="/safetycheck"
						class={display}
						on:click={() => (sidebar = false)}
						>Website Sec. Checklist</a
					>
				</li>
			</ul>
		{:else}
			<button
				class="absolute top-4 right-4"
				on:click={() => (sidebar = true)}><Menu /></button
			>
		{/if}
	</nav>
</div>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		right: 0;
		width: 250px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding-bottom: 15px;
		align-items: flex-start;
		justify-content: flex-start;
		z-index: 99;
		background-color: rgba(47, 0, 128, 0.363);
		box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		margin: 10px;
	}
	.sidebar li {
		width: 100%;
	}
	.sidebar a {
		border-radius: 8px;
		padding-left: 10px;
		width: 100%;
	}
	.sidebar button {
		align-self: flex-end;
		justify-self: flex-end;
		margin: 5px;
	}
	button {
		background: none;
		border: none;
		display: flex;
		align-content: center;
	}
	@media (max-width: 400px) {
		.sidebar {
			width: 100%;
			height: 100vh;
			margin: 0;
			padding: 0;
		}
		.sidebar * {
			padding: 5px;
		}
	}
</style>
