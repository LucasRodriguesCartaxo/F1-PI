var quizModel = require("../models/quizModel");

function inserir(req, res) {
    var id_usuario = req.body.id_usuario;
    var qtd_corretas = req.body.qtd_corretas;
    var qtd_total = req.body.qtd_total;

    quizModel.inserir(id_usuario, qtd_corretas, qtd_total).then(function (resultado) {
        res.json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a inserção do quiz! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}

function puxarquiz(req, res) {
    var id_usuario = req.params.idUsuario; // esse idUsuario eu peguei do parametro que eu estabeleci no quiz.js

    quizModel.puxarquiz(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        }

    }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a inserção do quiz! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}

function totalTentativas(req, res) {
    var id_usuario = req.params.idUsuario; // esse idUsuario eu peguei do parametro que eu estabeleci no quiz.js

    quizModel.totalTentativas(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        }

    }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a inserção do quiz! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}

function pontuacaoMaxima(req, res) {
    var id_usuario = req.params.idUsuario; // esse idUsuario eu peguei do parametro que eu estabeleci no quiz.js, no caso a rota 

    quizModel.pontuacaoMaxima(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        }

    }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a pontuacao maxima! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    inserir,
    puxarquiz,
    totalTentativas,
    pontuacaoMaxima
}


// isso aqui vai inserir os dados no banco