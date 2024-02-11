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
        question: "Kush është kontinenti më i madh?",
        answers: [
            { text: "Afrika", correct: false},
            { text: "Azia", correct: true},
            { text: "Amerika e veriut", correct: false},
            { text: "Amerika e jugut", correct: false},
        ]
    }, 
    {
        question: "Nga buron Drini i Zi?",
        answers: [
            { text: "Liqeni i Shkodres", correct: false},
            { text: "Liqeni i Prespës së Madhe", correct: false},
            { text: "Deti Adriatik", correct: false},
            { text: "Liqeni i Ohrit", correct: true},
        ]
    },
    {
        question: "Pika doganore e Kapshticës është pika e kalimit në:",
        answers: [
            { text: "Greqi", correct: true},
            { text: "Maqenodi e Veriut", correct: false},
            { text: "Kosovë", correct: false},
            { text: "Itali", correct: false},
        ]
    },
    {
        question: "Në cilin rajon të Shqipërisë ndodhet Mali i Thatë?",
        answers: [
            { text: "Rajoni Verior", correct: false},
            { text: "Rajoni Verilindor", correct: false},
            { text: "Rajoni Perëndimor", correct: false},
            { text: "Rajoni Juglindor", correct: true},
        ]
    },
    {
        question: "Sa është numri i popullsië së Shqipërisë?",
        answers: [
            { text: "2.546.092", correct: false},
            { text: "2.428.200", correct: false},
            { text: "2.793.592", correct: true},
            { text: "2.965.005", correct: false},
        ]
    },
    {
        question: "Sa është lartësia e malit të Korabit?",
        answers: [
            { text: "2020m", correct: false},
            { text: "2764m", correct: true},
            { text: "2762m", correct: false},
            { text: "2674m", correct: false},
        ]
    },
    {
        question: "Sa reshje bien mesatarisht në vit në Korçë?" 
        ,
        answers: [
            { text: "610mm", correct: false},
            { text: "510mm", correct: false},
            { text: "710mm", correct: true},
            { text: "810mm", correct: false},
        ]
    },
    {
        question: "Çfarë ndërtimi gjeologjik ka rajoni juglindor i Shqipëeisë?",
        answers: [
            { text: "Të larmioshëm", correct: false},
            { text: "Magmatik", correct: false},
            { text: "Terigjen", correct: true},
            { text: "Gëlqeror", correct: false},
        ]
    },
    {
        question: "Nga cila male ndahet Europa me Azinë?" 
        ,
        answers: [
            { text: "Malet Urale", correct: true},
            { text: "Malet Himalaja", correct: false},
            { text: "Malet Skandinave", correct: false},
            { text: "Malet Kuakaze", correct: false},
        ]
    },
    {
        question: "Sa është lartësia e malit Everest" 
        ,
        answers: [
            { text: "8.848m", correct: true},
            { text: "8.748m", correct: false},
            { text: " 8.648m", correct: false},
            { text: "8.548m", correct: false},
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
    vazhdoButton.style.display = "inline-block";
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