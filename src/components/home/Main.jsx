import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../../contexts/post.context';
import Post from './Post';

function Main() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const [category, setCategory] = useState(selectedCategory || '발라드');

  console.log(category);
  const { createPost, posts } = usePost();

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

  return (
    <StContainer>
      <form onSubmit={(event) => handleCreatePost(event)}>
        <input
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
        <select onChange={(e) => setCategory(e.target.value)}>
          <option selected={category === '발라드'} value={'발라드'}>
            발라드
          </option>
          <option selected={category === '힙합'} value={'힙합'}>
            힙합
          </option>
          <option selected={category === 'R&B'} value={'R&B'}>
            R&B
          </option>
          <option selected={category === '락'} value={'락'}>
            락
          </option>
          <option selected={category === '댄스'} value={'댄스'}>
            댄스
          </option>
          <option selected={category === '연예인'} value={'연예인'}>
            연예인
          </option>
        </select>
        <button type="submit">추가</button>
      </form>
      <StPostBox>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </StPostBox>
    </StContainer>
  );
}

export default Main;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin: 40px 0;
  /* border: 2px solid black; */
`;

const StPostBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
