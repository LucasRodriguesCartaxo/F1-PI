let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');


let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false;

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false;

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false;

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false;

let cadError = document.querySelector('#cadError');
let cadSuccess = document.querySelector('#cadSuccess');

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color:red')
        labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
        nome.setAttribute('style', 'border-color:red')
        validNome = false;
    } else {
        labelNome.setAttribute('style', 'color:green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color:green')
        validNome = true;
    }
})

usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 4) {
        labelUsuario.setAttribute('style', 'color:red')
        labelUsuario.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
        usuario.setAttribute('style', 'border-color:red')
        validUsuario = false;
    } else {
        labelUsuario.setAttribute('style', 'color:green')
        labelUsuario.innerHTML = 'Usuário'
        usuario.setAttribute('style', 'border-color:green')
        validUsuario = true;
    }
})

email.addEventListener('keyup', () => {
    let emailValue = email.value;
    if (emailValue.includes('@') && (emailValue.endsWith('.com') || emailValue.endsWith('.br'))) {
        labelEmail.setAttribute('style', 'color:green');
        labelEmail.innerHTML = 'Email';
        email.setAttribute('style', 'border-color:green');
        validEmail = true;
    } else {
        labelEmail.setAttribute('style', 'color:red');
        labelEmail.innerHTML = 'Email *deve conter "@" e terminar com ".com" ou ".br"';
        email.setAttribute('style', 'border-color:red');
        validEmail = false;
    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 7) {
        labelSenha.setAttribute('style', 'color:red')
        labelSenha.innerHTML = 'Senha *Insira no minimo 8 caracteres'
        senha.setAttribute('style', 'border-color:red')
        validSenha = false;
    } else {
        labelSenha.setAttribute('style', 'color:green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color:green')
        validSenha = true;
    }
})


confirmSenha.addEventListener('keyup', () => {
    if (senha.value != confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color:red')
        labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
        confirmSenha.setAttribute('style', 'border-color:red')
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.setAttribute('style', 'color:green')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color:green')
        validConfirmSenha = true;
    }
})



function cadastrar() {
    if (validNome && validUsuario && validEmail && validSenha && validConfirmSenha) {


        // cadSuccess.setAttribute('style', 'display: block')
        // cadSuccess.innerHTML = '<strong>Cadastrando com sucesso!</strong>'
        // cadError.setAttribute('style', 'display: none')
        // cadError.innerHTML = ''

        fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome.value,
            usuarioServer: usuario.value,
            emailServer: email.value,
            senhaServer: senha.value
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);
            setTimeout(function () {
                window.location = "./login.html";
            }, 1000); // apenas para exibir o loading

            

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

        

    } else {
        cadError.setAttribute('style', 'display: block')
        cadError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar...</strong>'
        cadSuccess.innerHTML = ''
        cadSuccess.setAttribute('style', 'display: none')
    }
}

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})



btnConfirm.addEventListener('click', () => {
    let inputSenha = document.querySelector('#confirmSenha')

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

