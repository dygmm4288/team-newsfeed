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
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.$selected ? '#007bff' : 'transparent')};
  border: none;
  cursor: pointer;

  border-radius: 0.5rem;
  color: ${(props) => (props.$selected ? '#ffffff' : '#000000')};
  transition: 0.2s ease-in-out;

  /* 백그라운드 채우기 트랜지션 */
  /* &:hover {
    background: linear-gradient(to right, #ffffff, #007bff);
    transition: background-position 0.6s ease-in-out;
    background-size: 200% 20px;
    background-position: -100% 0;
  } */

  /* 아래쪽 테투리 채우기 트랜지션 */
  &::before {
    display: ${(props) => (props.$selected ? 'none' : 'block')};
    content: '';
    position: absolute;
    bottom: 2px;
    left: 5px;
    width: 0px; /* 초기에는 가로 길이 0으로 설정 */
    height: 2px; /* 테두리 높이 */
    background-color: #3498db; /* 테두리 색상 */
    transition: width 0.3s ease; /* 트랜지션 속성 적용 */
    border-radius: 0.5rem;
  }

  /* 호버 효과 시 테두리 채우기 */
  &:hover::before {
    width: calc(100% - 10px); /* 가로 길이 100%로 변경하여 채우기 */
    border-radius: 0.5rem;
  }
`;
