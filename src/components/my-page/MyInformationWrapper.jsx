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
        <StMyInformationDetailsContainer>
          <StHiMyNickname>안녕하세요, {nickname}님!</StHiMyNickname>
          <StMyInformationDetailsSmallContainer>
            <StMyEmail>E-mail: {email}</StMyEmail>
            {!isEditing ? (
              <>
                <StMyNickName>닉네임: {nickname}</StMyNickName>
                <StButtonSmallContainer>
                  <StProfileEditButton onClick={handleSignOut}>
                    로그아웃하기
                  </StProfileEditButton>
                  <StProfileEditButton onClick={handleToggleEditMode}>
                    프로필 수정하기
                  </StProfileEditButton>
                </StButtonSmallContainer>
              </>
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
          </StMyInformationDetailsSmallContainer>
        </StMyInformationDetailsContainer>
      </StMyInformation>
    </StMyInformationContainer>
  );
}

const StMyInformationContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 80px;
  height: 200px;
  width: 800px;
  margin-top: 120px;
`;

const StMyInformation = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
`;

const StMyInformationDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid orange;
  padding: 20px;
  min-width: 300px;
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
  width: 250px;
`;

const StMyEmail = styled.p`
  margin: 5px 0 0 0;
  color: #929292;
  font-size: 0.95rem;
`;

const StMyNickName = styled.p`
  margin: 0 0 5px 0;
  font-size: 0.95rem;
  color: #929292;
`;

const StButtonSmallContainer = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  gap: 10px;
`;

const StProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #d9d9d9;
  object-fit: cover;
  border-radius: 50%;
`;

const StHiMyNickname = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 2;
  line-height: 2;
  width: 250px;
  font-weight: 600;
  margin-left: 10px;
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
  width: 80%;
  cursor: pointer;
  margin: 10px 0 10px 0;
`;

const StProfileEditButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
`;
