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

module.exports = router;