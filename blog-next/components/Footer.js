import Image from "next/image";

function Footer() {
  return (
    <div>
      <footer className="rodape">
        <Image
          src="/imagem/logo.png"
          width="130px"
          height="60%"
          alt="Tech Blog"
        ></Image>
      </footer>
    </div>
  );
}
export default Footer;
