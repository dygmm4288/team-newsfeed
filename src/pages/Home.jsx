import React from 'react';
import Header from '../components/Layout/Header';
import styled from 'styled-components';
import Category from '../components/home/Category';
import Main from '../components/home/Main';

export default function Home() {
  return (
    <StHomeOutLine>
      <StContainer>
        <Header />
        <StCategoryAndMain>
          <Category />
          <Main />
        </StCategoryAndMain>
      </StContainer>
    </StHomeOutLine>
  );
}

const StHomeOutLine = styled.div`
  display: flex;
  justify-content: center;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  width: 1200px;
`;

const StCategoryAndMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
