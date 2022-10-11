import React, { useState, memo } from "react";

function Post(props) {
  return (
    <div className="linha">
      <article className="post">
        <div className="linha">
          <img src={props.imagem || require("../img/News.png")} alt="img" />
          <div className="accordion-item">
            <div>
              <h1>{props.titulo}</h1>
            </div>
            <div>
              <p>{props.subtitulo}</p>
            </div>
            <div
              className={`accordion-item-header ${
                props.active ? "active" : ""
              }`}
            >
              <button onClick={() => props.mostrarNoticia(props.index)}>
                <p>Leia mais...</p>
              </button>
              <button onClick={() => props.excluirNoticia(props.id)}>
                <p>Excluir</p>
              </button>
            </div>

            <div
              className={`accordion-item-body ${props.active ? "open" : ""}`}
            >
              <div className="accordion-item-body-content">
                <p>{props.descricao}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Post;
