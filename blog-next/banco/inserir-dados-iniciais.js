const sqlite3 = require("sqlite3").verbose(); //importando pacote sqlite
const db = new sqlite3.Database("banco.db"); //new vai criar uma instancia do sqlite.Database recebe um parametro que é o banco.db
const dados = require("./dados"); //importou dados da api em js
const { randomUUID } = require("crypto"); //randomUUID gerar um id randomico (unico)

db.serialize(() => {
  //serialize codifica um conjunto de elementos de formulário como uma string para envio.
  db.run(
    "CREATE TABLE post (id TEXT NOT NULL PRIMARY KEY, titulo TEXT NOT NULL, subtitulo TEXT NOT NULL, descricao TEXT NOT NULL,imagem TEXT );" // tabela com subtitulo e imagem e etc..
  );

  const stmt = db.prepare("INSERT INTO post VALUES (?,?,?,?,?)"); // quantidade de post ex: titulo, subititulo,descrição todos reresentado por ?
  //quero inserir na tabela post b.prepare
  for (let d of dados) {
    stmt.run(randomUUID(), d.titulo, d.subtitulo, d.descricao, d.imagem);
    //stmt.run recebe os dados da api que é armazenado no banco
  }

  stmt.finalize(); // terminado de inserir finaliza

  db.each(
    // depois de inserir é mostrado.
    "SELECT rowid as id, titulo, descricao, subtitulo, imagem FROM post",
    (err, row) => {
      console.log(
        `${row.id} - ${row.titulo} | ${row.subtitulo} | ${row.descricao} | ${row.imagem}`
      );
    }
  );
});

db.close();
