// Declare variables
var counter = 65;
var questionIndex = 0;
var score = 0;
var timerInterval;
var scores = [];
var highScores = [];
const existingScores = JSON.parse(localStorage.getItem("scores")) || [];
const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const submitButton = document.getElementById("submitButton");
const startButton = document.getElementById("startButton");
const initialBtn = document.getElementById("initialBtn");
const initials = document.getElementById("initialsForm");
const userform = document.getElementById("userinitials");
const answer1 = document.getElementById('1');
const answer2 = document.getElementById('2');
const answer3 = document.getElementById('3');
const answer4 = document.getElementById('4');
const points = document.getElementById("result");
const welcome = "This is a quiz to test your knowledge of Javascript! Click below to get started."
const className = "hide";

var questions = [
    {
      question:"Which character is used to call the ID on an object",
      answers:[
        {answer:"#", correct: true},
        {answer:".", correct: false},
        {answer:"!", correct: false},
        {answer:"$", correct: false},
      ],
    },
    {
      question:"How do you call a function?",
      answers:[
        {answer:"$function", correct: false},
        {answer:"function=", correct: false},
        {answer:"function:", correct: false},
        {answer:"function()", correct: true},
      ],
    },
    {
      question:"Inside which HTML element do we put the JavaScript?",
      answers:[
        {answer:"javascript", correct: false},
        {answer:"scripting", correct: false},
        {answer:"script", correct: true},
        {answer:"js", correct: false},
      ],
    },     
    {
      question:'How do you write "Hello World" in an alert box?',
      answers:[
        {answer:'msg("Hello World")', correct: false},
        {answer:'alert("Hello World")', correct: true},
        {answer:'msgBox("Hello World")', correct: false},
        {answer:'alertBox("Hello World")', correct: false},
      ],
    },  
    {
      question: "Which of the following type of variable takes precedence over other if names are same?",
      answers:[
        {answer:"local variable", correct: true},
        {answer:"global variable", correct: false},
        {answer:"Both of the above", correct: false},
        {answer:"None of the above", correct: false},
      ],
    },    
    {
      question: "Which built-in method reverses the order of the elements of an array?",
      answers:[
        {answer:"changeOrder(order)", correct: false},
        {answer:"reverse()", correct: true},
        {answer:"order(reverse)", correct: false},
        {answer:"sort(order)", correct: false},
      ],
    },
    {
      question: "Which of the following function of String object returns a number indicating the Unicode value of the character at the given index?",
      answers:[
        {answer:"charAt()", correct: false},
        {answer:"concat()", correct: false},
        {answer:"indexOf()", correct: false},
        {answer:"charCodeAt()", correct: true},
      ],
    },
    {
      question: "Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
      answers:[
        {answer:"concat()", correct: false},
        {answer:"replace()", correct: false},
        {answer:"search()", correct: true},
        {answer:"match()", correct: false},
      ],
    }
];

window.addEventListener('load', function() {
  questionEl.innerHTML = welcome; // Your welcome message
  // Optionally, call showHighScores if on high scores page
  // showHighScores();
});

function startQuiz() {
  startButton.classList.add("hide");
  questionIndex = 0;
  score = 0; // Reset score
  updateScoreDisplay(); // Update score display
  counter = 65;
  timer.classList.remove("hide");
  startTimer();
  showQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    counter--;
    if (counter > 0) {
      document.getElementById("timer").innerHTML = `Timer: ${counter}`;
    } else {
      clearInterval(timerInterval);
      document.getElementById("timer").innerHTML = "Time's Up!";
      question.innerHTML = "Ran out of time!"
      showScore();
    }
  }, 1000);
}

function showQuestion() {
  submitButton.classList.add("hide");
  resetState(); // Call resetState to clear existing buttons before adding new ones
  let currentQuestion = questions[questionIndex];
  let questNum = questionIndex + 1;
  questionEl.innerHTML = questNum + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.answer;
    button.classList.add("answerbtn");
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtn.appendChild(button);
  });
}

function resetState() {
  while(answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    if (counter > 10) {
      counter -= 10;
    } else {
      counter = 0;
    }
  }
  updateScoreDisplay(); // Update the score display after selecting an answer

  Array.from(answerBtn.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  submitButton.classList.remove("hide");
}

function handleSubmit() {
  questionIndex ++;
  submitButton.classList.add("hide");
  if(questionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  clearInterval(timerInterval);
  // Your showScore modifications for handling score storage
  initials.classList.remove("hide");
  initialBtn.addEventListener('click', () => {
    var userinitials = userform.value;
    const newScore = { user: userinitials, score: score };
    existingScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(existingScores));
    location.reload(); // Or navigate to another page
  });
}

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("currentScore");
  if(scoreDisplay) {
    scoreDisplay.innerHTML = `Current Score: ${score}`;
  }
}

function showHighScores() {
  // Hide quiz elements
  document.getElementById("question").classList.add("hide");
  document.getElementById("answer-buttons").classList.add("hide");
  document.getElementById("startButton").classList.add("hide");
  document.getElementById("submitButton").classList.add("hide");
  // Show the high scores container
  document.getElementById("highScoresContainer").classList.remove("hide");

  // Fetch scores from localStorage, sort them, and take the top 5
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 5);

  // Display the top scores
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = topScores.map(score => `<li>${score.user}: ${score.score}</li>`).join('');
}

// Add event listener to the High Scores link
document.getElementById("highScores").addEventListener("click", showHighScores);

function backToQuiz() {
  // Show quiz elements
  document.getElementById("question").classList.remove("hide");
  document.getElementById("answer-buttons").classList.remove("hide");
  document.getElementById("startButton").classList.remove("hide");
  // Hide the high scores container
  document.getElementById("highScoresContainer").classList.add("hide");
}

// Event listeners
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', handleSubmit);

// Optionally call showHighScores if on the high score page
// window.onload = showHighScores;