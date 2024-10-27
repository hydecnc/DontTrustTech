<script lang="ts">
	export let checklistString: string | undefined;
	let checklist: string[] = [];
	let no_checklist = false;

	if (checklistString !== undefined && checklistString.trim() !== '') {
		console.log(checklistString);
		console.log(checklistString.trim());
		checklist = checklistString.split('- ');
		checklist.shift();
	} else {
		no_checklist = true;
	}
</script>

<div class="w-full text-token card p-4 space-y-4 flex flex-col">
	{#if no_checklist}
		<h2 class="text-center">
			This Website is not safe.
			<strong>DO NOT</strong> trust them.
		</h2>
		<div class="flex flex-col justify-center align-middle">
			<img src="https://www.billboard.com/wp-content/uploads/2024/04/Metro-Boomin-and-Future-press-credit-Matt-Adam-2024-billboard-1548.jpg"
			alt="We Don't Trust You"
			class="h-64 self-center rounded-lg shadow-lg"
			/>
		</div>
	{:else}
	<h2>Some suggestions to keep in mind:</h2>
		<ul class="list">
			{#each checklist as item}
				<li>
					<span class="badge-icon p-4 variant-soft-primary">-</span>
					<span class="flex-auto">{item}</span>
				</li>
			{/each}
		</ul>
	
		<p>The recommendations are based on previous database breaches and the website's current security protocols.</p>
	{/if}
</div>
