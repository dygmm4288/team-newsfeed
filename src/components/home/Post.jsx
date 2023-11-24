import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DefaultProfileImg from '../../assets/Layout/Test-ProfilePicture.png';
import { useAuth } from '../../contexts/auth.context';
import { usePost } from '../../contexts/post.context';
export default function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const { userInfo } = useAuth();
  const { deletePost, updatePost } = usePost();

  const navigate = useNavigate();

  const handleToggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleClick = () => {
    if (userInfo === null) {
      if (
        window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
      ) {
        navigate('/auth');
      }
    }
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
    <StPost>
      <StPostTop>
        <img
          src={post.userInfo?.profileImgUrl || DefaultProfileImg}
          alt="ProfilePicture"
        />
        <p>nickname : {post.nickname}</p>
      </StPostTop>
      <StPostBottom>
        {/* <button onClick={handleClick}>···</button> */}
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
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <StButtonContainer>
              <button
                onClick={() => {
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
  );
}

const StPost = styled.li`
  width: 580px;
  min-height: 250px;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 80%;
  padding: 15px;
  border: 2px solid blue;
  border-radius: 20px;

  .title {
    height: 15%;
  }
  p {
    height: 100%;
    padding-bottom: 20px;
  }
`;
const StButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 13px;
  bottom: 13px;
`;
