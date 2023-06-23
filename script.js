const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices');
const timeRemaining = document.getElementById('time-remaining');
const gameOverContainer = document.getElementById('game-over');
const scoreForm = document.getElementById('score-form');
const initialsInput = document.getElementById('initials');

let currentQuestionIndex = 0;
let timeLeft = 60; 
let timerInterval;

const questions = [
  {
    question: 'Question 1: What is the capital of France?',
    choices: ['Paris', 'Madrid', 'Berlin', 'London'],
    answer: 'Paris'
  },
  {
    question: 'Question 2: Which planet is known as the Red Planet?',
    choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    answer: 'Mars'
  }
];

startButton.addEventListener('click', startQuiz);
scoreForm.addEventListener('submit', saveScore);

function startQuiz() {
  startButton.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
  displayQuestion();
}

function updateTimer() {
  timeLeft--;
  timeRemaining.textContent = timeLeft;
  if (timeLeft <= 0) {
    endQuiz();
  }
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  choicesContainer.innerHTML = '';

  currentQuestion.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.classList.add('choice-btn');
    button.classList.add('w3-button');
    button.classList.add('w3-white');
    button.classList.add('w3-border');
    button.classList.add('w3-border-red');
    button.classList.add('w3-round-large');
    button.addEventListener('click', checkAnswer);
    choicesContainer.appendChild(button);
  });
}

function checkAnswer(event) {
  const selectedButton = event.target;
  const selectedAnswer = selectedButton.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  } else {
    timeLeft -= 10; 
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  questionText.textContent = '';
  choicesContainer.innerHTML = '';
  gameOverContainer.style.display = 'block';
}

function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value;
  const score = timeLeft;
  alert(`Score saved: ${initials} - ${score}`);
}
