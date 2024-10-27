<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    interface Keypress {
        key: string;
        id: number;
        x: number;
        y: number;
    }

    let keypresses: Keypress[] = [];

    function handleKeyPress(event: KeyboardEvent) {
        const newKeypress: Keypress = {
            key: event.key,
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
        };

        keypresses = [...keypresses, newKeypress];

        setTimeout(() => {
            keypresses = keypresses.filter((k) => k.id !== newKeypress.id);
        }, 1000);
    }

    onMount(() => {
        if (browser) {
            window.addEventListener("keydown", handleKeyPress);
        }
    });

    onDestroy(() => {
        if (browser) {
            window.removeEventListener("keydown", handleKeyPress);
        }
    });
</script>

<div class="w-full max-w-2xl mx-auto p-6">
    <div
        class="badge variant-glass-secondary w-full rounded-lg h-64 p-4 relative overflow-hidden"
    >
        {#each keypresses as keypress (keypress.id)}
            <div
                class="badge variant-glass-tertiary key-element inline-flex items-center justify-center text-black px-2 rounded-md text-lg"
                style="--x: {keypress.x}%; --y: {keypress.y}%;"
            >
                {keypress.key === " " ? "Space" : keypress.key}
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    @keyframes scaleInOut {
        0% {
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0;
        }
        30% {
            transform: translate(-50%, -50%) scale(1.02);
            opacity: 1;
        }
        40% {
            transform: translate(-50%, -50%) scale(0.98);
            opacity: 1;
        }
        60% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0;
        }
    }

    .key-element {
        position: absolute;
        left: var(--x);
        top: var(--y);
        transform-origin: center center;
        animation: scaleInOut 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        pointer-events: none;
    }
</style>
