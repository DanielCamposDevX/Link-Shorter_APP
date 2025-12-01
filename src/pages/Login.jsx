import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Page>
      <Header>
        <Link to="/login">
          <Hbutton style={{ color: "#5D9040" }}>Entrar</Hbutton>
        </Link>
        <Link to="/signup">
          <Hbutton>Cadastrar-se</Hbutton>
        </Link>
      </Header>
      <Container>
        <CusImg src={Logo} />
        <Container style={{ justifyContent: "center" }}>
          <Search placeholder="email" />
          <Search placeholder="senha" />
          <Sbutton>Entrar</Sbutton>
        </Container>
      </Container>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lexend Deca", sans-serif;
`;

const Header = styled.div`
  height: 8vh;
  width: 80%;
  display: flex;
  justify-content: end;
  align-items: end;
  margin-bottom: 30px;
`;

const Hbutton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 14px;
  line-height: 17.5px;
  font-family: "Lexend Deca", sans-serif;
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 90%;
  height: 63vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 36px;
    font-weight: 700;
    line-height: 45px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 10px;
  }
`;

const CusImg = styled.img`
  height: 12vh;
  margin-bottom: 40px;
`;

const Search = styled.input`
  padding: 1%;
  width: 59%;
  height: 25px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0px 4px 24px 0px #78b1591f;
  margin-bottom: 20px;
`;

const Sbutton = styled.button`
  width: 20%;
  height: 45px;
  border-radius: 12px;
  border: none;
  color: white;
  background-color: #5d9040;
  font-weight: 700;
  font-family: "Lexend Deca", sans-serif;
  margin-top: 20px;
`;
