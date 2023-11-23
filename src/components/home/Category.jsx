import React, { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { categories } from '../../data/categories';

function Category() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategorySelect = useCallback((selectedCategory) => {
    navigate(`?category=${encodeURIComponent(selectedCategory)}`);
  }, []);
  const handleNavigateHome = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <StContainer>
      <StCategoryBox>
        <StCategoryButton
          $selected={!selectedCategory}
          onClick={() => handleNavigateHome('/')}
        >
          전체보기
        </StCategoryButton>
        {categories.map((category) => (
          <StCategoryButton
            key={category}
            $selected={selectedCategory === category}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </StCategoryButton>
        ))}
      </StCategoryBox>
    </StContainer>
  );
}

export default Category;

const StContainer = styled.div`
  display: flex;
  width: 25%;
  margin: 40px 0;
  /* border: 2px solid black; */
`;

const StCategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  overflow: hidden;
  width: 210px;
  height: 300px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 20px;
  box-shadow: 0 1px 5px #464646;
  background-color: #ffffff; //클릭되면 색변화
`;
const StCategoryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.$selected ? '#007bff' : 'transparent')};
  border: none;
  cursor: pointer;

  border-radius: 0.5rem;
  color: ${(props) => (props.$selected ? '#ffffff' : '#000000')};
`;
