import React, { useState } from 'react';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import styled from 'styled-components';

function Post({ posts, setPosts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditidContent] = useState('');
  const changedPost = () => {};
  const deletePost = () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmDelete) {
      // const updatedPost = posts.filter((post)=> post.?? != ??)
      // setPosts(updatedPost);
    }
  };

  return (
    <>
      {posts.map((posts) => (
        <StPost>
          <StPostTop>
            <img src={ProfilePicture} alt="ProfilePicture" />
            <p>{posts.nickname}</p>
            <p>{posts.title}</p>
            <p>{posts.createdAt}</p>
          </StPostTop>
          <StPostBottom>
            <div>
              <button onClick={() => changedPost}>수정</button>
              <button onClick={() => deletePost}>삭제</button>
            </div>
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
  border: 2px solid black;
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
