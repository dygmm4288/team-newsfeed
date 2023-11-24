import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';
import { usePost } from '../../contexts/post.context';
import { categories } from '../../data/categories';
import styled from 'styled-components';

export default function PostForm({ paramCategory }) {
  const [category, setCategory] = useState(paramCategory || '발라드');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createPost } = usePost();
  const { userInfo } = useAuth();

  const navigate = useNavigate();
  // 포스터 만드는 이벤트 핸들러

  const handleCreatePost = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용 모두 입력해주세요💌');
      return;
    }
    if (!window.confirm(`포스트를 ${category} 카테고리에 등록하시겠습니까?`))
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
  // 인풋 포커즈 시 로그인 여부 상태 확인 핸들러
  // 선언적으로 값을 데이터를 관리할 수 없을 것 같으면
  // 반환값을 사용한다 (like event) 함수라도 순수하게 유지
  const handleFocus = (event) => {
    if (userInfo) return; // 로그인 한 상태라면 막을 필요가 없다.
    if (
      window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
    ) {
      navigate('/auth');
    }
    event.currentTarget.blur();
  };

  const checkValidTitle = (value) => {
    if (value.length <= 15) return true;
    alert('제목이 너무 깁니다!');
    return false;
  };
  const checkValidContent = (value) => {
    if (value.length <= 100) return true;
    alert('내용이 너무 깁니다!');
    return false;
  };

  const handleChangeValue = (checkValid, setState) => (event) => {
    if (checkValid(event.target.value)) {
      setState(event.target.value);
      return;
    }
  };
  return (
    <StPostFormBox onSubmit={handleCreatePost} onFocus={handleFocus}>
      <StTitleInput
        type="text"
        value={title}
        onChange={handleChangeValue(checkValidTitle, setTitle)}
        placeholder="제목을 입력해주세요."
      />
      <StContentInput
        type="text"
        value={content}
        onChange={handleChangeValue(checkValidContent, setContent)}
        placeholder="어떤 이야기를 나누고 싶나요?"
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
        <button type="submit">Beat Up</button>
      </StBeatUpBox>
    </StPostFormBox>
  );
}

const StPostFormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 580px;
  height: 180px;
  padding: 15px 20px;
  background-color: #f2f2f2;

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

  &::placeholder {
    color: #2c2c2c;
  }
`;

const StContentInput = styled.textarea`
  height: 100%;
  resize: none;
  border: none;
  font-size: 13px;
  background: transparent;

  &::placeholder {
    color: #2c2c2c;
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

    & option {
      color: white;
      padding: 50px 0;
    }
  }

  button {
    width: 84%;
    color: white;
    background-color: #ff5b22;
    border: none;
    font-weight: 600;
    transition: 0.2s ease-in-out;

    &:hover {
      scale: 1.04;
      background-color: #ff3217;
    }

    &:active {
      scale: 0.96;
    }
  }
`;
