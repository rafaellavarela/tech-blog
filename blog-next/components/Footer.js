import Image from "next/image";

function Footer() {
  return (
    <footer className="rodape">
      <Image
        src="/imagem/logo.png"
        width="100px"
        height="100%"
        alt="Cidade a Noite"
      ></Image>
    </footer>
  );
}
export default Footer;
