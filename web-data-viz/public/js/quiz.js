const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".question-container");
const $answersContainer = document.querySelector(".answers-conteiner");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next-question");

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)


let currentQuestionIndex = 0
let totalCorrect = 0

function startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    displayNextQuestion()
}


function displayNextQuestion() {
    resetState()

    if (question.length === currentQuestionIndex) {
        return finishGame()
    }

    $questionText.textContent = question[currentQuestionIndex].question
    question[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target;

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    // Incrementa `totalCorrect` apenas se a resposta clicada estiver correta
    if (answerClicked.dataset.correct === "true") {
        totalCorrect++;
    }

    $nextQuestionButton.classList.remove("hide");
    currentQuestionIndex++;
}

function finishGame() {
    const totalQuestions = question.length;
    const performance = Math.floor((totalCorrect / totalQuestions) * 100); // Corrigido o cálculo de performance

    // let message = '';

    // switch (true) {
    //     case (performance >= 90):
    //         message = "Excelente :)";
    //         break;
    //     case (performance >= 70):
    //         message = "Muito bom :)";
    //         break;
    //     case (performance >= 50):
    //         message = "Bom";
    //         break;
    //     default:
    //         message = "Pode melhorar :(";
    // }

    // $questionsContainer.innerHTML = 
    // `
    //     <p class="final-message">
    //     Você acertou ${totalCorrect} de ${totalQuestions} questões!
    //     <span>Resultado: ${message}</span>
    //     </p>
    //     <button onclick=window.location.reload() class= "button"> 
    //      Refazer teste
    //     </button>
    // `;

    $questionsContainer.innerHTML = `

    <div style="width: 400px; height:400px;" ><canvas id="myChart"></canvas></div>`
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['certo', 'errada'],
            datasets: [{
                label: '# of Votes',
                data: [totalCorrect, (totalQuestions - totalCorrect)],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



const question = [
    {
        question: "Em que ano Max Verstappen estreou na Fórmula 1?",
        answers: [
            { text: "2012", correct: false },
            { text: "2015", correct: true },
            { text: "2017", correct: false },
            { text: "2019", correct: false }
        ]
    },
    {
        question: "Quem é o maior vencedor de GP da Fórmula 1?",
        answers: [
            { text: "Michael schumacher", correct: false },
            { text: "Alain Prost", correct: false },
            { text: "Ayrton senna", correct: false },
            { text: "Lewis hamilton", correct: true }
        ]
    },
    {
        question: "Qual equipe corre com os carros vermelhos?",
        answers: [
            { text: "Alpine", correct: false },
            { text: "Mc Laren", correct: false },
            { text: "Ferrari", correct: true },
            { text: "Red bull", correct: false }
        ]
    },
    {
        question: "Quem é o piloto com mais vitoria em uma única temporada?",
        answers: [
            { text: "Lewis Hamilton", correct: false },
            { text: "Michael Schumacher", correct: false },
            { text: "Ayrton Senna", correct: false },
            { text: "Max Verstappen", correct: true }
        ]
    },
    {
        question: "Qual equipe é a maior vencedora do campeonato de construtores?",
        answers: [
            { text: "Ferrari", correct: true },
            { text: "Mercedes", correct: false },
            { text: "Red Bull", correct: false },
            { text: "Williams", correct: false }
        ]
    },
    {
        question: "Quem é o atual campeão mundial de Fórmula 1?",
        answers: [
            { text: "Charles Leclerc", correct: false },
            { text: "Max Verstappen", correct: true },
            { text: "Lewis Hamilton", correct: false },
            { text: "Fernando Alonso", correct: false }
        ]
    },
    {
        question: "A McLaren é uma equipe?",
        answers: [
            { text: "Inglesa", correct: true },
            { text: "Austríaca", correct: false },
            { text: "Brasileira", correct: false },
            { text: "Argentina", correct: false }
        ]
    },
    {
        question: "Qual foi a ultima equipe que o Ayrton Senna correu?",
        answers: [
            { text: "Mc Laren", correct: false },
            { text: "Ferrari", correct: false },
            { text: "Williams", correct: true },
            { text: "Lotus", correct: false }
        ]
    },
]