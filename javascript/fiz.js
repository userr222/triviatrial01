import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL : "https://database001-85eb1-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const scoreInDB = ref(database, "score")

const questions = [
    {
        question: "Cfarë fruti i ra Njuton-it në kokë?",
        answers: [
            { text: "Dardhë", correct: false},
            { text: "Limon", correct: false},
            { text: "Mollë", correct: true},
            { text: "Portokall", correct: false},
        ]
    }, 
    {
        question: "Cfarë bëri Njuton me mollën e rënë?",
        answers: [
            { text: "Studioi arsyen e renies", correct: true},
            { text: "E hëngri", correct: false},
            { text: "E beri kek", correct: false},
            { text: "S'bëri gjë", correct: false},
        ]
    },
    {
        question: "Cila është shkronja me të cilën indetifikohet intensiteti i fushes gravitacionale?",
        answers: [
            { text: "G", correct: false},
            { text: "h", correct: false},
            { text: "g", correct: true},
            { text: "Z", correct: false},
        ]
    },
    {
        question: "Cili nga fizikantët nxori tre ligje?",
        answers: [
            { text: "Galileo Galilei", correct: false},
            { text: "Isak Njuton", correct: true},
            { text: "Albert Anjshtanj", correct: false},
            { text: "Loku", correct: false},
        ]
    },
    {
        question: "Cila është formula e Forcës së Fërkimit?",
        answers: [
            { text: "f=μ*N", correct: true},
            { text: "f=G*N", correct: false},
            { text: "f=α*k", correct: false},
            { text: "f=h*s", correct: false},
        ]
    },
    {
        question: "Cfarë vlere ka Intesiteti i Fushës Gravitacionale?",
        answers: [
            { text: "g=10", correct: false},
            { text: "g=8.91", correct: false},
            { text: "g=9.81", correct: true},
            { text: "g=7.98", correct: false},
        ]
    },
    {
        question: "Sa gjendje agregate ka trupi?" 
        ,
        answers: [
            { text: "5", correct: false},
            { text: "3", correct: true},
            { text: "7", correct: false},
            { text: "8", correct: false},
        ]
    },
    {
        question: "Cfarë formule ka shpejtësia(V)?",
        answers: [
            { text: "v=t/l", correct: false},
            { text: "v=kx/2", correct: false},
            { text: "v=l/t", correct: true},
            { text: "v= xk/2 ", correct: false},
        ]
    },
    {
        question: "Ku ndodhet qëndra e Gravitacionit të një trupi?" 
        ,
        answers: [
            { text: "Tangjent me të", correct: false},
            { text: "Në qëndër të tij", correct: true},
            { text: "Në skajin më të largët", correct: false},
            { text: "Në pikën më të ulët", correct: false},
        ]
    },
    {
        question: "Rrezja ekuadoriale e Tokës është:" 
        ,
        answers: [
            { text: "4320 km", correct: false},
            { text: "5204 m", correct: false},
            { text: "6378000 m", correct: true},
            { text: "3267 km", correct: false},
        ]
    },

];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const vazhdoButton = document.getElementById("next-btn");
const stopButton = document.getElementById("stop-btn")
const catButton = document.getElementById("cat-button")

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
    stopButton.style.display = 'block'
    catButton.style.display = 'none'
}

// zgjedhja e pyetjes // 
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score += 10;
    }else{
        selectedBtn.classList.add("incorrect"); 
    }

    Array.from(answerButton.children).forEach(button =>{
        button.disabled = true;
    });
    vazhdoButton.style.display = "block";
}

// fundi i quizit // 
function showScore(){
    resetState();
    questionElement.innerHTML = `Ti fitove ${score} pikë nga ${questions.length * 10} pikë të mundshme!`;
    vazhdoButton.innerHTML = "Luaj përsëri";
    vazhdoButton.style.display = "inline-block"
    stopButton.style.display = "none"
    catButton.style.display = "inline-block"
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