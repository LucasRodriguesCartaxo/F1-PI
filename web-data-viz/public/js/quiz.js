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
    let qtd_corretas = totalCorrect


    fetch("/quiz/inserir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_usuario: sessionStorage.getItem("ID_USUARIO"),
            qtd_corretas: qtd_corretas,
            qtd_total: totalQuestions
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);



        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                alert(`voce está inserindo os campos errados ou nao possui cadastro`)
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })




    let message = '';
    message = `<span class = 'nomeDoUsuario'>Parabéns por completar o quiz ${sessionStorage.getItem('NOME_USUARIO')}</span> <br>
                <a href='./dashboar.html'><span class='textdash'>Ver a sua dashboard</span> </a>`
    $questionsContainer.innerHTML = message

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