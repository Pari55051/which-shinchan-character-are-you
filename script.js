// JS for quiz App
const questions = [
     {
    text: "What's your favorite color?",
    options: [
      { text: "Red", img: "./assets/quiz_assets/q1/opt1.jpeg" },
      { text: "Blue", img: "./assets/quiz_assets/q1/opt2.png" },
      { text: "Green", img: "./assets/quiz_assets/q1/opt3.png" },
      { text: "Yellow", img: "./assets/quiz_assets/q1/opt4.jpeg" }
    ]
  },
  {
    text: "Pick a weekend activity:",
    options: [
      { text: "Watching cartoons", img: "./assets/quiz_assets/q2/opt1.jpg" },
      { text: "Playing sports", img: "./assets/quiz_assets/q2/opt2.avif" },
      { text: "Reading", img: "./assets/quiz_assets/q2/opt3.jpg" },
      { text: "Sleeping", img: "./assets/quiz_assets/q2/opt4.jpg" }
    ]
  },
]

const characters = [
    { name: "SpongeBob", img: "https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg", desc: "You're fun, energetic, and always optimistic!" },
  { name: "Bugs Bunny", img: "https://upload.wikimedia.org/wikipedia/en/1/17/Bugs_Bunny.svg", desc: "You're clever, witty, and love a good laugh." },
]

let currentQuestion = 0

const questionElem = document.getElementById('question')
const optionsElem = document.getElementById('options')

const progressElem = document.getElementById('progress')

const nextBtn = document.getElementById('nextBtn')
const backBtn = document.getElementById('backBtn')

const quizBox = document.getElementById('quiz-box')
const resultBox = document.getElementById('result-box')

const charImg = document.getElementById('char-img-elem')
const charName = document.getElementById('char-name')
const charDesc = document.getElementById('char-text')


function loadQuestion () {
    let ques = questions[currentQuestion]
    questionElem.textContent = ques.text

    optionsElem.innerHTML = ""

    ques.options.forEach(opt => {
        let div = document.createElement("div")
        div.classList.add("option-card")
        div.innerHTML = `
            <img src="${opt.img}" alt="${opt.text}">
            <span>${opt.text}</span>
        `
        div.onclick = () => selectOption(div)
        optionsElem.appendChild(div)
    })

    backBtn.disabled = currentQuestion == 0
    nextBtn.textContent = currentQuestion == questions.length - 1 ? "Submit" : "Next"

    updateProgress()
}

function selectOption (div) {
    [...optionsElem.children].forEach(opt => {
        opt.classList.remove("selected")
    })
    div.classList.add("selected")
}

function updateProgress () {
    let progressPercent = ((currentQuestion + 1) / questions.length) * 100
    progressElem.style.width = progressPercent + "%"
}



backBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--
        loadQuestion()
    }
})

nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++
        loadQuestion()
    } else {
        showResult()
    }
})



function showResult () {
    quizBox.classList.add("hidden")
    resultBox.classList.remove("hidden")

    let randomChar = characters[Math.floor(Math.random() * characters.length)]
    charImg.src = randomChar["img"]
    charName.textContent = randomChar["name"]
    charDesc.textContent = randomChar["desc"]
}



function restartQuiz () {
    currentQuestion = 0
    
    quizBox.classList.remove("hidden")
    resultBox.classList.add("hidden")

    loadQuestion()
}

// initial startup
loadQuestion()

// JS for light/dark mode