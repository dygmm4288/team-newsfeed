import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import beatBridge from '../../assets/logo/BeatBridge.png';
import { useAuth } from '../../contexts/auth.context';
import SkeletonCircle from '../common/skeleton/SkeletonCircle';
import SkeletonLine from '../common/skeleton/SkeletonLine';

function Header() {
  const navigate = useNavigate();
  const { userInfo, isProfileUpdatingLoading } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigateToMyPage = useCallback(() => {
    navigate('/my-page');
  }, []);

  const handleNavigateToAuth = useCallback(() => {
    navigate('/auth');
  }, []);

  return (
    <StHeader>
      <StWrapper>
        <Link to="/">
          <img className="logo" src={beatBridge} alt="BeatBridge" />
        </Link>
        {currentPath === '/my-page' ? (
          <button onClick={() => navigate('/')}>Home</button>
        ) : userInfo === null ? (
          <>
            <button onClick={handleNavigateToAuth}>Log in</button>
          </>
        ) : (
          <StIdAndProfilePicture onClick={handleNavigateToMyPage}>
            {isProfileUpdatingLoading && (
              <StSkeletonWrapper>
                <SkeletonLine />
                <SkeletonCircle />
              </StSkeletonWrapper>
            )}
            <p>{userInfo?.nickname}</p>
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
  background-color: #2c2c2c;
  box-shadow: var(--box-shadow);
  * {
    color: white;
  }
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
  .logo {
    width: 200px;
  }
  button {
    background: transparent;
    padding: 3px;
    color: #ff5b22;
    border: none;
    padding: 10px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const StIdAndProfilePicture = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  p {
    font-size: 15px;
  }
  img {
    width: 50px;
    height: 50px;
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
