import React from 'react';
import styled from 'styled-components';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';

function Post({ posts }) {
  const changedPost = () => {};
  const deletePost = () => {};

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

export const StPost = styled.li`
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
