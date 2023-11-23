import React, { useEffect } from 'react';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Post({ posts }) {
  const changedPost = () => {};
  const deletePost = () => {};

  // location 이용
  // const location = useLocation();
  // const queryString = location.search;
  // const category = queryString.get('category');

  // useEffect(() => {
  //   console.log('현재 카테고리:', queryString);
  // }, [queryString]);

  // useSearchParams 이용
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category');

  return (
    <>
      {posts.filter((posts) => {
        return category === null ? true : posts.category === category;
      }).length === 0 ? (
        <StNoPosts>
          등록되어 있는 포스트가 없습니다.
          <br />첫 포스트를 등록해 보세요~! 😀
        </StNoPosts>
      ) : (
        posts
          .filter((posts) => {
            return category === null ? true : posts.category === category;
          })
          .map((posts) => (
            // key값 부여해야하는 id값이 없음...!
            <StPost key={posts.id}>
              <StPostTop>
                <img src={ProfilePicture} alt="ProfilePicture" />
                <p>{posts.nickname}</p>
                <p>{posts.title}</p>
              </StPostTop>
              <StPostBottom>
                <button>···</button>
                <p>{posts.content}</p>
              </StPostBottom>
            </StPost>
          ))
      )}
    </>
  );
}

export default Post;

const StNoPosts = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-top: 40px;
`;

const StPost = styled.li`
  width: 500px;
  min-height: 300px;
  margin-top: 20px;
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
  height: 80%;
  padding: 15px;
  border: 2px solid blue;
  border-radius: 20px;

  button {
    position: absolute;
    right: 4%;
  }

  p {
    height: 100%;
    padding-bottom: 20px;
  }
`;
