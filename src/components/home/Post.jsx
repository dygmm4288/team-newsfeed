import React, { useState } from 'react';
import styled from 'styled-components';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import { usePost } from '../../contexts/post.context';

export default function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
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

  return (
    <>
      <StPost>
        <StPostTop>
          <img src={ProfilePicture} alt="ProfilePicture" />
          <p>{post.nickname}</p>
          <p>{post.title}</p>
          <p>{post.createdAt}</p>
        </StPostTop>
        <StPostBottom>
          {isEditing ? (
            <>
              <textarea
                value={editedContent}
                onChange={(e) => {
                  setEditedContent(e.target.value);
                }}
              ></textarea>
              <div>
                <button
                  onClick={() => {
                    handleUpdatePost();
                    handleToggleEditMode();
                  }}
                >
                  수정 완료
                </button>
                <button
                  onClick={() => {
                    setEditedContent(post.content);
                    handleToggleEditMode();
                  }}
                >
                  취소
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{post.content}</p>
              <StButtonContainer>
                <button
                  onClick={() => {
                    console.log('이거 왜 안됨?');
                    handleToggleEditMode();
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    handleDeletePost();
                  }}
                >
                  삭제
                </button>
              </StButtonContainer>
            </>
          )}
        </StPostBottom>
      </StPost>
    </>
  );
}

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

  p {
    height: 100%;
    padding-bottom: 20px;
  }
`;
const StButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
