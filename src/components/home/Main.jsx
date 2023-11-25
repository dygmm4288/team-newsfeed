import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../../contexts/post.context';
import Post from './Post';
import PostForm from './PostForm';

function Main() {
  const [searchParams] = useSearchParams();
  const paramCategory = searchParams.get('category');
  const { posts } = usePost();

  // 현재 카테고리를 기준으로 필터링한 포스트들
  const postsFilteredByCategory = posts.filter(
    (post) => !paramCategory || post.category === paramCategory
  );
  return (
    <StContainer>
      <PostForm />
      <StPostBox>
        {checkEmpty(postsFilteredByCategory) ? (
          <StNoPosts>
            <p>등록되어 있는 Beat가 없습니다.</p>
            <p>⚡ 카테고리의 첫 Beat를 Beat Up 해보세요! ⚡</p>
          </StNoPosts>
        ) : (
          postsFilteredByCategory.map((post) => (
            <Post key={post.id} post={post} />
          ))
        )}
      </StPostBox>
    </StContainer>
  );
}

function checkEmpty(value) {
  return !value.length;
}

export default Main;
const StNoPosts = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-top: 20px;
  font-size: 20px;
`;
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin: 40px 0;
`;

const StPostBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 30px 0;
`;
