//to do
//start page                needs to have answers hidden, with centered quiz intro and start button that changes color on hover
//questions page            on start, hide start button, show queston and answer buttons that change color on hover and start timer
//next question             needs to update question and answer button text, display wrong or correct, and deduct time from clock if wrong
//time runs out or finish   hide answer buttons and timer, change text in question box to show score, open form to submit initials, save score with initials
//highscores                show top 3 scores with Initials

//Declare variables
var quizDescription = "";
var scores = [];
var highScores = [];
var correct = "That's Right!"
var incorrect = "Sorry, that's incorrect..."

//creates buttons
const answer1 = document.getElementById('1');
const answer2 = document.getElementById('2');
const answer3 = document.getElementById('3');
const answer4 = document.getElementById('4');

const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const submitBtn = document.getElementById("submitButton");
const points = document.getElementById("result");


//set starting conditions
let questionIndex = 0;
let score = 0;

window.addEventListener('load', function() {

});
  
// Class to add
const className = "hide";
  
//sets quiz at first question
var questions = [
    {
      question:"What is the capital of Alaska?",
      answers:[
        {answer:"Juneau", correct: true},
        {answer:"Anchorage", correct: false},
        {answer:"fish", correct: false},
        {answer:"bears", correct: false},
      ],
      correct: 1002,
      selected: null,
      reason: "It's Juneau, which still has a population of less than 33,000. Yikes."
    },
    {
      question:"Who founded the US Treasury?",
      answers:[
        {answer:"Lincoln", correct: false},
        {answer:"Washington", correct: false},
        {answer:"jefferson", correct: false},
        {answer:"Kenny", correct: true},
      ],
      correct: 1004,
      selected: null,
      reason: "Alexander Hamilton was a major contrinutor to the strucure of the formative years of the US government. Arguably his largest contribution, apart from being a major contributor to maturing the constitution itself, was managing and growing the fledgling US credit system."
    },
    {
      question:"Who is the first American born president?",
      answers:[
        {answer:"Anchorage", correct: false},
        {answer:"Anchorage", correct: false},
        {answer:"Anchorage", correct: true},
        {answer:"Anchorage", correct: false},
      ],
      correct: 1010,
      selected: null,
      reason: "Martin Van Buren was born in December 5th, 1782 in Kinderhook, NY. The first president not born under British rule and the first president not of British ancestry. He was of Dutch lineage."
    },     
    {
      question:"Which was not a part of the original 13 colonies?",
      answers:[
        {answer:"Anchorage", correct: false},
        {answer:"Anchorage", correct: true},
        {answer:"Anchorage", correct: false},
        {answer:"Anchorage", correct: false},
      ],
      correct: 1011,
      selected: null,
      reason: "Vermont was the 14th state which joined on March 4th, 1791."
    },  
    {
      question: "How many time zones does the USA have?",
      answers:[
        {answer:"Anchorage", correct: true},
        {answer:"Anchorage", correct: false},
        {answer:"Anchorage", correct: false},
        {answer:"Anchorage", correct: false},
      ],
      correct: 1017,
      selected: null,
      reason: "Eastern, Central, Mountain, Pacific, Alaskan, and Hawaii-Aleutian" 
    },    
];

//Start timer
function startTimer(){
    var counter = 45;
    setInterval(function() {
      counter--;
      if (counter >= 0) {
        span = document.getElementById("timer");
        span.innerHTML = counter;
      }
      if (counter === 0) {
        span.innerHTML = "Time's Up!";
        clearInterval(counter);
      }
    }, 1000);
}

function checkAnswer() {
    var answer = document.getElementsByName("answers");    
    var answer;
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked === true) {
            answer = gender[i].value;
            break
        }}    
        if (answer == "Male") {        
            alert("true")
        } 
        else {
            alert("false");
    };
}

function startQuiz() {
    questionIndex = 0;
    score = 0;
    submitButton.innerHTML = "Submit";
    startTimer();
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[questionIndex];
    let questNum = questionIndex + 1;
    questionEl.innerHTML = questNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.answer;
        button.classList.add("answerbtn");
        answerBtn.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function showResult() {
    span = document.getElementById("result");
    if (answerChoice === true) {
        span.innerHTML = correct;
    } else {
        span.innerHTML = incorrect;
    }
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
        score++
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        };
        button.disabled = true;
    });
    submitBtn.style.display = "block";
}

function handleSubmit() {
    questionIndex ++;
    if(questionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    points.innerHTML = `Score: ${score}`
}

//starts quiz
submitButton.addEventListener('click', () => {
    if (submitButton.innerHTML === "Start Quiz") {
        startQuiz();
    } else {
        if (questionIndex < questions.length) {
            handleSubmit();
        }
    }
    
    submitButton.classList.add('hide');
    // Code to start the quiz
});


