import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL : "https://playground-fca51-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const scoreInDB = ref(database, "score")

const questions = [
    {
        question: "Cili është kontinenti më i madh në botë?",
        answers: [
            { text: "Afrika", correct: false},
            { text: "Azia", correct: true},
            { text: "Europa", correct: false},
            { text: "Antarktida", correct: false},
        ]
    }, 
    {
        question: "Toka është planeti i satë në rradhë nga Dielli?",
        answers: [
            { text: "I parë", correct: false},
            { text: "I dytë", correct: false},
            { text: "I tretë", correct: true},
            { text: "I katërt", correct: false},
        ]
    },
    {
        question: "Në cilin vit përfundoi lufta e dytë botërore?",
        answers: [
            { text: "1945", correct: true},
            { text: "1940", correct: false},
            { text: "1944", correct: false},
            { text: "1947", correct: false},
        ]
    },
    {
        question: "Shqipëria fitoi pavarsinë ne vitin:",
        answers: [
            { text: "1944", correct: false},
            { text: "1912", correct: true},
            { text: "1921", correct: false},
            { text: "1915", correct: false},
        ]
    },
    {
        question: "Për sa vite luftoi Skënderbeu kundër turqve?",
        answers: [
            { text: "15 vite", correct: false},
            { text: "20 vite", correct: false},
            { text: "25 vite", correct: true},
            { text: "23 vite", correct: false},
        ]
    },
    {
        question: "Cili është shteti më i vogël në botë?",
        answers: [
            { text: "Monako", correct: false},
            { text: "Vatikani", correct: true},
            { text: "San Marino", correct: false},
            { text: "Andora", correct: false},
        ]
    },
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const vazhdoButton = document.getElementById("next-btn");
const stopButton = document.getElementById("stop-btn")

let currentQuestionIndex = 0;
let score = 0;

// function per fillimin e quizit //
function startQuiz(){
    shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;
    vazhdoButton.innerHTML = "Vazhdo";
    showQuestion();
}

// function per renditjen e cfaredoshme //
function shuffleArray(arrayToShuffle) {
    for (let i = arrayToShuffle.length - 1; i > 0; i--) {
        let randomPosition = Math.floor(Math.random() * (i + 1));
        let temp = arrayToShuffle[i];
        arrayToShuffle[i] = arrayToShuffle[randomPosition];
        arrayToShuffle[randomPosition] = temp;
    }
        return arrayToShuffle;
}

// function per shfaqjen e pyetjeve // 
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML =  currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// reset //
function resetState(){
    vazhdoButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

// zgjedhja e pyetjes // 
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect"); 
    }

    Array.from(answerButton.children).forEach(button =>{
        button.disabled = true;
    });
    vazhdoButton.style.display = "inline-block";
}

// fundi i quizit // 
function showScore(){
    resetState();
    questionElement.innerHTML = `Ti fitove ${score} pikë nga ${questions.length} pikë të mundshme!`;
    vazhdoButton.innerHTML = "Luaj përsëri";
    vazhdoButton.style.display = "inline-block"
    stopButton.style.borderColor = "white"
    stopButton.style.color = "white"
}

// butoni vazhdo // 
function handleVazhdoButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
        push(scoreInDB, score) 
    }
}

vazhdoButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleVazhdoButton();
    }else{
        startQuiz();
    }
});

stopButton.addEventListener("click", ()=>{
    showScore();
    push(scoreInDB, score);
});


startQuiz();