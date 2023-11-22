import React from 'react';
import styled from 'styled-components';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';

function Header() {
  return (
    <StContainer>
      <div>Beat Bridge</div>
      <StIdAndProfilePicture>
        <p>아이디</p>
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
    height: 100px;*/
    object-fit: cover;
    border-radius: 50%;
  }
`;
