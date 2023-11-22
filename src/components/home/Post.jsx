import React, { useEffect } from 'react';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Post({ posts }) {
  const changedPost = () => {};
  const deletePost = () => {};

  // location 이용
  // const location = useLocation();
  // const queryString = location.search;
  // const category = queryString.get('category');

  // useEffect(() => {
  //   console.log('현재 카테고리:', queryString);
  // }, [queryString]);

  // useSearchParams 이용
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category');

  useEffect(() => {
    console.log('현재 카테고리:', category);
  }, [category]);

  return (
    <>
      {posts.map((posts) => (
        <StPost>
          <StPostTop>
            <img src={ProfilePicture} alt="ProfilePicture" />
            <p>{posts.nickname}</p>
            <p>{posts.title}</p>
          </StPostTop>
          <StPostBottom>
            <button>···</button>
            <p>{posts.content}</p>
          </StPostBottom>
        </StPost>
      ))}
    </>
  );
}

export default Post;

const StPost = styled.li`
  width: 500px;
  min-height: 300px;
  margin-top: 20px;
`;

const StPostTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20%;
  padding: 0 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const StPostBottom = styled.div`
  position: relative;
  height: 80%;
  padding: 15px;
  border: 2px solid blue;
  border-radius: 20px;

  button {
    position: absolute;
    right: 4%;
  }

  p {
    height: 100%;
    padding-bottom: 20px;
  }
`;
