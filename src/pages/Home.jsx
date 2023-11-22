import React, { useRef } from 'react';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
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
  const a = useRef(null);

  a.current?.addEventListener('click', () => {
    document.body.scrollTop = 0;
  });

  return (
    <StHomeOutLine>
      <StContainer>
        <Header />
        <StCategoryAndMain>
          <Category />
          <Main />
        </StCategoryAndMain>
        <StscrollToTopBtn ref={a}>▲</StscrollToTopBtn>
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

const StscrollToTopBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  border: none;
  color: #fff;
  background-color: #007bff;
  box-shadow: 1px 1px 6px #3a3a3a;
  cursor: pointer;

  &:hover {
    scale: 1.1;
    background-color: #3c9aff;
  }

  /* &.scrolled {
    
  } */
`;
