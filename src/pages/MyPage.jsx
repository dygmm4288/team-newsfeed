import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ScrollToTopBtn from '../components/Layout/ScrollToTopBtn';
import MyInformationWrapper from '../components/my-page/MyInformationWrapper';
import { useAuth } from '../contexts/auth.context';
import { usePost } from '../contexts/post.context';

function MyPage() {
  const { userInfo } = useAuth();
  const { posts } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    // 유저정보가 없을 때
    if (!userInfo) {
      alert('잘못된 접근입니다.');
      navigate('/');
      return;
    }
  }, [userInfo]);

  const myPosts = posts.filter(
    (post) => post.userInfo.email === userInfo?.email
  );

  return (
    <StOuterFrame>
      <StMainContainer>
        <StMyPostContainer>
          <StMyPostTitle>My Post</StMyPostTitle>
          <MyInformationWrapper />
          <StMyPostList>
            {myPosts.map((myPost) => {
              return (
                <StMyPost key={myPost.id}>
                  <p>{myPost.email}</p>
                  <p>{myPost.nickname}</p>
                  <p>{myPost.title}</p>
                  <p>{myPost.content}</p>
                </StMyPost>
              );
            })}
          </StMyPostList>
        </StMyPostContainer>
      </StMainContainer>
      <ScrollToTopBtn />
    </StOuterFrame>
  );
}

export default MyPage;

const StOuterFrame = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const StMainContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  min-height: 100vh;
  width: 960px;
  margin: 0 0 100px 0;
`;

const StMyPostContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  min-height: 800px;
`;

const StMyPostTitle = styled.h3`
  align-self: flex-start;
  margin: 10px 10px 0 40px;
  font-size: 1.3rem;
  font-weight: 700;
`;

const StMyPostList = styled.div`
  flex-wrap: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 750px;
  height: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 15px;
  padding: 20px;
  /* background-color: #f2f2f2; */
`;

const StMyPost = styled.div`
  border: 1px solid black;
  display: flex;
  flex-basis: 350px;
  width: 700px;
  min-height: 150px;
  padding: 20px;
`;
