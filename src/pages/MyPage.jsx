import React from 'react';
import styled from 'styled-components';

function MyPage() {
  return (
    <StOuterFrame>
      <StMainContainer>
        {/* Layout(Header) */}
        <div></div>
        <StMyInformationContainer>
          <StProfilePicture />
          <StMyId>아이디 : </StMyId>
          <StButtonContainer>
            <StButton>홈으로 가기</StButton>
            <StButton>프로필 사진 수정</StButton>
          </StButtonContainer>
        </StMyInformationContainer>
        <StMyPostContainer>
          <h3>내가 쓴 글</h3>
          <StMyPostList>
            <StMyPost>포스트 1</StMyPost>
            <StMyPost>포스트 2</StMyPost>
            <StMyPost>포스트 3</StMyPost>
            <StMyPost>포스트 4</StMyPost>
          </StMyPostList>
        </StMyPostContainer>
      </StMainContainer>
    </StOuterFrame>
  );
}

export default MyPage;

const StOuterFrame = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const StMainContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  min-height: 100vh;
  width: 960px;
`;

const StMyInformationContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 80px;
  height: 200px;
  width: 800px;
`;

const StProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  background-color: red;
`;

const StMyId = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 250px;
  height: 50px;
  padding: 10px;
`;

const StButtonContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 150px;
  height: 150px;
`;

const StButton = styled.button``;

const StMyPostContainer = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
`;

const StMyPostList = styled.div`
  border: 1px solid red;
  flex-wrap: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 750px;
  height: 450px;
  overflow-y: scroll;
  margin: 15px;
`;

const StMyPost = styled.div`
  border: 1px solid black;
  display: flex;
  flex-basis: 350px;
  width: 700px;
  min-height: 150px; // min-height  주면 최소 크기 보장
`;
