import React from 'react';
import styled from 'styled-components';
import Post from './Post';

function Main() {
  return (
    <StContainer>
      <div>
        <input placeholder="어떤 이야기를 나누고 싶나요?" />
      </div>
      <StPostBox>
        <Post />
        <Post />
        <Post />
      </StPostBox>
    </StContainer>
  );
}

export default Main;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  border: 2px solid black;
`;

const StPostBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
