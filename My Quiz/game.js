const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Who is the highest paid actor?",
        choice1: "Will Smith",
        choice2: "Dwayne Johnson",
        choice3: "Brad Pitt",
        choice4: "Vin Diesal",
        answer: 2,
    },
    {
        question: "Which fruit has the highest amount of vitamin C?",
        choice1: "Orange",
        choice2: "Apple",
        choice3: "Plum",
        choice4: "Guava",
        answer: 4,
    },
    {
        question: "Which film has the highest IMDB rating?",
        choice1: "Inception (2010)",
        choice2: "Shawshank Redemption (1994)",
        choice3: "The Dark Knight (2008)",
        choice4: "Pulp Fiction (1994)",
        answer: 2,
    },
    {
        question: "Who developed JavaScript?",
        choice1: "Brendan Eich",
        choice2: "Bill Gates",
        choice3: "Steve Jobs",
        choice4: "Jeff Bezos",
        answer: 1,
    },
    {
        question: "What are the total number of episodes in Game of Thrones?",
        choice1: "50",
        choice2: "33",
        choice3: "100",
        choice4: "73",
        answer: 4,
    },
    {
        question: "What is 50 * 100?",
        choice1: "500",
        choice2: "4",
        choice3: "5000",
        choice4: "19",
        answer: 3,
    },
    {
        question: "What is the largest desert in the world?",
        choice1: "Sahara",
        choice2: "Antarctic",
        choice3: "Arctic",
        choice4: "Arabian",
        answer: 2,
    },
    {
        question: "What is the highest mountain on Earth?",
        choice1: "Mount Everest",
        choice2: "Broad Peak",
        choice3: "K12",
        choice4: "K2",
        answer: 1,
    },
    {
        question: "What are the Seven Seas of the world?",
        choice1: "Arctic, North Pole, South Atlantic, North Pacific, South Pacific, Indian, and Southern Oceans",
        choice2: "Arctic, North Atlantic, Atlantic ocean, South Shields, Indian, and Southern Oceans",
        choice3: "Arctic, North Atlantic, South Atlantic, North Pacific, South Pacific, Indian, and Southern Oceans",
        choice4: "North Atlantic, South Atlantis, North Pacific, South Pacific, Indian, and North West Oceans",
        answer: 3,
    },
    {
        question: "What is the highest grossing film ever made?",
        choice1: "Avatar",
        choice2: "Avengers: Endgame",
        choice3: "Star Wars: The Force Awakens",
        choice4: "Titanic",
        answer: 1,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()