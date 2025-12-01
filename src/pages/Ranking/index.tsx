import Logo from "../../assets/Logo.svg";
import Trophy from "../../assets/Trophy.svg";

import { useGet } from "../../hooks/useGet";
import { RankingComponents } from "./styles";

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
    <RankingComponents.Page>
      <RankingComponents.Header>
        <RankingComponents.Hbutton style={{ color: "#5D9040" }}>
          Entrar
        </RankingComponents.Hbutton>
        <RankingComponents.Hbutton>Cadastrar-se</RankingComponents.Hbutton>
      </RankingComponents.Header>
      <RankingComponents.Container>
        <RankingComponents.CusImg src={Logo} />
        <RankingComponents.Container>
          <span style={{ display: "flex", alignItems: "center" }}>
            <img src={Trophy} />
            <h1>Ranking</h1>
          </span>
          <RankingComponents.RankContainer>
            {data.ranking?.map((item, index) => (
              <h1 key={index}>
                <span>
                  {index + 1}.{item.name}
                </span>{" "}
                - {item.linkCount} links - {item.visitCount} visualizações
              </h1>
            ))}
          </RankingComponents.RankContainer>
        </RankingComponents.Container>
      </RankingComponents.Container>
      <RankingComponents.Footer>
        <h1>Crie sua conta para usar nosso serviço!</h1>
      </RankingComponents.Footer>
    </RankingComponents.Page>
  );
}
