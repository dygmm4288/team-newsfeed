import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import ScrollToTopBtn from '../components/Layout/ScrollToTopBtn';
import { useAuth } from '../contexts/auth.context';
import { db, storage } from '../firebase/firebase.config';
import { getDefaultProfileImgURL } from '../firebase/firebaseStorage';
import { collection, getDocs } from 'firebase/firestore';

function MyPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileIsFilled, setSelectedFileIsFilled] = useState(false);
  const { userInfo, signInWithEmail, setUserProfileImgUrl, setUserNickname } = useAuth();

  const [editedNickname, setEditedNickname] = useState(userInfo?.nickname);
  const [imgUrl, setImgUrl] = useState(userInfo?.profileImgUrl || '');
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      // 유저정보가 없을 때
      if (!userInfo) {
        console.error('not user');
        return;
      }
      // 유저정보가 있는데 그 중 이미지 데이터가 없을 때, 기본 디폴트 이미지로 세팅
      if (!userInfo.profileImgUrl) {
        console.log('user in');
        const defaultUserImageURL = await getDefaultProfileImgURL(
          `profile/default-profile-img.png`
        );
        await setUserProfileImgUrl(defaultUserImageURL);
        setImgUrl(defaultUserImageURL);
      }

      // 게시물 불러오기
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        fetchedPosts.push(doc.data());
      });
      setMyPosts(fetchedPosts);
    };
    fetchData();
  }, [userInfo]);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
  }

  function validationCheck() {
    if (editedNickname.length === 0) {
      alert('닉네임을 입력해주세요.');
      return false;
    }
    if (editedNickname.length > 10) {
      alert('닉네임을 10자 이내로 입력해주세요.');
      return false;
    }
    if (/^\s*$/.test(editedNickname)) {
      alert('공백만 입력하셨습니다. 다시 입력해주세요.');
      return false;
    }
    return window.confirm('변경사항을 저장하시겠습니까?');
  }

  const saveUpdatedProfile = async (e) => {
    e.preventDefault();

    //  새 이미지가 선택되었는지 확인
    const isNewImageSelected = selectedFile !== null;

    //  유효성을 통과하지 않는다면 여기서 끝내버려라
    if (!validationCheck()) return;

    // const imageRef = ref(storage, `profile/${editedNickname}`);
    const imageRef = ref(storage, `profile/${userInfo?.email}`);

    // Storage에  upload를 함
    try {
      // 새 이미지가 선택된 경우에만 storage에 업로드
      if(isNewImageSelected) {
        await uploadBytes(imageRef, selectedFile);
      }
    } catch (e) {
      console.error('error occurred while uploading image to storage', e);
      alert('이미지를 업로드하는데 실패했습니다.');
      return;
    }

    // Storage에 있는 이미지를 auth에 반영을 시켜야 한다. 그러기 위해서 우선 URL을 가져온다
    try {
      // 새 이미지가 선택된 경우에만 download URL을 가져와서 프로필 사진 업데이트
      if(isNewImageSelected){
        const downloadURL = await getDownloadURL(imageRef);
        await setUserProfileImgUrl(downloadURL); // 반영이 바로 안됨 // 여기는 firebase auth
        setImgUrl(downloadURL); // 여기는 홈페이지 랜더링
      }
    } catch (e) {
      console.error(
        'error occurred while downloading image from storage or setting user profile image url',e);
      alert('이미지를 변경 하는데 실패했습니다.');
      return;
    }

    // 편집된 닉네임 업데이트 및 편집 모드 종료
    setEditedNickname(editedNickname);
    setIsEditing(false);
    alert('변경사항이 저장되었습니다.');
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
                  <StHiMyNickname>안녕하세요, {isEditing ? userInfo?.nickname : editedNickname}님!</StHiMyNickname>
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
  /* background-color: #f2f2f2; */
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
