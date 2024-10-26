<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';

	let username: string = '';
	let invalidInput: boolean = false;

	const registerUser = async () => {
        console.log(username)
		if (username == '') {
			invalidInput = true;
			return -1;
		}
		user.set(username);
		await goto('phishing');
	};
</script>

<h1 id="dtt">Don't Trust Tech.</h1>

<div class="userinput">
	Enter your username here to get started:
	<input placeholder="your username here" bind:value={username} />
</div>

<div class="start">
	<button on:click={registerUser} class="btn">I'm Ready</button>
	{#if invalidInput}
		<div class="warning">Please type in your username before proceeding!</div>
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
