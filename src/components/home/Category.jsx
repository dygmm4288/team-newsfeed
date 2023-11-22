import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Category() {
  const navigate = useNavigate();

  const handleCategorySelect = (selectedCategory) => {
    navigate(`?category=${selectedCategory}`);
  };

  return (
    <StContainer>
      <StCategoryBox>
        <button onClick={() => navigate('/')}>전체보기</button>
        <button onClick={() => handleCategorySelect('발라드')}>발라드</button>
        <button onClick={() => handleCategorySelect('힙합')}>힙합</button>
        <button onClick={() => handleCategorySelect('R&B')}>R&B</button>
        <button onClick={() => handleCategorySelect('락')}>락</button>
        <button onClick={() => handleCategorySelect('댄스')}>댄스</button>
        <button onClick={() => handleCategorySelect('연예인')}>연예인</button>
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
