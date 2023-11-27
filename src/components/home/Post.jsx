import React, { useState } from 'react';
import styled from 'styled-components';
import DefaultProfileImg from '../../assets/Layout/default-profile-img2.png';
import { useAuth } from '../../contexts/auth.context';
import { usePost } from '../../contexts/post.context';
import useModal from '../../hooks/useModal';
export default function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const { userInfo } = useAuth();
  const { deletePost, updatePost } = usePost();

  const handleToggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const { alertModal, confirmModal } = useModal();

  const handleDeletePost = async () => {
    confirmModal({
      name: '게시글 삭제',
      content: '정말로 삭제하시겠습니까?',
      confirmLogic: () => {
        deletePost({ postId: post.id });
      }
    });
  };
  const handleUpdatePost = async () => {
    updatePost({
      postId: post.id,
      data: { title: editedTitle, content: editedContent }
    });
  };
  const isCanEdit = userInfo?.email === post.userInfo.email;

  const checkValidation = (validate, alertMsg) => (value) => {
    if (validate(value)) return true;
    alertModal({ name: '유효성 검사 실패', content: alertMsg });
    return false;
  };

  const handleChangeValue = (checkValid, setState) => (event) => {
    if (checkValid(event.target.value)) {
      setState(event.target.value);
      return;
    }
  };

  const handleTextareaKeyPress = (event) => {
    if (event.key === 'Enter') {
      const currentRowCount = editedContent.split('\n').length;
      const maxRowCount = 6;
      console.log(currentRowCount);

      if (currentRowCount >= maxRowCount) {
        event.preventDefault();
        event.stopPropagation();
        alertModal({
          name: '유효성 검사 실패',
          content: '6줄 이하로 작성해 주세요! 😲'
        });
      }
    }
  };
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
            <input
              value={editedTitle}
              onChange={handleChangeValue(
                checkValidation(checkValidateTitle, '제목이 너무 깁니다.'),
                setEditedTitle
              )}
            ></input>
            <textarea
              value={editedContent}
              onChange={handleChangeValue(
                checkValidation(checkValidateContent, '내용이 너무 깁니다.'),
                setEditedContent
              )}
              onKeyPress={handleTextareaKeyPress}
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
            <p>
              {post.content.split('\n').map((line) => {
                return (
                  <>
                    {line}
                    <br />
                  </>
                );
              })}
            </p>
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

function checkValidateTitle(title) {
  return title.length <= 22;
}
function checkValidateContent(content) {
  return content.length <= 192;
}

export const StPost = styled.li`
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
  gap: 10px;
  height: 250px;
  padding: 25px;
  border-radius: 5px;
  color: white;
  background-color: #2c2c2c;

  &:hover {
    box-shadow: 3px 3px 10px #020202;
  }

  input {
    width: 100%;
    height: 45px;
    resize: none;
    outline: none;
    padding: 10px;
    font-size: 17.4px;
    color: white;
    background: transparent;
    border: none;
    border-bottom: 2px solid #ff5b22;
    overflow-y: hidden;
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

    &::-webkit-scrollbar {
      background-color: #646464;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #737373;
    }
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
