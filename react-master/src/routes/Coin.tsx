import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface RouterParams {
  coinId: string;
}

interface RouterState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<RouterParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouterState>();
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."} </Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
