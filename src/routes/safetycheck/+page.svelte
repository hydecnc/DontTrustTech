<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  // State to control input focus
  let isFocused = false;

  // Tweened value to smoothly animate vertical movement
  let offsetY = tweened(0, { duration: 400, easing: cubicOut });

  // Handle focus and blur events
  function handleFocus() {
    isFocused = true;
    offsetY.set(-100); // Move up smoothly when focused
  }

  function handleBlur() {
    isFocused = false;
    offsetY.set(0); // Return to original position when blurred
  }
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f8;
    overflow: hidden;
  }

  .input-wrapper {
    width: 400px;
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  input {
    width: 100%;
    padding: 16px;
    font-size: 18px;
    border-radius: 25px;
    border: 1px solid #ddd;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  }

  .small {
    transform: scale(0.85);
  }
</style>

<div class="container" style="transform: translateY({$offsetY}px);">
  <div class="input-wrapper" class:small={isFocused}>
    <input
      type="text"
      placeholder="What are you willing to check ?"
    />
    <!-- on:focus={handleFocus} -->
    <!-- on:blur={handleBlur} -->
  </div>
</div>

