import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth.context';
function Header() {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  const handleNavigateToMyPage = useCallback(() => {
    navigate('/mypage');
  }, []);
  return (
    <StHeader>
      <StWrapper>
        <Link to="/">
          <h1>Beat Bridge</h1>
        </Link>
        {currentPath === '/mypage' ? (
          <button onClick={() => navigate('/')}>Go to home</button>
        ) : userInfo === null ? (
          <StIdAndProfilePicture onClick={handleNavigateToMyPage}>
            <button>Log in</button>
          </StIdAndProfilePicture>
        ) : (
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
  background-color: #FFFFFF;
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