import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import FileUpload from '../components/FileUpload';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {storage} from '../firebase/firebase.config';
import Header from '../components/Layout/Header';
// import SettingButton from '../components/SettingButton';
import { useAuth } from '../contexts/auth.context';

const userNickname = 'hamin';

function MyPage() {
  const navigate = useNavigate();
  const [imgUrl,setImgUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileIsFilled, setSelectedFileIsFilled] = useState(false);
  const [editedNickname, setEditedNickname] = useState(userNickname); // 초기값: user 정보에서 nickname 가져와야함
  const {userInfo, signInWithEmail} = useAuth();


  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    console.log('내가 선택한 파일',selectedFile); // 여기까지는 잘찍힘
    setSelectedFileIsFilled(true);
  }

  useEffect(() => {
    setSelectedFile(selectedFile);
  },[selectedFile]); // ??


  const saveUpdatedProfile = async(e) => {
    const imageRef = ref(storage, `profile/${userNickname}`);
    e.preventDefault();
    // validation check
    // 글자수 검사: 닉네임 10자
    //여기에 selectFile를 어떻게 넣지?
    if (editedNickname.length === 0){
      alert("닉네임을 입력해주세요.");
      return;
    } else if (editedNickname.length > 10){
      alert("닉네임을 10자 이내로 입력해주세요.");
      return;
    } else if (/^\s*$/.test(editedNickname)){
      alert("공백만 입력하셨습니다. 다시 입력해주세요.");
    } else {
      if(window.confirm("변경사항을 저장하시겠습니까?")){
        await uploadBytes(imageRef, selectedFile);
        console.log('selectedFile!!',selectedFile); //null 이 나옴
        setSelectedFileIsFilled(true);
        setEditedNickname(editedNickname);
        alert("변경사항이 저장되었습니다.");
        setSelectedFileIsFilled(false);
        setIsEditing(false);
      } else {
        return;
      }
    }
    
    // image file URL save 
    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);
    setImgUrl(downloadURL);
  };

  const typeEditedNickname = (event) => {
    setEditedNickname(event.target.value);
  }

  const goEditMode = () => {
    setIsEditing(true);
  }

  return (
    <StOuterFrame>
      <StMainContainer>
        <Header />
          <StMyInformationContainer>
            <StProfilePicture src={imgUrl}/>
            {console.log('imgUrl', imgUrl)}
            <StMyInformation>
                <StMyInformationDetailsContainer>
                  <StHiMyNickname>안녕하세요, {editedNickname}님!</StHiMyNickname>
                  <StMyEmail>E-mail: {userInfo?.email}</StMyEmail>
                  {/* 닉네임: <StMyNickName>니크네임</StMyNickName> */}
                  {!isEditing && <>닉네임: <StMyNickName>{editedNickname}</StMyNickName></>}
                  {isEditing && <form onSubmit={saveUpdatedProfile}>
                    닉네임: <input onChange={typeEditedNickname} value={editedNickname} />
                    <StImageInputAfterContainer>
                      <StImageInput type="file" onChange={handleFileSelect} />
                    </StImageInputAfterContainer> 
                    
                  </form>}
                </StMyInformationDetailsContainer>
                <StButtonContainer>
                  {!isEditing && (<StProfileEditButton onClick={goEditMode}>프로필 수정하기</StProfileEditButton>)}
                  {isEditing && (<StButtonSmallContainer>
                  <StButton onClick={()=>setIsEditing(false)}>취소하기</StButton>
                  <StButton onClick={saveUpdatedProfile}>변경사항 저장</StButton>
                </StButtonSmallContainer>)}
                </StButtonContainer>
            </StMyInformation>
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

const StMyInformation = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
`;

const StMyInformationDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid orange;
`;

const StMyEmail = styled.p`
  color: purple;
`;

const StMyNickName = styled.p`
   color: green;
`;

const StButtonSmallContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  gap: 10px;
`;

const StProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

const StHiMyNickname = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 2.0;
  width: 250px;
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

const StImageInputAfterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  border: 5px solid pink;
`;

const StImageInput = styled.input`
  cursor: pointer;
  width: 100%;
`;


const StProfileEditButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
`;

