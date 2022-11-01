import Head from "next/head";
import Post from "../components/Post";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import Menu from "../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [noticiaId, setNoticiaId] = useState("0");

  useEffect(() => {
    buscarUser();
  }, []);
  async function buscarUser() {
    const { data } = await axios.get("http://localhost:3000/api/dados");
    console.log(data);
    setDados(data);
  }
  const mostrarNoticia = (index) => {
    console.log({ index });
    if (noticiaId === index) {
      // Se o noticiaId for igual ou index que é o array acima a "lista" vai me dar um return
      return setNoticiaId("0");
    }
    setNoticiaId(index);
  };
  if (dados.length === 0) return null;
  return (
    <div>
      <Head>
        <link
          rel="icon"
          type="img/png"
          sizes="32x32"
          href="../public/favicon_ico/favicon-.ico"
        />
      </Head>

      <Header
      // adicionarNoticia={adicionarNoticia}
      // setAbrirModal={setAbrirModal}
      // abrirModal={abrirModal}
      />

      <main className="container">
        <div className="subheader">
          <h3>ÚLTIMAS MATÉRIAS</h3>
        </div>

        <section className="corpo">
          {dados.map((post, index) => (
            <Post
              key={index}
              id={post.id}
              mostrarNoticia={mostrarNoticia}
              excluirNoticia={() => {}}
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
