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
var allQuestions = ["question1", 'question2', 'question3', 'question4', 'question5'];



//creates buttons
const startButton = document.getElementById('startButton');
const answer1 = document.getElementById('option1');
const answer2 = document.getElementById('option2');
const answer3 = document.getElementById('option3');
const answer4 = document.getElementById('option4');


//set starting conditions
window.addEventListener('load', function() {

    //hides answer buttons
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].classList.add('hide');
    }

});




// Sample array of objects
const answerButtons = [
    answer1, answer2, answer3, answer4
  ];
  
  // Class to add
  const className = "hide";
  
//sets quiz at first question


console.log(textArea);


  
  


function startQuiz() {

}




//starts quiz
startButton.addEventListener('click', () => {
    startButton.classList.add('hide');
    // Code to start the quiz

    // Unhide answer buttons
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].classList.remove('hide');
      }

    var currentQuestion = 0

    for (let i = 0; i < allQuestions.length; i++) {
        textArea = allQuestions[i];
        console.log(textArea);

    }


    //Start timer


});


