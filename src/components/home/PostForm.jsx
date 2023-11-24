import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';
import { usePost } from '../../contexts/post.context';
import { categories } from '../../data/categories';

export default function PostForm({ paramCategory }) {
  const [category, setCategory] = useState(paramCategory || '발라드');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createPost } = usePost();
  const { userInfo } = useAuth();

  const titleInputRef = useRef();
  const contentInputRef = useRef();
  const categorySelected = useRef();
  const submitBtn = useRef();

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
  const handleFocus = (event) => {
    if (userInfo) return; // 로그인 한 상태라면 막을 필요가 없다.
    if (
      window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
    ) {
      navigate('/auth');
    }

    //? 어떻게 더 효율적으로 작성할 수 있지?
    titleInputRef.current.blur();
    contentInputRef.current.blur();
    categorySelected.current.blur();
    submitBtn.current.blur();
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
    <form onSubmit={handleCreatePost} onFocus={handleFocus}>
      <input
        ref={titleInputRef}
        type="text"
        value={title}
        onChange={handleChangeValue(checkValidTitle, setTitle)}
        placeholder="제목을 입력해주세요"
      />
      <input
        type="text"
        ref={contentInputRef}
        value={content}
        onChange={handleChangeValue(checkValidContent, setContent)}
        placeholder="어떤 이야기를 나누고 싶나요?"
      />
      {!paramCategory ? (
        <select
          ref={categorySelected}
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
      <button ref={submitBtn} type="submit">
        추가
      </button>
    </form>
  );
}
