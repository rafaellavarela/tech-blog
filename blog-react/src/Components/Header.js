import React, { useState } from "react";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Header(props) {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  return (
    <header className="cabecalho">
      <div className="container">
        <div className="container-menu">
          <img src={require("../img/logo.png")} />
          <ul className="menu">
            <li>
              <button
                className="adicionar"
                onClick={() => props.setAbrirModal(true)}
              >
                {/* aqui esta definido a invocação de uma função que recebi por props la no header */}
                <p>Adicionar Noticia</p>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        isOpen={props.abrirModal}
        onRequestClose={() => props.setAbrirModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Adicionar Noticia</h2>

        <form className="modal">
          <input
            onchange={(evento) => setTitulo(evento.target.value)}
            placeholder="Titulo"
          ></input>
          <input
            onChange={(evento) => setSubtitulo(evento.target.value)}
            placeholder="Subtitulo"
          ></input>
          <input
            onChange={(evento) => setDescricao(evento.target.value)}
            className="descricao"
            placeholder="Descrição"
          ></input>
          {/* propriedade onChange dentro do input vai gerar eventos do usuario digitando  */}
          <button
            onClick={() => {
              props.adicionarNoticia(titulo, descricao, subtitulo);
              props.setAbrirModal(false);
            }}
          >
            <div className="salvar">
              <p>Adicionar</p>
            </div>
          </button>
        </form>
      </Modal>
    </header>
  );
}

export default Header;
