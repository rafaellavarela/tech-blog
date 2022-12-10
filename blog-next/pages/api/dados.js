const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("banco.db"); //Se não existir o arquivo banco.db ele vai criar
const { randomUUID } = require("crypto"); //randomUUID gerar um id randomico (unico)

export default function handler(req, res) {
  console.log({ method: req.method });
  // vai receber a chamada e dentro pode ser feito o que quiser
  if (req.method === "GET") {
    db.all("SELECT rowid as id, * FROM post", (err, row) => {
      //sqlite retorna o nome da chave primaria como rowid
      //select busca dados do banco,
      //na consulta acima estamos tranformando o campo rowid para se chamar só id
      //Logo após a , usamos o * para dizer que queremos o resto dos campos ex:descrição,titulo etc..
      res.status(200).send(row);
    });
  }

  if (req.method === "POST") {
    // inserindo dados
    console.log(req.body);
    res.status(200).send(req.body);
    const stmt = db.prepare("INSERT INTO post VALUES (?,?,?,?,?)"); // quantidade de post ex: titulo, subititulo,descrição todos reresentado por ?
    stmt.run(
      randomUUID(),
      req.body.titulo,
      req.body.subtitulo,
      req.body.descricao,
      req.body.imagem
    );
  }

  if (req.method === "PUT" && req.query.id) {
    // atualizar dados
    // let dados = {};
    // if (req.body.titulo) {
    //   // esta preemchendo para fazer o UPDATE
    //   // dados = { subtitulo: 'lorem ipsum dolor bkkaak' }
    //   dados = { ...dados, titulo: req.body.titulo };
    // }

    // if (req.body.subtitulo) {
    //   dados = { ...dados, subtitulo: req.body.subtitulo };
    // }
    // // dados = { descricao: 'lorem ipsum dolor bkkaak' }
    // if (req.body.descricao) {
    //   dados = { ...dados, descricao: req.body.descricao };
    // }

    const stmt = db.prepare(
      "UPDATE post SET titulo= ?,subtitulo= ? ,descricao=? WHERE id=?"
    );
    stmt.run(
      req.body.titulo,
      req.body.subtitulo,
      req.body.descricao,
      req.query.id
    );

    return res.status(200).send({ message: "ok" });
  }

  // Deletando
  if (req.method === "DELETE" && req.query.id) {
    //
    const stmt = db.prepare("DELETE FROM post WHERE id=?");
    stmt.run(req.query.id);
    return res.status(204).send({ message: "ok" }); // SEM CONTEUDO não tem que retornar depois que deleta
  }
}
