import React from 'react';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import ScrollToTopBtn from '../components/Layout/ScrollToTopBtn';
import Category from '../components/home/Category';
import Main from '../components/home/Main';

// Data 임시 기록
// PostInfo(Document)
// {
//   게시물 아이디 : (firebase에서 랜덤으로 들어갈 것임)
//   content
//   title
//   category
//   nickname
//   createdAt : new Date().toLocaleString()
//   profileImage:
//   updatedAt?
// likeCount?
// review?
// }

// Category
// {
//   rock
//   ballad
//   dance
//   hiphop
//   rnb
//   idol
// }

export default function Home() {
  return (
    <StHomeOutLine>
      <StContainer>
        <Header />
        <StCategoryAndMain>
          <Category />
          <Main />
        </StCategoryAndMain>
        <ScrollToTopBtn />
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
  width: 960px;
`;

const StCategoryAndMain = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 70px;
`;
