const questions = [
    {
        question: "Which one of the below is one of the seven wonders of the world ?",
        answers: [
            {text: "Qutub Minar", correct: false},
            {text: "Taj Mahal", correct: true},
            {text: "Laal Qila", correct: false},
            {text: "Hotel Taaj", correct: false}
        ]
    },
    {
        question: "Who is the founder of Haryanka Dynasty",
        answers: [
            {text: "Ajatshatru", correct: false},
            {text: "Harshvardhan", correct: false},
            {text: "Bimbisara", correct: true},
            {text: "Ghananand", correct: false}
        ]
    },
    {
        question: "The Rowlatt Act was passed in ?",
        answers: [
            {text: "1905", correct: false},
            {text: "1913", correct: false},
            {text: "1919", correct: true},
            {text: "1925", correct: false}
        ]
    },
    {
        question: "The East India Association was setup in ?",
        answers: [
            {text: "1866", correct: true},
            {text: "1857", correct: false},
            {text: "1836", correct: false},
            {text: "1885", correct: false}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuesIndex = 0;
let score = 0;
function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQues = questions[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQues.question;
    currentQues.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerBtns.appendChild(button);
    })
}
function resetState() {
    nextBtn.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button=>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display ="block";
}
nextBtn.addEventListener("click", ()=>{
    if(currentQuesIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex< questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
startQuiz();