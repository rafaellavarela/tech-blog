import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Post from "./Components/Post";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import { posts } from "./dados"; // export nomeado

function App() {
  const [noticiaId, setNoticiaId] = useState("0");

  const [noticias, setNoticias] = useState(posts);
  const [abrirModal, setAbrirModal] = useState(false);

  function excluirNoticia(id) {
    const excluir = noticias.filter((post) => post.id !== id); //  aqui esta filtrando todos os posts diferente dos id passado.
    setNoticias(excluir);
    console.log(excluir);
  }

  const mostrarNoticia = (index) => {
    console.log({ index });
    if (noticiaId === index) {
      // Se o noticiaId for igual ou index que é o array acima a "lista" vai me dar um return
      return setNoticiaId("0");
    }
    setNoticiaId(index);
  };
  function adicionarNoticia(titulo, descricao, subtitulo) {
    const novaNoticia = { titulo, descricao, subtitulo };
    setNoticias([...noticias, novaNoticia]);
  }
  return (
    <div className="App">
      <Header
        adicionarNoticia={adicionarNoticia}
        setAbrirModal={setAbrirModal}
        abrirModal={abrirModal}
      />
      {/* <Form /> */}

      <main className="container">
        <div className="subheader">
          <h3>ÚLTIMAS MATÉRIAS</h3>
        </div>

        <section className="corpo">
          {noticias.map((post, index) => (
            <Post
              key={index}
              id={post.id}
              mostrarNoticia={mostrarNoticia}
              excluirNoticia={excluirNoticia}
              index={index}
              active={noticiaId === index}
              imagem={post.imagem}
              titulo={post.titulo}
              subtitulo={post.subtitulo}
              descricao={post.descricao}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
