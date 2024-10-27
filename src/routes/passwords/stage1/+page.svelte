<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { initializeStores, Modal, getModalStore } from '@skeletonlabs/skeleton';

	// number of buttons clicked that are correct
	let numCorrect = 4;

	initializeStores();
	const modalStore = getModalStore();

	// Define an array of button objects with unique names and colors
	let buttons = [
		{ name: 'c1K!m', isSecure: false, isSelected: false },
		{ name: 'kee28.M!99', isSecure: false, isSelected: false },
		{ name: '18NMary!lo', isSecure: false, isSelected: false },
		{ name: '5zgzXZVLjN', isSecure: true, isSelected: false },
		{ name: 'adkk.12!!me', isSecure: true, isSelected: false },
		{ name: 'KASksj102798', isSecure: false, isSelected: false },
		{ name: '109234782', isSecure: false, isSelected: false },
		{ name: 'wow13Kn2.!jo', isSecure: true, isSelected: false },
		{ name: 'Apple4Home!3!', isSecure: false, isSelected: false },
		{ name: 'A8SkMonKEY!3', isSecure: true, isSelected: false }
	];

	// Function to toggle selection for a specific button
	function handleClick(index: number) {
		buttons[index].isSelected = !buttons[index].isSelected;
		buttons = [...buttons]; // Trigger Svelte reactivity

		// Update numCorrect based on selections
		numCorrect = buttons.reduce((count, button) => {
			return count + (button.isSelected === !button.isSecure ? 1 : 0);
		}, 0);
		console.log(numCorrect);
	}

	function submitButton() {
		if (numCorrect === 10) {
			const modal: ModalSettings = {
				type: 'confirm',
				title: `Score: ${numCorrect}/10`,
				body: 'Congratulations! You passsed to stage 2.',
				response: (r: boolean) => {
					if (r) {
						goto('stage2');
					}
				}
			};
			modalStore.trigger(modal);
		} else {
			const modal: ModalSettings = {
				type: 'alert',
				title: `Score: ${numCorrect}/10`,
				body: 'Almost there! Keep trying!'
			};
			modalStore.trigger(modal);
		}
	}

	function resetButton() {
		numCorrect = 4;
		buttons = buttons.map((button) => ({ ...button, isSelected: false }));
	}

	function getButtonClass(isSelected: boolean): string {
		return `btn variant-glass-secondary h-12 ${isSelected ? 'variant-glass-error' : 'variant-glass-success'}`;
	}
</script>

<h1 class="h1 text-center my-4">Passwords!</h1>
<div class="p-6 flex flex-col">
	<div>
		Perry Password needs to create a new password for his bank account. Below are some passwords
		that he is considering, help him decide which passwords are strong or weak!
	</div>
	<div class="h4 badge variant-glass-primary self-center my-4">
		Stage 1: Choose all the passwords that are weak.
	</div>

	<h2 class="h5">Some personal information about Perry:</h2>

	<ul>
		<li><strong>Birthday 🎂</strong>: October 27th, 1998</li>
		<li><strong>Address 🏠︎</strong>: 123 Apple Street</li>
		<li>
			<strong>Father 🧔‍♂️</strong>: Johnny Password
			<strong>Mother 👩</strong>: Mary Password,
			<strong>Sister 🧑‍🦰</strong>: Penelope Password
		</li>
		<li><strong>Email Password 🔐</strong>: kee28.M!99</li>
	</ul>
</div>

<div class="flex flex-col justify-center align-middle">
	<div class="grid grid-cols-2 gap-4 mx-6">
		{#each buttons as button, index}
			<button class={getButtonClass(button.isSelected)} on:click={() => handleClick(index)}>
				{button.name}
			</button>
		{/each}
	</div>

	<div class="flex justify-center gap-4 mt-4">
		<button class="btn variant-ghost-primary" on:click={submitButton}> Submit </button>
		<button class="btn variant-ghost-secondary" on:click={resetButton}> Reset </button>
	</div>
</div>

<Modal />

<style>
	.button-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		height: 100vh;
		align-items: center;
	}

	button {
		color: white;
		border: none;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s ease;
		margin: 5px;
	}

	.select-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
</style>
