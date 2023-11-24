import React, { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth.context';
import { usePost } from '../../contexts/post.context';
import Post from './Post';

function Main() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const [category, setCategory] = useState(selectedCategory || '발라드');

  const titleInputRef = useRef();
  const contentInputRef = useRef();
  const categorySelected = useRef();
  const submitBtn = useRef();

  const { userInfo } = useAuth();
  const { createPost, posts } = usePost();

  const navigate = useNavigate();

  const handleCreatePost = async (event) => {
    event.preventDefault();
    if (title.trim() && content.trim()) {
      createPost({ title, content, category });
      setTitle('');
      setContent('');
    } else {
      alert('제목과 내용 모두 입력해주세요💌');
    }
  };
  // 로그인 X alert
  const handleFocus = () => {
    if (userInfo === null) {
      if (
        window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
      ) {
        navigate('/auth');
      } else {
        titleInputRef.current.blur();
        contentInputRef.current.blur();
        categorySelected.current.blur();
        submitBtn.current.blur();
      }
    }
  };

  const postsFilteredByCategory = posts.filter(
    (post) => !selectedCategory || post.category === selectedCategory
  );

  return (
    <StContainer>
      <form onSubmit={(event) => handleCreatePost(event)} onFocus={handleFocus}>
        <input
          ref={titleInputRef}
          type="text"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 15) {
              setTitle(e.target.value);
            } else {
              alert('제목이 너무 깁니다!');
            }
          }}
          placeholder="제목을 입력해주세요"
        />
        <input
          type="text"
          ref={contentInputRef}
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setContent(e.target.value);
            } else {
              alert('내용이 너무 깁니다!');
            }
          }}
          placeholder="어떤 이야기를 나누고 싶나요?"
        />
        {!selectedCategory ? (
          <select
            ref={categorySelected}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={'발라드'}>발라드</option>
            <option value={'힙합'}>힙합</option>
            <option value={'R&B'}>R&B</option>
            <option value={'락'}>락</option>
            <option value={'댄스'}>댄스</option>
            <option value={'연예인'}>연예인</option>
          </select>
        ) : (
          <p>{selectedCategory}</p>
        )}
        <button ref={submitBtn} type="submit">
          추가
        </button>
      </form>
      <StPostBox>
        {postsFilteredByCategory.length !== 0 ? (
          postsFilteredByCategory.map((post) => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <StNoPosts>
            등록되어 있는 포스트가 없습니다.
            <br />첫 포스트를 등록해 보세요~! 😀
          </StNoPosts>
        )}
      </StPostBox>
    </StContainer>
  );
}

export default Main;
const StNoPosts = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-top: 40px;
`;
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin: 40px 0;

  form {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }
`;

const StPostBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
