const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const skipButton = document.getElementById('skip-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Click
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}



const questions = [
  {
    question: 'Shoulder checking means:?',
    answers: [
      { text: 'Glancing towards the blind spot in the direction the driver intends to move', correct: true },
      { text: 'Glancing into the left outside mirror', correct: false },
      { text: 'Glancing into both the inside and outside mirrors', correct: false },
      { text: 'Glancing into the right outside mirror', correct: false }
    ]
  },
  {
    question: 'A traffic-lane control light with an illuminated red “X” means:',
    answers: [
      { text: 'Prepare for an emergency vehicle travelling in that lane', correct: false },
      { text: 'Reduce speed to below 30 km/h', correct: false },
      { text: 'Use that lane only for the purpose of making left turns', correct: false },
      { text: 'Travel is not permitted in that lane', correct: true }
    ]
  },
  {
    question: 'According to the law in Alberta, it is the driver’s responsibility to ensure that all passengers under what age are properly restrained in the vehicle?',
    answers: [
      { text: '18 years', correct: false },
      { text: '16 years', correct: true },
      { text: '21 years', correct: false },
      { text: '24 years', correct: false }
    ]
  },
  {
    question: 'Who is responsible and legally obligated to report any medical condition, change in health, or physical disability that may affect a driver’s ability to drive',
    answers: [
      { text: 'The driver’s employer', correct: false },
      { text: 'The driver', correct: true },
      { text: 'The driver’s doctor', correct: false },
      { text: 'The driver’s insurance company', correct: false }
    ]
  }
]