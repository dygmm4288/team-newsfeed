import React from 'react';
import styled from 'styled-components';
import Category from '../components/home/Category';
import Main from '../components/home/Main';
export default function Home() {
  return (
    <StContainer>
      <StCategoryAndMain>
        <Category />
        <Main />
      </StCategoryAndMain>
    </StContainer>
  );
}
const StContainer = styled.div`
  display: flex;
  align-items: center;
  width: 960px;
`;

const StCategoryAndMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 70px;
`;
