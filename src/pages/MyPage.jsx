import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FileUpload from '../components/FileUpload';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {storage} from '../firebase/firebase.config';

const userId = 'hamin';
function MyPage() {
  const navigate = useNavigate();
  const [imgUrl,setImgUrl] = useState('');

  useEffect(async () => {
    const imgRef = ref(storage,`profile/${userId}`);
    const downloadURL = await getDownloadURL(imgRef);
    setImgUrl(downloadURL)
  },[]);

  return (
    <StOuterFrame>
      <StMainContainer>
        {/* Layout(Header) */}
        <div></div>
        <StMyInformationContainer>
          <StProfilePicture src={imgUrl}/>
          <StMyInformation>안녕하세요, {userId}님!<br /> E-mail: <br />Username : </StMyInformation>
          <StButtonContainer>
            <StButton onClick={()=>{navigate(-1)}}>홈으로 가기</StButton>
            <FileUpload setImgUrl={setImgUrl} imgUrl={imgUrl} userId={userId}/>
          </StButtonContainer>
        </StMyInformationContainer>
        <StMyPostContainer>
          <StMyPostTitle>My Post</StMyPostTitle>
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
  object-fit: cover;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

const StMyInformation = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 2.0;
  width: 250px;
  height: 65%;
  padding: 10px;
`;

const StButtonContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
`;

const StButton = styled.button`
  width: 80%;
  cursor: pointer;
  margin: 10px 0 10px 0;
`;

const StMyPostContainer = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
`;

const StMyPostTitle = styled.h3`
  align-self: flex-start;
  margin: 10px 10px 0 30px;
  font-size: 1.3rem;
  font-weight: 700;
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
  min-height: 150px;
`;
