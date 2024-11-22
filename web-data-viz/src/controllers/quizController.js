var quizModel = require("../models/quizModel");

function inserir(req, res) {
    var id_usuario = req.body.id_usuario;
    var qtd_corretas = req.body.qtd_corretas;
    var qtd_total = req.body.qtd_total;

    quizModel.inserir(id_usuario, qtd_corretas, qtd_total).then(function (resultado) {
        res.json(resultado);
    }).catch( function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a inserção do quiz! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    inserir
}