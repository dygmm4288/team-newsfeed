import React from 'react';
import styled from 'styled-components';

function Category() {
  return (
    <StContainer>
      <StCategoryBox>
        <button>전체보기</button>
        <button>발라드</button>
        <button>힙합</button>
        <button>R&B</button>
        <button>락</button>
        <button>댄스</button>
        <button>연예인</button>
      </StCategoryBox>
    </StContainer>
  );
}

export default Category;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
  border: 2px solid black;
`;

const StCategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 200px;
  margin: 10px;
  border: 2px solid black;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px solid black;
  }
`;
