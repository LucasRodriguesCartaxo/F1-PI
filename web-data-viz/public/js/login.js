let olhinho = document.querySelector('.fa-eye');

olhinho.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha_ipt')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

function entrar(){
    var senha = senha_ipt.value
    var usuario = usuario_ipt.value

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: usuario,
            senha: senha
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.cassaco;
                // muda pra reposta que teu back vai te mandar
                // sessionStorage.NOME_USUARIO = json.nome;
                // sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "../quiz.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}
