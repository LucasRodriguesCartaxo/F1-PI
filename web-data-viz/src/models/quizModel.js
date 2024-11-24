var database = require("../database/config");

function inserir(id_usuario, qtd_corretas, qtd_total) {
  var instrucaoSql = `INSERT INTO dados_quiz VALUES (default, ${qtd_total}, ${qtd_corretas}, ${id_usuario})`;

  return database.executar(instrucaoSql);
}

function puxarquiz(id_usuario) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id_usuario)

  // essa query tu muda de acordo com teu banco, o nome que tu der no select, vai ser o nome que tu usa no json
  var instrucaoSql = `SELECT 
	(dq.qtd_total - dq.qtd_corretas) AS qtd_erradas, 
    dq.qtd_corretas
FROM dados_quiz AS dq
JOIN cadastro AS d
ON dq.fk_usuario = d.id_usuario 
WHERE d.id_usuario = ${id_usuario}
ORDER BY dq.id_dado_quiz DESC LIMIT 1;`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function totalTentativas(id_usuario) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id_usuario)

  // essa query tu muda de acordo com teu banco, o nome que tu der no select, vai ser o nome que tu usa no json
  var instrucaoSql = `SELECT COUNT(*) AS total_de_tentativas FROM dados_quiz WHERE fk_usuario = ${id_usuario} GROUP BY fk_usuario;`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function pontuacaoMaxima(id_usuario) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id_usuario)

  // essa query tu muda de acordo com teu banco, o nome que tu der no select, vai ser o nome que tu usa no json
  var instrucaoSql = `SELECT 
    max(dq.qtd_corretas) AS max_pontuacao,
    min(dq.qtd_corretas) AS min_pontuacao,
    TRUNCATE(avg(dq.qtd_corretas), 1) AS media_pontuacao
FROM dados_quiz AS dq
JOIN cadastro AS d
ON dq.fk_usuario = d.id_usuario
WHERE dq.fk_usuario = ${id_usuario};`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  inserir,
  puxarquiz,
  totalTentativas,
  pontuacaoMaxima
};
