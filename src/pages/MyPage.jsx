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
    if (!userInfo) {
      alert('잘못된 접근입니다.');
      navigate('/');
      return;
    }
  }, [userInfo]);

  const myPosts = posts.filter(
    (post) => post.userInfo.email === userInfo?.email
  );

  function checkEmpty(value) {
    return !value.length;
  }

  return (
    <StOuterFrame>
      <StMainContainer>
        <MyInformationWrapper />
        <StMyPostContainer>
          <StMyPostsTitle>My Post</StMyPostsTitle>
          <StMyPostList>
            {checkEmpty(myPosts) ? (
              <StNoMyPosts onClick={() => navigate('/')}>
                <p>등록되어 있는 나의 Beat가 없습니다.</p>
                <p>⚡ 나의 첫 Beat를 Beat Up 해보세요! ⚡</p>
              </StNoMyPosts>
            ) : (
              myPosts.map((myPost) => {
                return (
                  <StMyPost key={myPost.id}>
                    <p>{myPost.email}</p>
                    <p>{myPost.nickname}</p>
                    <StMyPostTitle>{myPost.title}</StMyPostTitle>
                    <StMyPostContent>
                      {myPost.content.split('\n').map((line) => {
                        return (
                          <>
                            {line}
                            <br />
                          </>
                        );
                      })}
                    </StMyPostContent>
                  </StMyPost>
                );
              })
            )}
          </StMyPostList>
        </StMyPostContainer>
      </StMainContainer>
      <ScrollToTopBtn />
    </StOuterFrame>
  );
}

export default MyPage;

const StOuterFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const StMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  min-height: 100vh;
  width: 960px;
  margin: 70px 0 100px 0;
`;

const StMyPostContainer = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  min-height: 800px;
  background-color: #2c2c2c;
  border-radius: 5px;
`;

const StMyPostsTitle = styled.h3`
  align-self: flex-start;
  margin: 10px 10px 10px 40px;
  font-size: 1.3rem;
  font-weight: 900;
  margin-left: 60px;
  color: white;
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
  &::-webkit-scrollbar {
    background-color: #646464;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #737373;
  }
`;

const StMyPost = styled.div`
  display: flex;
  width: 680px;
  min-height: 190px;
  padding: 3px 30px 0;
  background-color: #f2f2f2;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  line-height: 1.2;
`;

const StMyPostTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 900px;
`;

const StMyPostContent = styled.p`
  font-size: 1rem;
  color: #646464;
`;

const StNoMyPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 15px;
  color: #ff5b22;
  background-color: #161616;
  width: 670px;
  height: 100px;
  cursor: pointer;
  transition: 0.15s ease;
  &:hover {
    transform: scale(1.02);
    background-color: #ff5b22;
    color: white;
  }
`;
