// Seleção de elementos HTML para manipulação posterior
const $startGameButton = document.querySelector(".start-quiz"); // Botão de início do jogo
const $questionsContainer = document.querySelector(".question-container"); // Contêiner das perguntas
const $answersContainer = document.querySelector(".answers-conteiner"); // Contêiner das respostas
const $questionText = document.querySelector(".question"); // Texto da pergunta
const $nextQuestionButton = document.querySelector(".next-question"); // Botão para próxima pergunta

// Adiciona eventos de clique aos botões
$startGameButton.addEventListener("click", startGame); // Quando clicado, inicia o jogo
$nextQuestionButton.addEventListener("click", displayNextQuestion); // Mostra a próxima pergunta

// Variáveis para rastrear o progresso no quiz
let currentQuestionIndex = 0; // Índice da pergunta atual
let totalCorrect = 0; // Total de respostas corretas do jogador

// Função que inicia o jogo
function startGame() {
    $startGameButton.classList.add("hide"); // Esconde o botão de iniciar adicionando a classe 'hide'
    $questionsContainer.classList.remove("hide"); // Mostra o contêiner das perguntas removendo a classe 'hide'
    displayNextQuestion(); // Mostra a primeira pergunta
}

// Função que exibe a próxima pergunta
function displayNextQuestion() {
    resetState(); // Reseta o estado anterior das respostas

    // Verifica se todas as perguntas foram respondidas
    if (question.length === currentQuestionIndex) {
        return finishGame(); // Finaliza o jogo se todas as perguntas foram respondidas
    }

    // Atualiza o texto da pergunta atual
    $questionText.textContent = question[currentQuestionIndex].question;

    // Adiciona as opções de resposta
    question[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button"); // Cria um botão para a resposta
        newAnswer.classList.add("button", "answer"); // Adiciona classes ao botão
        newAnswer.textContent = answer.text; // Define o texto do botão como a resposta

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct; // Marca a resposta correta com um atributo
        }
        $answersContainer.appendChild(newAnswer); // Adiciona o botão ao contêiner de respostas

        // Adiciona evento de clique para selecionar a resposta
        newAnswer.addEventListener("click", selectAnswer);
    });
}

// Função para resetar o estado anterior (limpar respostas e ocultar botão)
function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild); // Remove todas as respostas anteriores
    }
    $nextQuestionButton.classList.add("hide"); // Esconde o botão de próxima pergunta
}

// Função chamada quando uma resposta é selecionada
function selectAnswer(event) {
    const answerClicked = event.target; // Obtém o botão clicado

    // Marca todas as respostas como corretas ou incorretas
    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct"); // Adiciona classe 'correct' para respostas corretas
        } else {
            button.classList.add("incorrect"); // Adiciona classe 'incorrect' para respostas erradas
        }
        button.disabled = true; // Desabilita todos os botões após a escolha
    });

    // Incrementa o total de acertos se a resposta clicada for correta
    if (answerClicked.dataset.correct === "true") {
        totalCorrect++;
    }

    $nextQuestionButton.classList.remove("hide"); // Mostra o botão de próxima pergunta
    currentQuestionIndex++; // Passa para a próxima pergunta
}

// Função que finaliza o jogo
function finishGame() {
    const totalQuestions = question.length; // Total de perguntas no quiz
    let qtd_corretas = totalCorrect; // Quantidade de respostas corretas

    // Envia os dados do resultado para o servidor
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