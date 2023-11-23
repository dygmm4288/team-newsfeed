import React from 'react';
import styled from 'styled-components';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import { useAuth } from '../../contexts/auth.context';
import { Link } from 'react-router-dom';

function Header() {
  const {userInfo} = useAuth();
  return (
    
    <StContainer>
      <div>Beat Bridge</div>
      <stSignUp>
        <Link to ="auth" >
          <button>로그인</button>
        </Link>
      </stSignUp>
      <StIdAndProfilePicture>
        <p>{userInfo?.nickname}</p>
        <img src={ProfilePicture} alt="ProfilePicture" />
      </StIdAndProfilePicture>
    </StContainer>

  );
}

export default Header;

const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 2px solid black;
`;

const StIdAndProfilePicture = styled.div`
  display: flex;
  align-items: center;
  img {
    /* width: 100px;
    height: 100px; */
    object-fit: cover;
    border-radius: 50%;
  }
`;

const stSignUp = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px; 
  object-fit: cover;
  border-radius: 50%;
`