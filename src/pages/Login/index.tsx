import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { LoginComponents } from "./styles";

export default function Login() {
  return (
    <LoginComponents.Page>
      <LoginComponents.Header>
        <Link to="/login">
          <LoginComponents.Hbutton style={{ color: "#5D9040" }}>
            Entrar
          </LoginComponents.Hbutton>
        </Link>
        <Link to="/signup">
          <LoginComponents.Hbutton>Cadastrar-se</LoginComponents.Hbutton>
        </Link>
      </LoginComponents.Header>
      <LoginComponents.Container>
        <LoginComponents.CusImg src={Logo} />
        <LoginComponents.Container style={{ justifyContent: "center" }}>
          <LoginComponents.Search placeholder="email" />
          <LoginComponents.Search placeholder="senha" />
          <LoginComponents.Sbutton>Entrar</LoginComponents.Sbutton>
        </LoginComponents.Container>
      </LoginComponents.Container>
    </LoginComponents.Page>
  );
}
