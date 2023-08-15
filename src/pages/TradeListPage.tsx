import React from "react";
import { styled } from "styled-components";
import eyeImage from "../assets/images/eye.svg";
import HorizontalLine from "../components/common/HorizontalLine";
import FilterButton from "../components/common/FilterButton";
import Paging from "../components/common/Paging/Paging";
import { StTitle } from "../styles/TitleFont";
import ItemCardList from "../components/common/ItemCardList";
import { useQuery } from "react-query";
import { getGoodsApi } from "../api/goods";

const TradeListPage = () => {
  const { isLoading, error, data } = useQuery("tradeListPageData", getGoodsApi);
  if (isLoading) return <div>Loading...</div>;
  console.log("물물교환페이지데이터", data);
  if (error) {
    console.log(error);
  }

  return (
    <TradeListPageContainer>
      <TitleContainer>
        <TitleImage src={eyeImage} />
        <TitleText marginBottom="0" textAlign="center">
          INSIDE POCKET
        </TitleText>
      </TitleContainer>
      <HorizontalLine />
      <FilterButton />
      <ItemCardList />
      <Paging />
    </TradeListPageContainer>
  );
};

const TradeListPageContainer = styled.div`
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
`;
const TitleImage = styled.img`
  width: 66px;
  height: 54px;
  margin-bottom: 16px;
`;

const TitleText = styled(StTitle)`
  color: var(--orange-orange-100, #ec8d49);
`;

export default TradeListPage;
