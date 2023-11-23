import React, { useEffect } from 'react';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

function Post({ posts, category, userInfo }) {
  const changedPost = () => {};
  const deletePost = () => {};

  const navigate = useNavigate();

  // 로그인 X alert
  const handleClick = () => {
    if (userInfo === null) {
      if (
        window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
      ) {
        navigate('/auth');
      }
    }
  };

  // location 이용
  // const location = useLocation();
  // const queryString = location.search;
  // const category = queryString.get('category');

  // useEffect(() => {
  //   console.log('현재 카테고리:', queryString);
  // }, [queryString]);

  // useSearchParams 이용
  // Main.jsx로 로직 이동

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
                <p>nickname : {posts.nickname}</p>
              </StPostTop>
              <StPostBottom>
                <button onClick={handleClick}>···</button>
                <p className="title">title : {posts.title}</p>
                <p className="content">content : {posts.content}</p>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 80%;
  padding: 15px;
  border: 2px solid blue;
  border-radius: 20px;

  .title {
    height: 15%;
  }

  button {
    position: absolute;
    right: 4%;
  }

  p {
    height: 100%;
    padding-bottom: 20px;
  }
`;
