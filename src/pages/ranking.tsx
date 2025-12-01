import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import Trophy from "../assets/Trophy.svg";

import { useGet } from "../hooks/useGet";

interface IRanking {
  name: string;
  linkCount: number;
  visitCount: number;
}

interface Response {
  ranking: IRanking[];
}

export default function Ranking() {
  const { data } = useGet<Response>({
    url: `${import.meta.env.VITE_APP_API_URL}/ranking`,
    initialState: {
      ranking: [],
    },
    instantFilters: {},
  });

  return (
    <Page>
      <Header>
        <Hbutton style={{ color: "#5D9040" }}>Entrar</Hbutton>
        <Hbutton>Cadastrar-se</Hbutton>
      </Header>
      <Container>
        <CusImg src={Logo} />
        <Container>
          <span style={{ display: "flex", alignItems: "center" }}>
            <img src={Trophy} />
            <h1>Ranking</h1>
          </span>
          <RankContainer>
            {data.ranking?.map((item, index) => (
              <h1 key={index}>
                <span>
                  {index + 1}.{item.name}
                </span>{" "}
                - {item.linkCount} links - {item.visitCount} visualizações
              </h1>
            ))}
          </RankContainer>
        </Container>
      </Container>
      <Footer>
        <h1>Crie sua conta para usar nosso serviço!</h1>
      </Footer>
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
  margin-bottom: 20px;
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
  justify-content: center;
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

const RankContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  width: 80%;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 24px 0px #78b1591f;
  margin-top: 30px;
  h1 {
    font-size: 22px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 10px;
  }
`;
const Footer = styled.div`
  height: 29vh;
  h1 {
    font-size: 36px;
    font-weight: 700;
    line-height: 45px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 20px;
  }
`;
