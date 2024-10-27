<script lang="ts">
	import { onMount } from 'svelte';
	import { ResultObject } from './ResultObject';
	import ollama from 'ollama';

	export let result: ResultObject;
	let name = result.name;
	let domain = result.domain;
	let logo = result.logo;
	let description = result.description;

	//ollama
	import { browser } from '$app/environment';
	import { talk } from './ollamaChat';

	onMount(async () => {
		talk();
		console.log("I HATE MY LI")
	});
</script>

<section class="card w-full">
	<div class="p-4 space-y-4">
		<div class="grid grid-cols-4 gap-4">
			<img
				src="https://icons.duckduckgo.com/ip3/www.{domain}.ico"
				alt={logo}
				class="w-16 h-16 rounded-full object-cover"
			/>

			<h3 class="pr-10">{name}</h3>
		</div>
		<div class="grid grid-rows-2 gap-4"></div>
		<a href={domain} class="font-medium text-slate-500 hover:underline">{domain}</a>
		<p>{description}</p>
	</div>
</section>
