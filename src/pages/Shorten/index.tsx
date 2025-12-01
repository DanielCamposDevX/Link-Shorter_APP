import Logo from "../../assets/Logo.svg";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ShortenComponents } from "./styles";

export default function Shorten() {
  return (
    <ShortenComponents.Page>
      <ShortenComponents.Header>
        <h1>Seja bem-vindo(a), Pessoa!</h1>
        <div>
          <ShortenComponents.Hbutton>Home</ShortenComponents.Hbutton>
          <Link to="/ranking">
            <ShortenComponents.Hbutton>Ranking</ShortenComponents.Hbutton>
          </Link>
          <ShortenComponents.Hbutton>Sair</ShortenComponents.Hbutton>
        </div>
      </ShortenComponents.Header>
      <ShortenComponents.Container>
        <ShortenComponents.CusImg src={Logo} />
        <ShortenComponents.Container>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <ShortenComponents.Search placeholder="Links que cabem no bolso" />
            <ShortenComponents.Sbutton>Encurtar Link</ShortenComponents.Sbutton>
          </div>
          <ShortenComponents.Shortlink>
            <p>Link.com.br</p> <p>shorturl</p>{" "}
            <p>Quantidade de visitantes: xxx</p>{" "}
            <ShortenComponents.Delete>
              <BsFillTrashFill />
            </ShortenComponents.Delete>{" "}
          </ShortenComponents.Shortlink>
        </ShortenComponents.Container>
      </ShortenComponents.Container>
    </ShortenComponents.Page>
  );
}
