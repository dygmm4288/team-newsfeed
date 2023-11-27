import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth.context';
import MyPageEditForm from './MyPageEditForm';

export default function MyInformationWrapper() {
  const { userInfo, signOutUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  if (!userInfo) return;

  const { email, nickname, profileImgUrl } = userInfo;

  const handleSignOut = async () => {
    await signOutUser();
    navigate('/');
  };
  const handleToggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };
  return (
    <StMyInformationContainer>
      <StProfilePicture src={profileImgUrl} />
      <StMyInformation>
        <StHiMyNickname>안녕하세요, {nickname} 님!</StHiMyNickname>
        {!isEditing ? (
          <StMyInformationDetailsContainer>
            <StMyInformationDetailsSmallContainer>
              <StMyEmail>E-mail:&nbsp;{email}</StMyEmail>
              <StMyNickName>닉네임:&nbsp;{nickname}</StMyNickName>
            </StMyInformationDetailsSmallContainer>
            <StButtonSmallContainer>
              <StProfileEditButton onClick={handleSignOut}>
                로그아웃
              </StProfileEditButton>
              <StProfileEditButton onClick={handleToggleEditMode}>
                프로필 수정
              </StProfileEditButton>
            </StButtonSmallContainer>
          </StMyInformationDetailsContainer>
        ) : (
          <MyPageEditForm
            nickname={nickname}
            email={email}
            setIsEditing={setIsEditing}
          >
            <StButtonSmallContainer>
              <StButton onClick={handleToggleEditMode}>취소하기</StButton>
              <StButton type="submit">변경사항 저장</StButton>
            </StButtonSmallContainer>
          </MyPageEditForm>
        )}
      </StMyInformation>
    </StMyInformationContainer>
  );
}

const StMyInformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 0px;
  height: 200px;
  width: 800px;
  margin-top: 50px;
  padding-left: 30px;
  padding-right: 40px;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

const StMyInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  height: 165px;
  width: 452px;
`;

const StMyInformationDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px 20px 20px;
  min-width: 452px;
  height: 120px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const StMyInformationDetailsSmallContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 8px 8px 8px 15px;
  min-height: 90px;
  width: 270px;
`;

const StMyEmail = styled.p`
  margin: 5px 0 0 0;
  color: #2c2c2c;
  font-size: 0.85rem;
`;

const StMyNickName = styled.p`
  margin: 0 0 5px 0;
  color: #2c2c2c;
  font-size: 0.85rem;
`;

const StButtonSmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 130px;
  gap: 1px;
`;

const StProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #ffffff;
  object-fit: cover;
  border-radius: 50%;
`;

const StHiMyNickname = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  line-height: 2;
  line-height: 2;
  width: 250px;
  font-weight: 600;
  margin-left: 30px;
  height: 80px;
`;

const StButtonContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 165px;
`;

const StButton = styled.button`
  width: 100px;
  height: 25px;
  cursor: pointer;
  margin: 10px 0 10px 0;
  font-size: 0.75rem;
  background-color: #2c2c2c;
  color: white;
  border: none;
  transition: 0.2s ease;
  &:hover {
    background-color: #ff5b22;
    transform: scale(1.02);
  }
`;

const StProfileEditButton = styled.button`
  width: 100px;
  height: 25px;
  cursor: pointer;
  margin: 10px 0 10px 0;
  font-size: 0.75rem;
  background-color: #2c2c2c;
  border: none;
  color: white;
  transition: 0.2s ease;
  &:hover {
    background-color: #ff5b22;
    transform: scale(1.02);
  }
`;
