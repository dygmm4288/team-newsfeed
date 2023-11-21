import React from 'react';
import styled from 'styled-components';

function Category() {
  return (
    <StContainer>
      <ul>
        <li>전체보기</li>
        <li>발라드</li>
        <li>힙합</li>
        <li>R&B</li>
        <li>락</li>
        <li>댄스</li>
        <li>연예인</li>
      </ul>
    </StContainer>
  );
}

export default Category;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
  border: 2px solid black;

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100px;
    border: 2px solid blue;

    li {
    }
  }
`;
