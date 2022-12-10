import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import Link from "next/link";

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
  const [imagem, setImagem] = useState("");

  //Definindo a função para quando abrir o modal apareça o texto
  useEffect(() => {
    if (props.noticia) {
      setDescricao(props.noticia.descricao);
      setTitulo(props.noticia.titulo);
      setSubtitulo(props.noticia.subtitulo);
      setImagem(props.noticia.imagem);
    }
  }, [props.noticia]);

  return (
    <header className="cabecalho">
      <div className="container">
        <div className="container-menu">
          <Image
            className="img_menu"
            src="/imagem/logo.png"
            width="145px"
            height="60px"
            alt="Logo"
          ></Image>
          <ul className="menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <button
                onClick={() => {
                  props.setAbrirModal(true);
                }}
              >
                {/* aqui esta definido a invocação de uma função que recebi por props la no header */}
                <a>Adicionar Noticia</a>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        isOpen={props.abrirModal}
        onRequestClose={() => {
          props.setNoticia({});
          props.setAbrirModal(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="titulo-modal">
          <h1>Adicionar Noticia</h1>
        </div>

        <form className="modal">
          <input
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            placeholder="Titulo"
          ></input>
          <input
            value={subtitulo}
            onChange={(evento) => setSubtitulo(evento.target.value)}
            placeholder="Subtítulo"
          ></input>
          <input
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            className="descricao"
            placeholder="Descrição"
          ></input>
          <input
            value={imagem}
            onChange={(evento) => setImagem(evento.target.value)}
            className="link"
            placeholder="Link da Imagem"
          ></input>

          {/* propriedade onChange dentro do input vai gerar eventos do usuario digitando  */}
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(props.noticia);
              //If para não repostar a materia novamente
              if (props.noticia.id) {
                props.editarNoticia(
                  props.noticia.id,
                  titulo,
                  subtitulo,
                  descricao,
                  imagem
                );
              } else {
                props.adicionarNoticia(titulo, descricao, subtitulo, imagem);
              }

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
