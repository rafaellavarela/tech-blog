import Head from "next/head";
import Post from "../components/Post";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import Menu from "../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default function Home() {
  const [dados, setDados] = useState([]);
  const [noticiaId, setNoticiaId] = useState("0");
  const [abrirModal, setAbrirModal] = useState(false);
  // criar um objeto para qdo clicar na noticia o valor inicial deve ser {}
  const [noticia, setNoticia] = useState({}); // vai

  useEffect(() => {
    buscarNoticia();
  }, []);

  async function buscarNoticia() {
    const { data } = await api.get("/dados");
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

  async function excluirNoticia(id) {
    console.log({ id });
    await api.delete(`/dados?id=${id}`); // deletar
    const excluir = dados.filter((post) => post.id !== id); //  aqui esta filtrando todos os posts diferente dos id passado.
    setDados(excluir);
    buscarNoticia();
  }

  async function adicionarNoticia(titulo, descricao, subtitulo, imagem) {
    const novaNoticia = { titulo, descricao, subtitulo, imagem };
    await api.post("/dados", novaNoticia); //Post inserir
    setDados([...dados, novaNoticia]);
    buscarNoticia();
  }

  // criar uma função para não adicionar a materia que ja esta cadastrada
  async function editarNoticia(id, titulo, descricao, subtitulo, imagem) {
    const materiaeditar = { titulo, subtitulo, descricao, imagem };
    await api.put(`/dados?id=${id}`, materiaeditar); // PUT atualizar
    buscarNoticia();
    setNoticia({});
  }

  //criar uma função que abra o modal e receba o post clicado por parametro
  function abrirModalEBuscarPostClicado(post) {
    setNoticia({});
    //  Passando post pra quando clicar aparecer toda as informações para serem alteradas
    setAbrirModal(true);
    setNoticia(post); //vai receber o post

    //abrir o modal com
    //quando receber o post guardar no state criado la em cima
  }

  if (dados.length === 0) return null;
  return (
    <div>
      <Head>
        <title>Tech-Blog</title>
        <link
          rel="icon"
          type="img/png"
          sizes="32x32"
          href="../public/favicon_ico/favicon-.ico"
        />
      </Head>

      <Header
        editarNoticia={editarNoticia}
        adicionarNoticia={adicionarNoticia}
        setAbrirModal={setAbrirModal}
        abrirModal={abrirModal}
        setNoticia={setNoticia}
        noticia={noticia} //passar os valores do post para o formulario
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
              excluirNoticia={excluirNoticia}
              abrirModalEBuscarPostClicado={abrirModalEBuscarPostClicado}
              index={index}
              post={post}
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
