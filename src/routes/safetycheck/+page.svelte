<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { ResultObject } from '../../lib/ResultObject';
	import Resultcomponent from '$lib/ResultComponent.svelte';
	import { searchSites } from '$lib/search';
	import { get } from 'svelte/store';
	import { domainStringData } from '$lib/domains_string';


	let isFocused: boolean = false;
	let offsetY = tweened<number>(0, { duration: 400, easing: cubicOut });

	function handleFocus(): void {
		isFocused = true;
		offsetY.set(-100);
	}

	function handleBlur(): void {
		isFocused = false;
		offsetY.set(0);
	}

	let items: string[] = [];
	let top: string[] = [];
	let topObjects: ResultObject[] = [];

	async function handleInput(e: Event) {
		let domainStringD = await get(domainStringData);

		if (domainStringD !== undefined) {
			items = searchSites(e.target.value, domainStringD);
		}

		top = items.slice(0, 10);
		topObjects = [];
		top.forEach((domain) => {
			var matches = domain.match(/^.*[^.]/);
			if (matches == null) {
				var name = '';
			} else {
				name = matches[0];
			}
			var logo = `${domain}/favicon.ico`;
			topObjects.push(new ResultObject(name, logo, domain, ''));
		});
	}
</script>

<div
	class="flex justify-center items-center h-screen overflow-hidden"
	style="transform: translateY({$offsetY}px);"
>
	<div
		class={`w-96 transition-transform duration-400 ${isFocused ? 'scale-85' : ''} space-y-6`}
		style="transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);"
	>
		<input
			type="text"
			placeholder="What are you willing to check?"
			on:focus={handleFocus}
			on:blur={handleBlur}
			class="w-full p-4 text-lg rounded-full border border-gray-300 outline-none transition duration-200 focus:border-blue-500 focus:shadow-md focus:shadow-blue-300/50
      text-black"
			on:input={handleInput}
		/>
		<div class="overflow-auto max-h-72 flex flex-col gap-4">
			{#each topObjects as item}
				<Resultcomponent result={item} />
			{/each}
		</div>
	</div>
</div>
