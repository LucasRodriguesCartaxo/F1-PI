var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/inserir", function (req, res) {
    quizController.inserir(req, res);
    console.log("entramos no inserir")
});

router.get("/dados/:idUsuario", function(req, res) {
    quizController.puxarquiz(req, res);
    console.log("cheguei na rota do quiz",req.params.idUsuario) // parametro quando tem dois pontos na rota ::::::::
})

router.get("/totalTentativas/:idUsuario", function(req, res) {
    quizController.totalTentativas(req, res);
})

router.get("/pontuacaoMaxima/:idUsuario", function(req, res) {
    quizController.pontuacaoMaxima(req, res);
    console.log("cheguei na rota da pontuacao maxima",req.params.idUsuario) // parametro quando tem dois pontos na rota ::::::::
})

module.exports = router;