import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePost } from '../../contexts/post.context';
import Post from './Post';
import PostForm from './PostForm';

// Data 임시 기록
// PostInfo(Document)
// {
//   게시물 아이디 : (firebase에서 랜덤으로 들어갈 것임)
//   content
//   title
//   category
//   nickname
//   createdAt : new Date().toLocaleString()
//   profileImage:
//   updatedAt?
//   likeCount?
//   review?
// }

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
      <PostForm paramCategory={paramCategory} />
      <StPostBox>
        {checkEmpty(postsFilteredByCategory) ? (
          <StNoPosts>
            <p>등록되어 있는 포스트가 없습니다.</p>
            <p>첫 포스트를 등록해 보세요~! 😀</p>
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
