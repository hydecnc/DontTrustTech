import { pipeline, env } from "@huggingface/transformers";

// Configure environment settings
env.localModelPath = './models'; // Optional: Set local model cache directory
env.allowRemoteModels = true;    // Ensure remote model loading is enabled

export const huggy = async () => {
    try {
        console.log('Starting model loading...');

        const generator = await pipeline('text-generation', 'Xenova/distilgpt2');
        const text = 'Once upon a time, there was';
        const output = await generator(text, {
            temperature: 2,
            max_new_tokens: 10,
            repetition_penalty: 1.5,
            no_repeat_ngram_size: 2,
            num_beams: 2,
            num_return_sequences: 2,
        });
        // [{
        //   "generated_text": "Once upon a time, there was an abundance of information about the history and activities that"
        // }, {
        //   "generated_text": "Once upon a time, there was an abundance of information about the most important and influential"
        // }]

        console.log('Model loaded successfully. Generating text...');


        console.log('Generated output:', output);
        return output;
    } catch (error) {
        console.error('Error in text generation:', error);
        throw error;
    }
};

// Example usage with proper error handling
const runExample = async () => {
    try {
        console.log('Starting text generation...');
        const result = await huggy();
        console.log('Final result:', result);
    } catch (error) {
        console.error('Failed to generate text:', error);
    }
};

// Uncomment to run:
runExample();