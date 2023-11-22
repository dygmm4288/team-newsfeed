import React from 'react';
import styled from 'styled-components';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import { useNavigate } from 'react-router-dom';
import { useAuth, signInWithEmail } from '../../contexts/auth.context';

function Header() {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  return (
    <HeaderOutLine>
      <StContainer>
        <div>Beat Bridge</div>
        <StIdAndProfilePicture onClick={() => navigate('/mypage')}>
          <p>{userInfo?.email}</p>
          <img src={ProfilePicture} alt="ProfilePicture" />
        </StIdAndProfilePicture>
      </StContainer>
    </HeaderOutLine>
  );
}

export default Header;

const HeaderOutLine = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 70px;
  padding: 0 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 5px #464646;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 960px;
  height: 100%;
  /* border: 2px solid black; */

  > div {
    cursor: pointer;
  }
`;

const StIdAndProfilePicture = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  img {
    /* width: 100px;
    height: 100px;*/
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }
`;
