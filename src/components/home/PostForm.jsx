import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth.context';
import { usePost } from '../../contexts/post.context';
import { categories } from '../../data/categories';

export default function PostForm() {
  const [searchParams] = useSearchParams();
  const paramCategory = searchParams.get('category');
  const [category, setCategory] = useState(paramCategory || '발라드');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createPost } = usePost();
  const { userInfo } = useAuth();

  const navigate = useNavigate();

  const handleCreatePost = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용 모두 입력해주세요💌');
      return;
    }
    if (
      !window.confirm(
        `Beat를 ${paramCategory || category} 카테고리에 등록하시겠습니까?`
      )
    )
      return;

    createPost({
      title,
      content,
      category: paramCategory || category,
      userInfo
    });

    setTitle('');
    setContent('');
  };
  const handleFocus = (event) => {
    if (userInfo) return;
    if (
      window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
    ) {
      navigate('/auth');
    }
    event.target.blur();
  };
  const checkValidation = (validate, alertMsg) => (value) => {
    if (validate(value)) return true;
    alert(alertMsg);
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
      const currentRowCount = content.split('\n').length;
      const maxRowCount = 6;

      if (currentRowCount >= maxRowCount) {
        event.preventDefault();
        event.stopPropagation();
        alert('6줄 이하로 작성해 주세요! 😲');
      }
    }
  };

  return (
    <StPostFormBox onSubmit={handleCreatePost} onFocus={handleFocus}>
      <StTitleInput
        type="text"
        value={title}
        onChange={handleChangeValue(
          checkValidation(checkValidateTitle, '제목이 너무 깁니다.'),
          setTitle
        )}
        placeholder="제목을 입력해주세요."
      />
      <StContentTextarea
        type="text"
        value={content}
        onChange={handleChangeValue(
          checkValidation(checkValidateContent, '내용이 너무 깁니다.'),
          setContent
        )}
        placeholder="어떤 이야기를 나누고 싶나요?"
        onKeyPress={handleTextareaKeyPress}
      />
      <StBeatUpBox>
        {!paramCategory ? (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ) : (
          <p>{paramCategory}</p>
        )}
        <button type="submit">
          <span>Beat Up</span>
        </button>
      </StBeatUpBox>
    </StPostFormBox>
  );
}

function checkValidateTitle(title) {
  return title.length <= 22;
}
function checkValidateContent(content) {
  return content.length <= 192;
}

const StPostFormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 580px;
  height: 191px;
  padding: 15px 20px;
  background-color: #f2f2f2;
  border-radius: 5px;

  * {
    color: #2c2c2c;
  }
`;

const StTitleInput = styled.input`
  height: 30px;
  border: none;
  background: transparent;
  border-bottom: 2px solid #ff5b22;
  padding-bottom: 5px;
  font-size: 18px;
  outline: none;
  &::placeholder {
    color: #2c2c2c;
  }
`;

const StContentTextarea = styled.textarea`
  height: 100%;
  resize: none;
  border: none;
  font-size: 13px;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #2c2c2c;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const StBeatUpBox = styled.div`
  display: flex;
  justify-content: space-between;

  * {
    height: 25px;
    font-size: 13px;
  }

  select {
    width: 13%;
    text-align: center;
    color: white;
    background-color: #2c2c2c;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    & option {
      color: white;
      padding: 50px 0;
    }
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13%;
    font-size: 13px;
    color: white;
    background-color: #2c2c2c;
    border-radius: 5px;
  }

  button {
    width: 84%;
    background-color: #ff5b22;
    border: none;
    font-weight: 600;
    transition: 0.2s ease-in-out;
    border-radius: 5px;
    cursor: pointer;

    span {
      color: white;
    }

    &:hover {
      scale: 1.005;
      box-shadow: 1px 1px 4px #000000;
    }

    &:hover span {
      display: none;
    }

    &:hover::before {
      content: '⚡ Beat Up ⚡';
      color: white;
    }

    &:active {
      scale: 0.96;
    }
  }
`;
