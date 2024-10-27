<script>
    // number of buttons clicked that are correct
    let numCorrect = 4;
    let correctMode = false;
    let showText = false;
    let allCorrect = false;
    let stage = 1;
    // Define an array of button objects with unique names and colors
    let buttons = [
        { name: "c1K!m", color: "#4CAF50", id: false },
        { name: "kee28.M!99", color: "#4CAF50", id: false },
        { name: "18NMary!lo", color: "#4CAF50", id: false },
        { name: "5zgzXZVLjN", color: "#4CAF50", id: true },
        { name: "adkk.12!!me", color: "#4CAF50", id: true },
        { name: "KASksj102798", color: "#4CAF50", id: false },
        { name: "109234782", color: "#4CAF50", id: false },
        { name: "wow13Kn2.!jo", color: "#4CAF50", id: true },
        { name: "Apple4Home!3!", color: "#4CAF50", id: false },
        { name: "A8SkMonKEY!3", color: "#4CAF50", id: true },
    ];
    let clickedColor = "red"; // Color to change to when clicked

    // Function to toggle color for a specific button
    function handleClick(index) {
        if (!showText) {
            if (buttons[index].color === clickedColor) {
                buttons[index].color = "#4CAF50";
                if (!buttons[index].id) {
                    numCorrect -= 1;
                } else {
                    numCorrect += 1;
                }
            } else {
                buttons[index].color = clickedColor;
                if (!buttons[index].id) {
                    numCorrect += 1;
                } else {
                    numCorrect -= 1;
                }
            }
        }
    }

    function submitButton() {
        showText = true;
        if (numCorrect == 10) {
            correctMode = true;
            stage = 2;
        }
    }

    function resetButton() {
        showText = false;
        correctMode = false;
        numCorrect = 4;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].color = "#4CAF50";
        }
    }

    let selectedOptions = ["", "", "", "", "", ""]; // Initialize an array with six empty strings

    // Labels for each select input
    const labels = [
        "c1K!m",
        "kee28.M!99",
        "18NMary!lo",
        "KASksj102798",
        "109234782",
        "Apple4Home!3!",
    ];

    // Options for the select input
    const options = [
        { value: "", label: "Select an option" }, // Default option
        { value: "option1", label: "1" },
        { value: "option2", label: "2" },
        { value: "option3", label: "3" },
        { value: "option4", label: "4" },
    ];

    // Expected values for each select box
    const expectedValues = [
        "option1", // Expected value for the first selection
        "option4", // Expected value for the second selection
        "option2", // Expected value for the third selection
        "option2", // Expected value for the fourth selection
        "option3", // Expected value for the fifth selection
        "option2", // Expected value for the sixth selection
    ];

    // Variable to hold the result of the submission check
    let resultMessage = "";

    // Function to check if all selected options match the expected values
    const checkAllSelections = () => {
        const allMatch = selectedOptions.every(
            (selected, index) => selected === expectedValues[index],
        );
        resultMessage = allMatch
            ? "All selections are correct! You have successfully helped Perry Password find a strong password!"
            : "Some selections are incorrect.";
    };
</script>

<div>
    <h1>
        Perry Password needs to create a new password for his bank account.
        Below are some passwords that he is considering, help him decide which
        passwords are strong or weak!  <br>Stage 1: Choose all the passwords that are weak.
    </h1>

    <br />
    <h2>Some personal information about Perry:</h2>

    <ul>
        <li>Birthday: October 27th, 1998</li>
        <li>Address: 123 Apple Street</li>
        <li>
            Father: Johnny Password, Mother: Mary Password, Sister: Penelope
            Password
        </li>
        <li>Email Password: kee28.M!99</li>
    </ul>
</div>

<div class="button-container">
    <!-- Loop through buttons and apply the corresponding color -->

    {#each buttons as { name, color }, index}
        <button
            on:click={() => handleClick(index)}
            style="background-color: {color}"
        >
            {name}
            <!-- Display the unique name -->
        </button>
    {/each}
    <!-- button when user submits final answers -->
    <button on:click={() => submitButton()}> Submit </button>

    <!-- button to reset everything -->
    <button on:click={() => resetButton()}> Retry </button>
</div>

<div>
    <!-- text about whether level is passed or not -->
    {#if showText}
        <p>Score: {numCorrect} /10</p>
        {#if correctMode}
            <p>Congrats! Let's move on to stage 2!!!</p>
            <br>
        {:else}
            <p>Almost there! Keep trying!</p>
        {/if}
    {/if}
</div>

{#if stage == 2}
    <div>
        <h1>
            Match each of the following passwords with the correct reason for
            why they are "weak". Hint: there may be reasons that are repeated
            more than once!
        </h1>
        <ol>
            <li>Password is too short</li>
            <li>Password involves personal information</li>
            <li>Password has no unique characters</li>
            <li>Password is used for multiple accounts</li>
        </ol>
    </div>

    <div class="select-container">
        {#each Array(6) as _, index}
            <!-- Create six select boxes -->
            <div>
                <label for={"options" + index}>{labels[index]}</label>
                <!-- Use unique labels -->
                <select
                    bind:value={selectedOptions[index]}
                    id={"options" + index}
                >
                    {#each options as { value, label }}
                        <option {value}>{label}</option>
                    {/each}
                </select>
            </div>
        {/each}
    </div>

    <!-- Submit button to check selections -->
    <button on:click={checkAllSelections}>Submit</button>
    <!-- Display the result of the check -->
    {#if resultMessage}
        <p class="result">{resultMessage}</p>
    {/if}
{/if}

<style>
    /* Container for buttons */
    .button-container {
        display: grid; /* Use Grid for layout */
        grid-template-columns: repeat(2, 1fr); /* Three equal columns */
        gap: 10px; /* Space between buttons */
        height: 100vh; /* Full viewport height */
        align-items: center; /* Center items vertically */
    }

    /* Basic button styling */
    button {
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        margin: 5px; /* Spacing between buttons */
    }
    /* Container for the select boxes */
    .select-container {
        display: flex; /* Use flexbox for horizontal arrangement */
        flex-wrap: wrap; /* Allows items to wrap to the next line if necessary */
        gap: 20px; /* Space between the select boxes */
    }

    select {
        padding: 10px;
        font-size: 16px;
        margin: 10px 0;
        color: black; /* Text color for the selected option */
        background-color: white; /* Background color of the select input */
    }
</style>
