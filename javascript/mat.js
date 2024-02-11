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
        question: "Çfarë vlerë ka π ne matematikë?",
        answers: [
            { text: "3,1415", correct: true},
            { text: "1,66", correct: false},
            { text: "1,33", correct: false},
            { text: "4,235", correct: false},
        ]
    }, 
    {
        question: "Në një trekëndësh kënddrejtë, si quhet brinja përballe këndit të drejtë?",
        answers: [
            { text: "Diagonale", correct: false},
            { text: "Segment", correct: false},
            { text: "Satet", correct: false},
            { text: "Hipotenuzë", correct: true},
        ]
    },
    {
        question: "Në numrat romakë cfarë numri përfaqëson  shkronja “L”?",
        answers: [
            { text: "100", correct: false},
            { text: "50", correct: true},
            { text: "1000", correct: false},
            { text: "10", correct: false},
        ]
    },
    {
        question: "Sa është shuma e këndeve të brëndshme të një gjashtëkëndëshi?",
        answers: [
            { text: "540", correct: false},
            { text: "180", correct: false},
            { text: "360", correct: false},
            { text: "720", correct: true},
        ]
    },
    {
        question: "Sa është  √50?",
        answers: [
            { text: "2√5", correct: false},
            { text: "8,04", correct: false},
            { text: "5√2", correct: true},
            { text: "7√2", correct: false},
        ]
    },
    {
        question: "Cila është shprehja e thjeshtuar 3x+2x-5??",
        answers: [
            { text: "5x-5", correct: true},
            { text: "5x+5", correct: false},
            { text: "3x-7", correct: false},
            { text: "x-5", correct: false},
        ]
    },
    {
        question: "Sa faqe ka cilindri?",
        answers: [
            { text: "2", correct: false},
            { text: "3", correct: true},
            { text: "4", correct: false},
            { text: "5", correct: false},
        ]
    },
    {
        question: "MCM në numrat romakë është numri:",
        answers: [
            { text: "1900", correct: true},
            { text: "1090", correct: false},
            { text: "900", correct: false},
            { text: "10900", correct: false},
        ]
    },
    {
    question: "Cila është formula e syprinës së rrethit?",
    answers: [
        { text: "πr2", correct: true},
        { text: "πr", correct: false},
        { text: "2πr", correct: false},
        { text: "4πr2", correct: false},
    ]
    },
    {
        question: "Sa minuta ka në dy orë?",
        answers: [
            { text: "90", correct: false},
            { text: "120", correct: true},
            { text: "100", correct: false},
            { text: "180", correct: false},
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
        score+=10;
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
    questionElement.innerHTML = `Ti fitove ${score} pikë nga ${questions.length*10} pikë të mundshme!`;
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