-- Cria um banco de dados chamado F1.
CREATE DATABASE F1;

-- Define o banco de dados F1 como o atual para as próximas operações.
USE F1;

-- Cria a tabela 'cadastro' para armazenar informações dos usuários.
CREATE TABLE cadastro(
    id_usuario INT PRIMARY KEY auto_increment, -- Chave primária da tabela, valor único e gerado automaticamente.
    nome VARCHAR(45), -- Nome do usuário com limite de 45 caracteres.
    usuario VARCHAR(45) UNIQUE, -- Nome de usuário, deve ser único no banco de dados.
    email VARCHAR(45) UNIQUE, -- Email do usuário, também deve ser único.
    senha VARCHAR(45) -- Senha do usuário com limite de 45 caracteres.
);

-- Seleciona todos os registros da tabela 'cadastro' para exibir os dados dos usuários cadastrados.
select * from cadastro;

-- Cria a tabela 'dados_quiz' para armazenar os resultados dos quizzes realizados pelos usuários.
CREATE TABLE dados_quiz(
    id_dado_quiz INT PRIMARY KEY auto_increment, -- Chave primária, única e gerada automaticamente.
    qtd_total INT, -- Quantidade total de perguntas no quiz.
    qtd_corretas INT, -- Quantidade de respostas corretas no quiz.
    fk_usuario INT, -- Chave estrangeira que referencia o ID do usuário na tabela 'cadastro'.
    CONSTRAINT fk_usuario_dado_quiz FOREIGN KEY (fk_usuario) REFERENCES cadastro(id_usuario) -- Define a relação com a tabela 'cadastro'.
);

-- Seleciona todos os registros da tabela 'dados_quiz' para exibir os dados dos quizzes realizados.
select * from dados_quiz;

-- Realiza uma consulta para calcular e exibir:
-- - A quantidade de respostas erradas (qtd_total - qtd_corretas),
-- - A quantidade de respostas corretas,
-- - O nome do usuário.
SELECT 
    (dq.qtd_total - dq.qtd_corretas) AS qtd_erradas, -- Calcula o número de respostas erradas.
    dq.qtd_corretas, -- Exibe o número de respostas corretas.
    d.nome -- Exibe o nome do usuário associado.
FROM dados_quiz AS dq -- Alias 'dq' para simplificar a referência à tabela 'dados_quiz'.
JOIN cadastro AS d -- Faz a junção entre 'dados_quiz' e 'cadastro'.
ON dq.fk_usuario = d.id_usuario
WHERE d.id_usuario = 1
ORDER BY dq.id_dado_quiz DESC LIMIT 1; -- Relaciona as tabelas através do ID do usuário.

-- Consulta que retorna a quantidade de vezes que o usuário (com fk_usuario = 1) realizou o quiz.
SELECT COUNT(*) -- Conta o número de registros na tabela 'dados_quiz' para o usuário especificado.
FROM dados_quiz 
WHERE fk_usuario = 1 -- Filtra os registros para o usuário com ID 1. --${id_usuario} 
GROUP BY fk_usuario; -- Agrupa os resultados por usuário (neste caso, é apenas um).

-- Realiza uma consulta para exibir:
-- - A pontuação máxima (maior qtd_corretas),
-- - A pontuação mínima (menor qtd_corretas),
-- - A média de respostas corretas, truncada para 1 casa decimal.
SELECT 
    max(dq.qtd_corretas) AS max_correstas, -- Calcula a pontuação máxima.
    min(dq.qtd_corretas) AS min_corretas, -- Calcula a pontuação mínima.
    TRUNCATE(avg(dq.qtd_corretas), 1) AS media_corretas -- Calcula a média e a reduz para 1 casa decimal.
FROM dados_quiz AS dq -- Alias 'dq' para simplificar a referência à tabela 'dados_quiz'.
JOIN cadastro AS d -- Faz a junção entre 'dados_quiz' e 'cadastro'.
ON dq.fk_usuario = d.id_usuario
WHERE dq.fk_usuario = 7 ; -- Relaciona as tabelas através do ID do usuário.  ${id_usuario}

-- Consulta que retorna os dados da última tentativa de quiz, ordenada de forma decrescente pelo ID.
SELECT *
FROM dados_quiz 
ORDER BY id_dado_quiz DESC -- Ordena os registros pelo ID do quiz em ordem decrescente (mais recente primeiro).
LIMIT 1; -- Limita o resultado ao registro mais recente.
