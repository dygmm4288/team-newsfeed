import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth.context';
import { Link } from 'react-router-dom';
import SkeletonCircle from '../common/skeleton/SkeletonCircle';
import SkeletonLine from '../common/skeleton/SkeletonLine';

function Header() {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigateToMyPage = useCallback(() => {
    navigate('/mypage');
  }, []);

  const handleNavigateToAuth = useCallback(() => {
    navigate('/auth');
  }, []);

  return (
    <StHeader>
      <StWrapper>
        <Link to="/">
          <h1>Beat Bridge</h1>
        </Link>
        {/*로그인링크 */}
        <Link to ="auth" >
          <button>로그인</button>
        </Link>
        {/* mypage */}
        {currentPath === '/mypage' ? (
          <button onClick={() => navigate('/')}>Go to home</button>
        ) : userInfo === null ? (
          // homepage - login X
          <>
            {/* 어떻게 반영?? */}
            {/* <StSkeletonWrapper>
              <SkeletonLine />
              <SkeletonCircle />
            </StSkeletonWrapper> */}
            <button onClick={handleNavigateToAuth}>Log in</button>
          </>
        ) : (
          // homepage - login O
          <StIdAndProfilePicture onClick={handleNavigateToMyPage}>
            <p>{userInfo?.email}</p>
            <img src={userInfo?.profileImgUrl} alt="profile avatar" />
          </StIdAndProfilePicture>
        )}
      </StWrapper>
    </StHeader>
  );
}

export default Header;

const StHeader = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  box-shadow: var(--box-shadow);
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 960px;
  height: 100%;
  > div {
    cursor: pointer;
  }
`;

const StIdAndProfilePicture = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const StSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
