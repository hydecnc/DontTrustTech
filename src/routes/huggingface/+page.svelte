<!-- PromptComponent.svelte -->
<script lang="ts">
    import { pipeline, env } from "@xenova/transformers";
    import { onMount } from "svelte";

    // Disable local model loading warning
    env.allowLocalModels = false;

    let prompt: string = "";
    let response: string = "";
    let loading: boolean = false;
    let modelLoading: boolean = true;
    let error: string = "";
    let generationLength: number = 100;
    let modelName: string = "Xenova/distilgpt2"; // Using a smaller model for faster loading
    let debugMessage: string = "";

    // Store the pipeline instance
    let generator: any;

    onMount(async () => {
        try {
            debugMessage = "Loading model...";
            // Initialize the pipeline
            generator = await pipeline("text-generation", modelName, {
                quantized: true,
            });
            debugMessage = "Model loaded successfully";
            modelLoading = false;
        } catch (e) {
            debugMessage = `Error loading model: ${e instanceof Error ? e.message : String(e)}`;
            error = e instanceof Error ? e.message : "Failed to load model";
            modelLoading = false;
        }
    });

    async function generateText() {
        if (!prompt.trim()) {
            error = "Please enter a prompt";
            return;
        }

        try {
            loading = true;
            error = "";
            debugMessage = "Starting generation...";

            if (!generator) {
                throw new Error("Model not loaded yet");
            }

            const result = await generator(prompt.trim(), {
                max_new_tokens: generationLength,
                temperature: 0.7,
                repetition_penalty: 1.1,
                no_repeat_ngram_size: 2,
                do_sample: true,
            });

            debugMessage = "Generation completed";
            console.log("Generation result:", result); // Debug log

            // Handle the result properly
            if (
                Array.isArray(result) &&
                result.length > 0 &&
                result[0].generated_text
            ) {
                response = result[0].generated_text;
            } else {
                throw new Error("Unexpected response format from model");
            }
        } catch (e) {
            console.error("Generation error:", e); // Debug log
            error = e instanceof Error ? e.message : "Generation failed";
            debugMessage = `Error during generation: ${error}`;
        } finally {
            loading = false;
        }
    }
</script>

<div class="max-w-2xl mx-auto p-4 space-y-4">
    <h2 class="text-2xl font-bold mb-4">Text Generation</h2>

    <!-- Debug info -->
    <div class="text-sm text-gray-600 mb-2">
        Status: {debugMessage}
    </div>

    {#if modelLoading}
        <div class="text-center p-4">
            <p>Loading model... This may take a few moments.</p>
            <p class="text-sm text-gray-600">
                The model will be downloaded the first time you use this
                component.
            </p>
        </div>
    {/if}

    <div class="space-y-2">
        <textarea
            bind:value={prompt}
            placeholder="Enter your prompt here..."
            class="w-full p-2 border rounded-md min-h-[100px] text-black"
            disabled={loading || modelLoading}
        />

        <div class="flex gap-4 items-center">
            <div class="flex items-center gap-2">
                <label for="length">Length:</label>
                <input
                    id="length"
                    type="number"
                    bind:value={generationLength}
                    min="1"
                    max="1000"
                    class="w-24 p-2 border rounded-md text-black"
                    disabled={loading || modelLoading}
                />
            </div>
            <button
                on:click={generateText}
                disabled={loading || modelLoading || !prompt.trim()}
                class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600"
            >
                {#if loading}
                    Generating...
                {:else if modelLoading}
                    Loading Model...
                {:else}
                    Generate
                {/if}
            </button>
        </div>
    </div>

    {#if error}
        <div class="p-4 bg-red-100 text-red-700 rounded-md">
            {error}
        </div>
    {/if}

    {#if response}
        <div class="p-4 bg-gray-100 rounded-md">
            <h3 class="font-bold mb-2">Generated Text:</h3>
            <p class="whitespace-pre-wrap">{response}</p>
        </div>
    {/if}
</div>
