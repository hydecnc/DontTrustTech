<!-- TypingTest.svelte -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { password } from "./password";

    let text = "**************";
    let userInput = "";
    let isTestComplete = false;

    const done = () => {
        password.set(userInput);
        goto("teach");
    };
</script>

<div class="max-w-2xl mx-auto p-6 space-y-6 flex justify-center flex-col">
    <h1
        class="h2 badge variant-filled-primary rounded-md p-2 text-center m-auto w-3/4 font-bold text-gray-800"
    >
        Reset Your Password:
    </h1>

    <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg font-medium text-gray-700">
            {text}
        </p>
    </div>

    <textarea
        bind:value={userInput}
        disabled={isTestComplete}
        class="w-full h-32 p-4 border input rounded-md resize-none"
        placeholder="New password here:"
    ></textarea>

    <button on:click={done} class="btn variant-ghost-secondary px-4 py-2">
        Done
    </button>
</div>
