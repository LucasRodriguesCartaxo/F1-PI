var database = require("../database/config");

function inserir(id_usuario, qtd_corretas, qtd_total) {
  var instrucaoSql = `INSERT INTO dados_quiz VALUES (default, ${qtd_total}, ${qtd_corretas}, ${id_usuario})`;

  return database.executar(instrucaoSql);
}

module.exports = {
    inserir
};
