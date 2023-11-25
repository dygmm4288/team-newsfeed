import React, { useState } from 'react';
import styled from 'styled-components';
import DefaultProfileImg from '../../assets/Layout/default-profile-img2.png';
import { useAuth } from '../../contexts/auth.context';
import { usePost } from '../../contexts/post.context';
export default function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const { userInfo } = useAuth();
  const { deletePost, updatePost } = usePost();

  const handleToggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deletePost({ postId: post.id });
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  const handleUpdatePost = async () => {
    updatePost({ postId: post.id, data: { content: editedContent } });
  };
  const isCanEdit = userInfo?.email === post.userInfo.email;

  return (
    <StPost>
      <StPostTop>
        <img
          src={post.userInfo?.profileImgUrl || DefaultProfileImg}
          alt="ProfilePicture"
        />
        <p>{post.userInfo.nickname}</p>
      </StPostTop>
      <StPostBottom>
        {isEditing ? (
          <>
            <h1>{post.title}</h1>
            <textarea
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
            ></textarea>
            <StButtonContainer>
              <button
                onClick={() => {
                  handleUpdatePost();
                  handleToggleEditMode();
                }}
              >
                ⭕
              </button>
              <button
                onClick={() => {
                  setEditedContent(post.content);
                  handleToggleEditMode();
                }}
              >
                ⛔
              </button>
            </StButtonContainer>
          </>
        ) : (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {isCanEdit && (
              <StButtonContainer>
                <button
                  onClick={() => {
                    handleToggleEditMode();
                  }}
                >
                  🔨
                </button>
                <button
                  onClick={() => {
                    handleDeletePost();
                  }}
                >
                  💥
                </button>
              </StButtonContainer>
            )}
          </>
        )}
      </StPostBottom>
    </StPost>
  );
}

const StPost = styled.li`
  width: 580px;
  height: 300px;
`;

const StPostTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const StPostBottom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  gap: 15px;
  height: 250px;
  padding: 25px;
  border-radius: 5px;
  color: white;
  background-color: #2c2c2c;

  &:hover {
    box-shadow: 3px 3px 10px #020202;
  }

  textarea {
    width: 100%;
    height: 100%;
    resize: none;
    outline: none;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 17.4px;
    color: white;
    background: transparent;
    border: 2px solid #ff5b22;
    border-radius: 5px;
    line-height: 1.36;
  }

  h1 {
    height: 15%;
    font-size: 25px;
  }
  p {
    width: 100%;
    height: 100%;
    font-size: 17.4px;
    margin-bottom: 20px;
    line-height: 1.36;
    margin-top: 5px;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 25px;
  bottom: 13px;
  gap: 10px;

  button {
    width: 30px;
    height: 23px;
    background: transparent;
    background-color: #464646;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      scale: 1.3;
      background-color: #ff5b22;
    }

    &:active {
      scale: 0.9;
    }
  }
`;
