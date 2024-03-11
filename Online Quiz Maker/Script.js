const container = document.querySelector('.container');
const h1 = document.querySelector('h1');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const createQuiz = document.querySelector('.createQuiz');
const takeQuiz = document.querySelector('.takeQuiz');
const inputContainer = document.querySelector('.inputContainer');
const inputQuestion = document.querySelector('.inputQuestion');
const inputChoices = document.querySelector('.inputChoices');
const inputAnswer = document.querySelector('.inputAnswer');
const nextInput = document.querySelector('.nextInput');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    shuffleQuestions();
}

const takeInput = () =>{
    inputQuestion.innerHTML = "<h3>Question: <br> <input type = 'text' placeholder = 'Enter your question here'></h3>";
    inputChoices.innerHTML = "<h3>Choices: <br> <input type = 'text' placeholder = 'Enter your choices here'></h3>";
    inputAnswer.innerHTML = "<h3>Answer: <br> <input type = 'text' placeholder = 'Enter your answer here'></h3>";
}

const submitQuiz = () =>{
    inputQuestion.style.display = "none";
    inputChoices.style.display = "none";
    inputAnswer.style.display = "none";
    inputContainer.innerHTML = "<h2>You have submitted the quiz. Thank You!</h2>";
}

// Adding Event Listener to Start Button
takeQuiz.addEventListener('click', ()=>{
    takeQuiz.style.display = "none";
    createQuiz.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

createQuiz.addEventListener('click', ()=>{
    inputContainer.style.display = "block";
    takeQuiz.style.display = "none";
    createQuiz.style.display = "none";
    nextInput.style.display = "block";
    takeInput();
});

nextInput.addEventListener('click', () =>{
    for(let i=0;i<2;i++){
        nextInput.textContent = "Next";
        takeInput();
    }
    submitQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});