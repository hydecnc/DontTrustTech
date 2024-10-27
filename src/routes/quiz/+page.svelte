<script>
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    /** Question bank */
    let questions = [
      { question: "What is the highest tier title one can be bestowed?", options: ["Alpha", "Sigma", "Beta", "Rizzler"], answer: "Sigma" },
      { question: "Is KSI thick of it song a banger or nah?", options: ["Yuh","Nah"], answer: "Nah" },
      { question: "Most secure companies would not ask for password other than signing in?", options: ["True", "False"], answer: "True" },
      { question: "Which of the following is the strongest password?", options: ["password123","1234abcd","P@ssw0rd2024","mynameisjohn"], answer: "P@ssw0rd2024" },
      { question: "What is two factor authentication?", options: ["Logging in with only a username","A method that requires two forms of identification to log in","Using the same password for two accounts","Enabling only a password for security"], answer: "A method that requires two forms of identification to log in" },
      { question: "If a website URL begins with http instead of https, what does it mean?", options: ["Site is secure","Site uses standard encryption","May not be secure for personal information","Site blocks malware automatically"], answer: "May not be secure for personal information" },
      { question: "Choose the best option if you believe your account has been hacked", options:["Ignore it and continue as normal","Change your password immediately","Share your password with a friend to help fix it","Leave the account logged in on multiple devices"], answer: "Change your password immediately" },
      { question: "What is phishing?", options: ["A secure way of sharing files","A method hackers use to install software updates","A type of cyberattack that tricks people into revealing personal information","A safe method for transferring funds online"], answer: "A type of cyberattack that tricks people into revealing personal information" },
      { question: "It's safe to click on links in emails as long as they appear to come from someone you know", options: ["True","False"], answer: "False" },
      { question: "It is safe to use the same password across multiple accounts as long as the password is strong", options: ["True","False"], answer: "False" },
      { question: "Keeping software up to date is a good cybersecurity practice as it helps protect against known vulnerabilities", options: ["True","False"], answer: "True" }
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
      shuffledQuestions = shuffleArray([...questions]).slice(0, 10); // Shuffle and select 10 new questions
    }
  </script>
  
  <main>
    {#if !isQuizOver}
      <h3>Question {currentQuestion + 1}</h3>
      <h2>{shuffledQuestions[currentQuestion].question}</h2>
      <div>
        {#each shuffledQuestions[currentQuestion].options as option}
          <label>
            <input type="radio" bind:group={selectedOption} value={option} /> {option}
          </label>
        {/each}
      </div>
      <button on:click={submitAnswer} disabled={!selectedOption}>Submit</button>
    {:else}
      <h2>Quiz Over!</h2>
      <p>Your score is: {score} / {shuffledQuestions.length}</p>
      <button on:click={resetQuiz}>Play Again</button>
    {/if}
  </main>
  
  <style>
    main {
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 20px auto;
      text-align: center;
    }
  
    h3 {
      font-size: 18px;
      color: #555;
    }
  </style>
  