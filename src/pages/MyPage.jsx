import React from 'react'
import styled from 'styled-components';

function MyPage() {
  return (
    <OuterFrame>
      {/* Layout(Header) */}
      <div> 
      </div>
      <MyInformationBox>
        <ProfilePicture />
        <MyId>
          아이디 : 
        </MyId>
        <ButtonBox>
          <Button>홈으로 가기</Button>
          <Button>프로필 사진 수정</Button>
        </ButtonBox>
      </MyInformationBox>
      <MyPostBox>
        <h3>내가 쓴 글</h3>
        <MyPostList>
          <MyPost>
            포스트 1
          </MyPost>
        </MyPostList>
      </MyPostBox>
    </OuterFrame>
  )
}

export default MyPage

const  OuterFrame = styled.div`
 border: 1px solid red;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 gap: 50px;
`;

const MyInformationBox = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 200px;
  width: 800px;
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  background-color: red;
`;

const  MyId = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 250px;
  height: 50px;
`;

const ButtonBox = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 150px;
  height: 150px;
`;

const Button = styled.button`

`;

const MyPostBox = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
`;

const MyPostList = styled.div`
  border: 1px solid black;
`;

const MyPost = styled.div`
  border: 1px solid black;
`;

