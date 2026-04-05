  const questions = [
    {
      question: "What is a variable ?",
      answers: [
        { text: "A type of loop", correct: false },
        { text: "A container to store data", correct: true },
        { text: "A function", correct: false },
        { text: "A CSS property", correct: false },
      ],
    },
    {
      question: "What is the difference between let and const?",
      answers: [
        { text: "No difference", correct: false },
        { text: "const can change, let cannot", correct: false },
        { text: "let can change, const cannot", correct: true },
        { text: "Both cannot change", correct: false },
      ],
    },
    {
      question: "What is a function?",
      answers: [
        { text: "A variable", correct: false },
        { text: "A loop", correct: false },
        { text: "A block of code that runs when called", correct: true },
        { text: "A CSS rule", correct: false },
      ],
    },
    {
      question: "What is an event listener?",
      answers: [
        { text: "A type of loop", correct: false },
        { text: "A CSS property", correct: false },
        { text: "A variable", correct: false },
        {
          text: "A function that waits for an action (click, etc.)",
          correct: true,
        },
      ],
    },
  ];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach( answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct ==="true") {
      button.classList.add("correct");
    }
    button.disabled = true ; 
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display  = "block";
}

function handleNextButton() {
  currentQuestionIndex++ ; 
  if(currentQuestionIndex < questions.length) {
    showQuestion(); 
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length) {
    handleNextButton() ;
  } else {
    startQuiz();
  }

})

startQuiz();
