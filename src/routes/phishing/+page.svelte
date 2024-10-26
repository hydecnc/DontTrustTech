<script lang="ts">
	import Email from "$lib/Email.svelte";
	import { user } from "$lib/store";
	import { get } from "svelte/store";
    
</script>

<Email user={get(user)} />