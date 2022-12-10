import React, { useState, memo } from "react";
import Image from "next/image";
import styles from "../styles/Post.module.css";

function Post(props) {
  return (
    <div className="linha">
      {" "}
      <img src={props?.imagem || "../imagem/padrao.png"} alt="img" />{" "}
      <article className="post">
        {" "}
        <div className="linha">
          <div className="accordion-item">
            <div>
              <h1
                onClick={() => props.abrirModalEBuscarPostClicado(props.post)} //Quando for clicado no titulo abrir o modal
              >
                {props.titulo}
              </h1>
            </div>
            <div>
              <p>{props.subtitulo}</p>
            </div>
            <div
              className={`accordion-item-header ${
                props.active ? "active" : ""
              }`}
            >
              <button
                className={styles.leia_mais}
                onClick={() => props.mostrarNoticia(props.index)}
              >
                <p>Leia mais...</p>
              </button>
              <button onClick={() => props.excluirNoticia(props.id)}>
                <div className={styles.excluir}>
                  <Image
                    src="/imagem/excluir2.png"
                    width="20"
                    height="20"
                    alt="excluir"
                  />
                  <span className={styles.tooltiptext}>Excluir</span>
                </div>
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
