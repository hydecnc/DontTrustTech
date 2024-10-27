<script>
	import DelayedNext from '$lib/DelayedNext.svelte';
	import KeyDisplay from '$lib/KeyDisplay.svelte';
	import { password } from '$lib/password';
	import { get } from 'svelte/store';

	let next = false;
</script>

<h1 class="h1 text-center m-8">Keyloggers</h1>
<div class="mx-3 badge-glass p-4">
	<div>While you typed in your password, we have been secretely watching your activity...</div>
	<div class="h4">
		Now, we have your password: <strong>{get(password)}</strong>.
	</div>
</div>

<div class="mx-3 badge-glass p-4 flex flex-row items-center">
	<div>
		If you think that we can only track your input in a text box, take a look at the right side of
		your screen as you press any key:
	</div>
	<KeyDisplay />
</div>

<div class="mx-3 badge-glass p-4">
	<div>We not only have your password, but also your</div>
	<ul class="list-disc pl-5">
		<li>Mouse movements</li>
		<li>IP Address</li>
		<li>Your Device Information</li>
		<li>Session Time</li>
	</ul>
</div>

<div class="flex flex-col justify-center mt-2 mx-2 px-2">
	<h2 class="h3 badge variant-ghost-error p-2 mb-2">
		Make sure to be careful when accessing Sensitive Information.
	</h2>
	<DelayedNext to="/passwords/stage1" />
</div>
