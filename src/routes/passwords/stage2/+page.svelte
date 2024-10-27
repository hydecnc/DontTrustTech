<script lang="ts">
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { initializeStores, Modal, getModalStore } from '@skeletonlabs/skeleton';

	initializeStores();
	const modalStore = getModalStore();

	// Initialize selected options with empty strings
	let selectedOptions = Array(6).fill('');
	let stage = 2;

	// Labels for each select input with their corresponding expected answers
	const passwordData = [
		{ password: 'c1K!m', expectedAnswer: '1' },
		{ password: 'kee28.M!99', expectedAnswer: '4' },
		{ password: '18NMary!lo', expectedAnswer: '2' },
		{ password: 'KASksj102798', expectedAnswer: '2' },
		{ password: '109234782', expectedAnswer: '3' },
		{ password: 'Apple4Home!3!', expectedAnswer: '2' }
	];

	// Function to handle selection changes
	function handleSelection(index: number, value: string) {
		selectedOptions[index] = value;
	}

	// Function to show the results modal
	function showResultsModal(isSuccess: boolean, correctCount: number, feedback: string[]) {
		const modal: ModalSettings = {
			type: 'alert',
			title: isSuccess ? '🎉 Success!' : '📝 Results',
			body: `<div class="space-y-4">
                    <p class="text-lg">
                        You got <strong>${correctCount}</strong> out of <strong>${passwordData.length}</strong> correct.
                    </p>
                    ${
											isSuccess
												? '<p class="text-green-500 font-bold mt-4">Congratulations! You have successfully identified why each password is weak!</p>'
												: '<p class="text-blue-500 mt-4">Try again to improve your score!</p>'
										}
                </div>`,
			buttonTextCancel: 'Close',
			modalClasses: 'w-modal',
		};

		modalStore.trigger(modal);
	}

	// Function to check if all selected options match the expected values
	function checkAllSelections() {
		let correctCount = 0;
		let feedback: string[] = [];

		// Check if any options are unselected
		if (selectedOptions.includes('')) {
			const modal: ModalSettings = {
				type: 'alert',
				title: '⚠️ Incomplete Selections',
				body: 'Please select an option for all passwords before submitting.',
				buttonTextConfirm: 'OK'
			};
			modalStore.trigger(modal);
			return;
		}

		passwordData.forEach((data, index) => {
			if (selectedOptions[index] === data.expectedAnswer) {
				correctCount++;
			} else {
				feedback.push(`"${data.password}" is incorrect`);
			}
		});

		const isSuccess = correctCount === passwordData.length;
		showResultsModal(isSuccess, correctCount, feedback);
	}
</script>

<Modal />

<h1 class="h1 text-center my-4">Passwords!</h1>
<div class="p-6 flex flex-col">
	<div>
		Match each of the following passwords with the correct reason for why they are "weak". Hint:
		there may be reasons that are repeated more than once!
	</div>
	<div class="h4 badge variant-glass-primary self-center my-4">
		Stage 2: Find why passwords are weak.
	</div>
	<div class="w-full text-token card p-4 space-y-4">
		<ol class="list">
			<li>
				<span class="badge-icon p-4 variant-soft-primary">1.</span>
				<span class="flex-auto">Password is too short</span>
			</li>
			<li>
				<span class="badge-icon p-4 variant-soft-primary">2.</span>
				<span class="flex-auto">Password involves personal information</span>
			</li>
			<li>
				<span class="badge-icon p-4 variant-soft-primary">3.</span>
				<span class="flex-auto">Password has no unique characters</span>
			</li>
			<li>
				<span class="badge-icon p-4 variant-soft-primary">4.</span>
				<span class="flex-auto">Password is used for multiple accounts</span>
			</li>
		</ol>
	</div>
</div>

<div class="select-container flex justify-center align-middle">
	<div class="grid grid-cols-3 gap-8">
		{#each passwordData as { password }, index}
			<label class="label text-white w-42">
				<span class="font-bold">{password}</span>
				<select
					class="select"
					value={selectedOptions[index]}
					on:change={(e) => handleSelection(index, e.target.value)}
				>
					<option value="">Select an option</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
			</label>
		{/each}
	</div>
</div>

<div class="flex justify-center my-8">
	<button on:click={checkAllSelections} class="btn variant-filled-primary"> Submit </button>
</div>

<style>
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

	select {
		padding: 10px;
		font-size: 16px;
		margin: 10px 0;
		color: black;
		background-color: white;
	}

	:global(.w-modal) {
		width: 90%;
		max-width: 600px;
	}
</style>
