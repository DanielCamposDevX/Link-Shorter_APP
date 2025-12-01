import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Shorten() {
  return (
    <Page>
      <Header>
        <h1>Seja bem-vindo(a), Pessoa!</h1>
        <div>
          <Hbutton>Home</Hbutton>
          <Link to="/ranking">
            <Hbutton>Ranking</Hbutton>
          </Link>
          <Hbutton>Sair</Hbutton>
        </div>
      </Header>
      <Container>
        <CusImg src={Logo} />
        <Container>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Search placeholder="Links que cabem no bolso" />
            <Sbutton>Encurtar Link</Sbutton>
          </div>
          <Shortlink>
            <p>Link.com.br</p> <p>shorturl</p>{" "}
            <p>Quantidade de visitantes: xxx</p>{" "}
            <Delete>
              <BsFillTrashFill />
            </Delete>{" "}
          </Shortlink>
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
  justify-content: space-between;
  align-items: end;
  margin-bottom: 20px;
  h1 {
    color: #5d9040;
  }
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
  width: 69%;
  height: 25px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 24px 0px #78b1591f;
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
`;

const Shortlink = styled.div`
  padding-left: 3%;
  width: 93%;
  height: 45px;
  border-radius: 12px;
  background-color: #70b64b;
  color: white;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 24px 0px #78b1591f;
  overflow: clip;
`;

const Delete = styled.button`
  height: 100%;
  width: 10%;
  border: none;
  background-color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #70b64b;
`;
