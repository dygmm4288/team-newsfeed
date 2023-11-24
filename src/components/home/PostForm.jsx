import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  // 포스터 만드는 이벤트 핸들러

  const handleCreatePost = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용 모두 입력해주세요💌');
      return;
    }
    if (
      !window.confirm(
        `포스트를 ${paramCategory || category} 카테고리에 등록하시겠습니까?`
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
  return (
    <form onSubmit={handleCreatePost} onFocus={handleFocus}>
      <input
        type="text"
        value={title}
        onChange={handleChangeValue(
          checkValidation(checkValidateTitle, '제목이 너무 깁니다.'),
          setTitle
        )}
        placeholder="제목을 입력해주세요"
      />
      <input
        type="text"
        value={content}
        onChange={handleChangeValue(
          checkValidation(checkValidateTitle, '내용이 너무 깁니다.'),
          setContent
        )}
        placeholder="어떤 이야기를 나누고 싶나요?"
      />
      {!paramCategory ? (
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      ) : (
        <p>{paramCategory}</p>
      )}
      <button type="submit">추가</button>
    </form>
  );
}

function checkValidateTitle(title) {
  return title.length <= 15;
}
function checkValidateContent(content) {
  return content.length <= 100;
}
