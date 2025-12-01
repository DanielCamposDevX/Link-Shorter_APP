import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { SignupComponents } from "./styles";

export default function Signup() {
  return (
    <SignupComponents.Page>
      <SignupComponents.Header>
        <Link to="/login">
          <SignupComponents.Hbutton style={{ color: "#5D9040" }}>
            Entrar
          </SignupComponents.Hbutton>
        </Link>
        <Link to="/signup">
          <SignupComponents.Hbutton>Cadastrar-se</SignupComponents.Hbutton>
        </Link>
      </SignupComponents.Header>
      <SignupComponents.Container>
        <SignupComponents.CusImg src={Logo} />
        <SignupComponents.Container>
          <SignupComponents.Search placeholder="Nome" />
          <SignupComponents.Search placeholder="E-mail" />
          <SignupComponents.Search placeholder="Senha" />
          <SignupComponents.Search placeholder="Confirmar Senha" />
          <SignupComponents.Sbutton>Criar conta</SignupComponents.Sbutton>
        </SignupComponents.Container>
      </SignupComponents.Container>
    </SignupComponents.Page>
  );
}
