<script lang="ts">
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /** Question bank */
    let questions = [
        {
            question: "Which of these is the strongest password?",
            options: ["12345", "Sunshine2024", "Tr3e$!N$torm!", "ilovecats"],
            answer: "Tr3e$!N$torm!",
        },
        {
            question: "Is KSI thick of it song a banger or nah?",
            options: ["Yuh", "Nah"],
            answer: "Nah",
        },
        {
            question:
                "Most secure companies would not ask for password other than signing in?",
            options: ["True", "False"],
            answer: "True",
        },
        {
            question: "Which of the following is the strongest password?",
            options: [
                "password123",
                "1234abcd",
                "P@ssw0rd2024",
                "mynameisjohn",
            ],
            answer: "P@ssw0rd2024",
        },
        {
            question: "What is two factor authentication?",
            options: [
                "Logging in with only a username",
                "A method that requires two forms of identification to log in",
                "Using the same password for two accounts",
                "Enabling only a password for security",
            ],
            answer: "A method that requires two forms of identification to log in",
        },
        {
            question:
                "If a website URL begins with http instead of https, what does it mean?",
            options: [
                "Site is secure",
                "Site uses standard encryption",
                "May not be secure for personal information",
                "Site blocks malware automatically",
            ],
            answer: "May not be secure for personal information",
        },
        {
            question:
                "Choose the best option if you believe your account has been hacked",
            options: [
                "Ignore it and continue as normal",
                "Change your password immediately",
                "Share your password with a friend to help fix it",
                "Leave the account logged in on multiple devices",
            ],
            answer: "Change your password immediately",
        },
        {
            question: "What is phishing?",
            options: [
                "A secure way of sharing files",
                "A method hackers use to install software updates",
                "A type of cyberattack that tricks people into revealing personal information",
                "A safe method for transferring funds online",
            ],
            answer: "A type of cyberattack that tricks people into revealing personal information",
        },
        {
            question:
                "It's safe to click on links in emails as long as they appear to come from someone you know",
            options: ["True", "False"],
            answer: "False",
        },
        {
            question:
                "It is safe to use the same password across multiple accounts as long as the password is strong",
            options: ["True", "False"],
            answer: "False",
        },
        {
            question:
                "Keeping software up to date is a good cybersecurity practice as it helps protect against known vulnerabilities",
            options: ["True", "False"],
            answer: "True",
        },
        {
            question:
                "Phishing attacks can only happen through email and not other communication platforms",
            options: ["True", "False"],
            answer: "False",
        },
        {
            question:
                "Phishing emails often ask for personal information like passwords or credit card numbers",
            options: ["True", "False"],
            answer: "True",
        }

    ];

    // Shuffle and select only 10 questions
    let shuffledQuestions = shuffleArray([...questions]).slice(0, 10);
    let currentQuestion = 0;
    let selectedOption = "";
    let score = 0;
    let isQuizOver = false;

    function submitAnswer() {
        if (selectedOption === shuffledQuestions[currentQuestion].answer) {
            score++;
        }
        selectedOption = "";
        if (currentQuestion < shuffledQuestions.length - 1) {
            currentQuestion++;
        } else {
            isQuizOver = true;
        }
    }

    function resetQuiz() {
        score = 0;
        currentQuestion = 0;
        selectedOption = "";
        isQuizOver = false;
        shuffledQuestions = shuffleArray([...questions]).slice(0, 10);
    }

    function getEndMessage() {
        if (score <= 4) {
            return "Wow, you suck at this. I won't be surprised if you got hacked!";
        } else if (score <= 6) {
            return "You barely passed. Good job you're doing the bare minimum.";
        } else if (score <= 9) {
            return "Wow! You would be hard to hack, but not impossible..";
        } else {
            return "Congrats, you aced the quiz. This is definitely not your first attempt.";
        }
    }
</script>

<div class="text-center flex flex-col justify-center align-middle items-center">
    {#if !isQuizOver}
        <h1 class="h1 my-8">Question {currentQuestion + 1}</h1>
        <h2 class="h3 text-primary-400 mb-5 max-w-[75%]">
            {shuffledQuestions[currentQuestion].question}
        </h2>
        <div class="space-y-2 self-center mb-8">
            {#each shuffledQuestions[currentQuestion].options as option}
                <label class="space-x-2 flex items-start">
                    <input
                        type="radio"
                        class="radio"
                        bind:group={selectedOption}
                        value={option}
                    />
                    <span class="ml-8">
                        {option}
                    </span>
                </label>
            {/each}
        </div>
        <button
            on:click={submitAnswer}
            disabled={!selectedOption}
            class="btn variant-ghost-tertiary max-w-80">Submit</button
        >
    {:else}
        <h1 class="h1 text-center my-6">Quiz Over!</h1>
        <p class="text-2xl">Your score is: <strong>{score} / {shuffledQuestions.length}</strong></p>
        <p class="text-xl my-5">{getEndMessage()}</p>
        <button on:click={resetQuiz} class="btn variant-outline-tertiary text-xl">Play Again</button>
    {/if}
</div>
