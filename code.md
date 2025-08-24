<div id="quiz-container">
    <!-- Question Section -->
    <div id="quiz-box">
      <h2 id="question"></h2>
      <div id="options"></div>

      <div class="nav-buttons">
        <button id="backBtn" disabled>Back</button>
        <button id="nextBtn">Next</button>
      </div>

      <div id="progress-bar">
        <div id="progress"></div>
      </div>
    </div>

    <!-- Result Section (hidden initially) -->
    <div id="result-box" class="hidden">
      <h2>You are...</h2>
      <img id="character-img" alt="Character">
      <p id="character-desc"></p>
      <button onclick="restartQuiz()">Restart Quiz</button>
    </div>
  </div>

================================================================================================================================================


body {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  background: #f0f0f0;
}

#quiz-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

#options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
}

.option-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: #f9f9f9;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.option-card img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.option-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.option-card.selected {
  border: 2px solid #4caf50;
  background: #eaffea;
}


#options button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 80%;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.nav-buttons {
  margin-top: 20px;
}

#progress-bar {
  background: #ddd;
  height: 10px;
  width: 100%;
  border-radius: 6px;
  margin-top: 20px;
}

#progress {
  background: #4caf50;
  height: 100%;
  width: 0%;
  border-radius: 6px;
}

.hidden {
  display: none;
}

#result-box img {
  width: 200px;
  margin: 20px 0;
}


================================================================================================================================================



// script.js

// Quiz questions (you can expand this)
const questions = [
  {
    text: "What's your favorite color?",
    options: [
      { text: "Red", img: "https://via.placeholder.com/50/ff0000" },
      { text: "Blue", img: "https://via.placeholder.com/50/0000ff" },
      { text: "Green", img: "https://via.placeholder.com/50/00ff00" },
      { text: "Yellow", img: "https://via.placeholder.com/50/ffff00" }
    ]
  },
  {
    text: "Pick a weekend activity:",
    options: [
      { text: "Watching cartoons", img: "https://via.placeholder.com/50/f0c" },
      { text: "Playing sports", img: "https://via.placeholder.com/50/0cf" },
      { text: "Reading", img: "https://via.placeholder.com/50/ccc" },
      { text: "Sleeping", img: "https://via.placeholder.com/50/333" }
    ]
  },
  {
    text: "What's your favorite color?",
    options: [
      { text: "Red", img: "https://via.placeholder.com/50/ff0000" },
      { text: "Blue", img: "https://via.placeholder.com/50/0000ff" },
      { text: "Green", img: "https://via.placeholder.com/50/00ff00" },
      { text: "Yellow", img: "https://via.placeholder.com/50/ffff00" }
    ]
  },
  {
    text: "Pick a weekend activity:",
    options: [
      { text: "Watching cartoons", img: "https://via.placeholder.com/50/f0c" },
      { text: "Playing sports", img: "https://via.placeholder.com/50/0cf" },
      { text: "Reading", img: "https://via.placeholder.com/50/ccc" },
      { text: "Sleeping", img: "https://via.placeholder.com/50/333" }
    ]
  },
  {
    text: "What's your favorite color?",
    options: [
      { text: "Red", img: "https://via.placeholder.com/50/ff0000" },
      { text: "Blue", img: "https://via.placeholder.com/50/0000ff" },
      { text: "Green", img: "https://via.placeholder.com/50/00ff00" },
      { text: "Yellow", img: "https://via.placeholder.com/50/ffff00" }
    ]
  },
  {
    text: "Pick a weekend activity:",
    options: [
      { text: "Watching cartoons", img: "https://via.placeholder.com/50/f0c" },
      { text: "Playing sports", img: "https://via.placeholder.com/50/0cf" },
      { text: "Reading", img: "https://via.placeholder.com/50/ccc" },
      { text: "Sleeping", img: "https://via.placeholder.com/50/333" }
    ]
  }
  // ... add more questions
];


// Character results (randomly chosen at the end)
const characters = [
  { name: "SpongeBob", img: "https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg", desc: "You're fun, energetic, and always optimistic!" },
  { name: "Bugs Bunny", img: "https://upload.wikimedia.org/wikipedia/en/1/17/Bugs_Bunny.svg", desc: "You're clever, witty, and love a good laugh." },
  { name: "Scooby-Doo", img: "https://upload.wikimedia.org/wikipedia/en/5/5f/Scooby-Doo.svg", desc: "You're loyal, friendly, and always up for a snack!" }
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const characterImg = document.getElementById("character-img");
const characterDesc = document.getElementById("character-desc");

// Load a question
function loadQuestion() {
  let q = questions[currentQuestion];
  questionEl.textContent = q.text;

  optionsEl.innerHTML = "";
  q.options.forEach(opt => {
    let div = document.createElement("div");
    div.classList.add("option-card");
    div.innerHTML = `
      <img src="${opt.img}" alt="${opt.text}">
      <span>${opt.text}</span>
    `;
    div.onclick = () => selectOption(div);
    optionsEl.appendChild(div);
  });

  backBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Submit" : "Next";

  updateProgress();
}


// Highlight selected option
function selectOption(div) {
  [...optionsEl.children].forEach(opt => opt.classList.remove("selected"));
  div.classList.add("selected");
}

// Update progress bar
function updateProgress() {
  let progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  progressEl.style.width = progressPercent + "%";
}

// Next button logic
nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
});

// Back button logic
backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

// Show result
function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  let randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  characterImg.src = randomCharacter.img;
  characterDesc.textContent = randomCharacter.desc;
}

// Restart quiz
function restartQuiz() {
  currentQuestion = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

// Start quiz
loadQuestion();
