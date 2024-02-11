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
        question: "Çfarë është një mol?",
        answers: [
            { text: "Njësi e sasisë së një përbërjeje", correct: true},
            { text: "Grimcë shumë e vogël që ndodhet në bërthamën e atomit", correct: false},
            { text: "Substancë e përbëre nga dy elemente", correct: false},
            { text: "Grimcë që vepron si dhurues i një çifti me elektrone", correct: false},
        ]
    }, 
    {
        question: "Çfarë është monomeri?",
        answers: [
            { text: "Një molekulë e vogël aktive që vepron dhe formon vargje të gjata", correct: true},
            { text: "Energjia e transferuar në një reaksion kimik", correct: false},
            { text: "Një molekulë me varg të gjatë", correct: false},
            { text: "Një reaksion që ka të bëjë me zëvendësimin e një atomi me një tjetër", correct: false},
        ]
    },
    {
        question: "Cili është simboli i elementit Mangan?",
        answers: [
            { text: "Mo", correct: false},
            { text: "Mg", correct: false},
            { text: "Mn", correct: true},
            { text: "Ag", correct: false},
        ]
    },
    {
        question: "Çfarë është formula molekulare?",
        answers: [
            { text: "formula në një molekulë organike që tregon rreth lidhjeve të atomeve për çdo atom karbon", correct: false},
            { text: "formula që tregon numrin e çdo lloj atomi në një molekulë", correct: true},
            { text: "formula qe tregon raportin më të thjeshtë të atomeve të ndryshme", correct: false},
            { text: "paraqitja e një molekule ku tregohen të vizatuara", correct: false},
        ]
    },
    {
        question: "Sa është konstantja e Avogadros?",
        answers: [
            { text: "5.98 * 10²⁰", correct: false},
            { text: "6.30 * 10²⁴", correct: false},
            { text: "6.05 * 10²²", correct: false},
            { text: "6.02 * 10²³", correct: true},
        ]
    },
    {
    question: "Në cilën kategori ndodhet elementi Argon(Ar) në tabelën periodike?",
        answers: [
            { text: "Elementet kalimtare", correct: false},
            { text: "Gazet ideale", correct: true},
            { text: " Jometalet", correct: false},
            { text: "Metalet e varfra", correct: false},
        ]
    },
    {
        question: "Sa është masa atomike relative e Magnezit?" 
        ,
        answers: [
            { text: "24", correct: true},
            { text: "30", correct: false},
            { text: "21", correct: false},
            { text: "27", correct: false},
        ]
    },
    {
        question: "Cili është elektronegativiteti i elementit Renium(Re)",
        answers: [
            { text: "2.2", correct: false},
            { text: "0.8", correct: false},
            { text: "1.9", correct: true},
            { text: "3.0", correct: false},
        ]
    },
    {
        question: "Në cilën periodë ndodhet elementi Palad(Pd)?",
        answers: [
            { text: "5", correct: true},
            { text: "3", correct: false},
            { text: "7", correct: false},
            { text: "4", correct: false},
        ]
    },
    {
        question: "Sa nën nivele kemi gjithsej?" 
        ,
        answers: [
            { text: "6", correct: false},
            { text: "2", correct: false},
            { text: "4", correct: true},
            { text: "5", correct: false},
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