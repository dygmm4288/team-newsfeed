import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import FileUpload from '../components/FileUpload';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {storage} from '../firebase/firebase.config';
import Header from '../components/Layout/Header';
// import SettingButton from '../components/SettingButton';
import { useAuth } from '../contexts/auth.context';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import ScrollToTopBtn from '../components/Layout/ScrollToTopBtn';

const userNickname = 'hamin';

function MyPage() {
  const navigate = useNavigate();
  const [imgUrl,setImgUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileIsFilled, setSelectedFileIsFilled] = useState(false);
  const [editedNickname, setEditedNickname] = useState(userNickname); // 초기값: user 정보에서 nickname 가져와야함
  const {userInfo, signInWithEmail} = useAuth();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        fetchedPosts.push(doc.data());
      });
      setMyPosts(fetchedPosts);
    };
    fetchData();
  }, []);

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
    // 글자수 검사: 닉네임 10자.
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
                  <StMyInformationDetailsSmallContainer>
                    <StMyEmail>E-mail: {userInfo?.email}</StMyEmail>
                    {!isEditing && <><StMyNickName>Nickname: {editedNickname}</StMyNickName></>}
                    {isEditing && <EditForm onSubmit={saveUpdatedProfile}>
                      닉네임: <NicknameEditInput onChange={typeEditedNickname} value={editedNickname} />
                      <StImageInputAfterContainer>
                        <StImageInput type="file" onChange={handleFileSelect} />
                      </StImageInputAfterContainer> 
                    </EditForm>}
                  </StMyInformationDetailsSmallContainer>
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
            {/* 닉네임으로 필터링하기 -> 조건부랜더링(리스트가 없을때, 있을 때->map) */}
            {myPosts.map((myPost)=>{
              return(
                <StMyPost>
                  <p>{myPost.email}</p>
                  <p>{myPost.nickname}</p>
                  <p>{myPost.title}</p>
                  <p>{myPost.content}</p>
                </StMyPost>
              );
            })}
          </StMyPostList>
        </StMyPostContainer>
      </StMainContainer>
      <ScrollToTopBtn />
    </StOuterFrame>
  );
}

export default MyPage;

const StOuterFrame = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const StMainContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  min-height: 100vh;
  width: 960px;
  margin: 0 0 100px 0;
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

const NicknameEditInput = styled.input`
  color: #929292;
  border: 0.5px solid #c8c8c8;
  width: 120px;
  padding-left: 3px;
`;

const EditForm = styled.form`
  color: #929292;
  font-size: 0.95rem;
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
  line-height: 2.0;
  line-height: 2.0;
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


const StMyPostContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  min-height: 800px;
`;

const StMyPostTitle = styled.h3`
  align-self: flex-start;
  margin: 10px 10px 0 40px;
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
  height: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 15px;
  padding: 20px;
`;

const StMyPost = styled.div`
  border: 1px solid black;
  display: flex;
  flex-basis: 350px;
  width: 700px;
  min-height: 150px;
  padding: 20px;
`;

const StImageInputAfterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 5px;
  color: gray;
`;

const StImageInput = styled.input`
  cursor: pointer;
  width: 100%;
`;


const StProfileEditButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
`;
