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
        question: " Cili ishte shkaku kryesor i Luftës së Parë Botërore?",
        answers: [
            { text: "Lufta për kolonizim", correct: false},
            { text: "Shpërthimi i një konflikti lokal në Ballkan", correct: false},
            { text: "Atentati në Sarajevë ", correct: true},
            { text: "Lufta për tregti", correct: false},
        ]
    }, 
    {
        question: "Cila ka qenë një pasojë e Luftës së Dytë Botërore?",
        answers: [
            { text: "Formimi i Lidhjes së Kombeve ", correct: false},
            { text: "Shpërbërja e Bashkimit Sovjetik", correct: false},
            { text: "Ndërtimi i Murit të Berlinit", correct: true},
            { text: "Pavarësia e Kosovës", correct: false},
        ]
    },
    {
        question: " Ku ndodhet vendi antik i lashtë, i njohur si Mesopotamia? ",
        answers: [
            { text: "Azia Lindore ", correct: true},
            { text: "Amerika e Jugut ", correct: false},
            { text: "Evropa Lindore ", correct: false},
            { text: "Afrika Veriore", correct: false},
        ]
    },
    {
        question: 'Cili sundim i lashtë është i njohur për ligjet e tij, si "Kodiksi i Hammurabit"?',
        answers: [
            { text: "Egjipti", correct: false},
            { text: "Mesopotamia", correct: true},
            { text: "Kina", correct: false},
            { text: "Greqia", correct: false},
        ]
    },
    {
        question: "Cili imperator romak është i njohur për përpjekjet e tij për rreformimin e shtetit romak?",
        answers: [
            { text: "Julius Cezari", correct: false},
            { text: "Augustus", correct: true},
            { text: "Nero", correct: false},
            { text: "Mark Antoniu", correct: false},
        ]
    },
    {
        question: "Kur ka ndodhur Revolucioni Francez?",
        answers: [
            { text: "1650-1660", correct: false},
            { text: "1750-1760", correct: false},
            { text: "1789-1799", correct: true},
            { text: "1820-1830", correct: false},
        ]
    },
    {
        question: "Cila periudhë njihet si Rilindja Italiane në art dhe kulturë?" 
        ,
        answers: [
            { text: "Mesjeta", correct: false},
            { text: "Rilindja", correct: true},
            { text: "Baroku", correct: false},
            { text: "Epoka e Hershme Moderne", correct: false},
        ]
    },
    {
        question: "Çfarë kishte si rezultat Lufta e Gjeneratave në Afrikë? ",
        answers: [
            { text: "Kolonizimi i Afrikës", correct: true},
            { text: "Shpallja e Pavarësisë në shumicën e vendeve afrikane", correct: false},
            { text: " Bashkimi i vendeve afrikane në një konfederatë", correct: false},
            { text: "Ndërtimi i Murit të Berlinit", correct: false},
        ]
    },
    {
        question: "Cila ka qenë një shkollë filozofike e lashtë në Greqi?" 
        ,
        answers: [
            { text: "Konfucianizmi", correct: false},
            { text: "Stoicizmi", correct: true},
            { text: "Shënimi", correct: false},
            { text: "Fenomenologjia", correct: false},
        ]
    },
    {
        question: "Çili ka qenë ndikimi kryesor i Revolucionit Industrial në shekullin XIX?" 
        ,
        answers: [
            { text: "Rritja e fuqisë ushtarake ", correct: false},
            { text: "Ndryshimet drastike në prodhimin dhe transportin e mallrave", correct: true},
            { text: "Shpërthimi i shkencës së rakorduar", correct: false},
            { text: "Kthimi në strukturat feudale", correct: false},
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