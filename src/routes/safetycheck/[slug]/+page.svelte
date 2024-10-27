<script lang="ts">
	import { getSites } from '$lib/domains_string';
	import { onMount } from 'svelte';
	import { ResultObject } from '$lib/ResultObject';
	import Resultcomponent from '$lib/Resultcomponent.svelte';
	import ChecklistDisplay from '$lib/ChecklistDisplay.svelte';

	export let data;

	type WebsiteInfo = {
		website: string;
		checklist: string;
	};

	export async function getChecklists() {
		try {
			const response = await fetch('/checklist.txt');
			const data = await response.text();
			console.log(data);

			let checklists = data.split('\n\n');

			const res = new Map();

			while (checklists.length > 0) {
				let firstElement = checklists.shift() || ''; // Remove first element
				let secondElement = checklists.length > 0 ? checklists.shift() || '' : '';
				res.set(firstElement.trim(), secondElement);
			}

			console.log(res);
			return res;
		} catch (error) {
			console.error(error);
		}
	}
	let result: Map<string, string> | undefined;
	onMount(async () => {
		result = await getChecklists();
		console.log(result);
		console.log(data.domain);
	});

	let matches = data.domain.match(/^.*[^.]/);
    let name: string;
	if (matches == null) {
		name = '';
	} else {
		name = matches[0];
	}
	let logo = `${data.domain}/favicon.ico`;
	let resultObject = new ResultObject(name, logo, data.domain, '');
</script>
{#if result}
	<!-- <Resultcomponent result={resultObject} linked={false} /> -->

    <div class="p-4 space-y-4 my-10 font-">
        <div class="flex flex-col justify-center items-center">
            <img
                src="https://icons.duckduckgo.com/ip3/www.{data.domain}.ico"
                alt={logo}
                class="w-16 h-16 rounded-full object-cover"
            />

            <h2 class="h1 text-center my-4">{resultObject.name}</h2>
            <a href={data.domain} class="font-medium text-slate-500 hover:underline">{data.domain}</a>
            <p>{resultObject.description}</p>
        </div>
        <div class="flex justify-center">
            <div class="w-full max-w-lg">
                <ChecklistDisplay checklistString={result.get(data.domain)} />
            </div>
        </div>
    </div>
{:else}
	<p>Loading...</p>
{/if}

<style>
</style>
