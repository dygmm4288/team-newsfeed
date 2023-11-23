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
import { getDefaultProfileImgURL } from '../firebase/firebaseStorage';
import {getDownloadFileURL} from '../firebase/firebaseStorage';


function MyPage() {
  const navigate = useNavigate();
  const [imgUrl,setImgUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileIsFilled, setSelectedFileIsFilled] = useState(false);
  const {userInfo, signInWithEmail,setUserProfileImgUrl,setUserNickname} = useAuth();
  const [editedNickname, setEditedNickname] = useState(userInfo?.nickname); // 초기값: user 정보에서 nickname 가져와야함
  const [myPosts, setMyPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      // 첫번째로 이 컴포넌트가 랜더링을 한다면 사용자 정보를 가지고 오고 프로필을 보여줄 수 있어야 한다.
      // 사용자 정보에는 프로필 이미지 url에 대한 내용이 들어있다.
      // 만약에 어떠한 이유로 프로필 이미지 url이 안들어 있을 경우 default 이미지를 보여주고 싶다. (하고 싶은 것)

      // const userImageURL = await getDownloadFileURL(`profile/${userNickname}`);
      // const defaultUserImageURL = await getDefaultProfileImgURL(`profile/default-profile-img.png`);
      if(!userInfo?.profileImgUrl){
        // 이게 없다라는 것은 일단. storage에 파일이 없다라는 것을 의미하기 때문에 
        // const userImageURL = await getDownloadFileURL(`profile/${userNickname}`); 이 로직은 storage에 파일이 있는 사람이 가져와야하는 로직이다.
        /* const userImageURL = await getDownloadFileURL(`profile/${userNickname}`);
        setSelectedFile(userImageURL);
        setImgUrl(userImageURL); */
        // 어떠한 이유로 프로필 이미지 url이 없는 사용자에 대해서  default 이미지를 보여주기 위해서 storage에 defeault 이미지를 가지고 온다.
          const defaultUserImageURL = await getDefaultProfileImgURL(`profile/default-profile-img.png`);
        // 가지고 온 url을 우리 페이지에서도 보여줘야하고, auth에도 해당 내용을 반영을 해야 한다.
          await setUserProfileImgUrl(defaultUserImageURL);
          setSelectedFile(defaultUserImageURL);
          setImgUrl(defaultUserImageURL);
      } else if(userInfo?.profileImgUrl) { // 반대로 오히려 있다면
        // 해당 url을 기반으로 storage에 접근해서 image 파일을 가져와야 한다.
        setSelectedFile(userInfo.profileImgUrl);
        setImgUrl(userInfo.profileImgUrl);
      }
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

    // 랜더링이 모두 끝난 후, 만약 프로필사진(selectedFile)이 null 이라면 기본 프로필 이미지 URL Set.
  // useEffect(() => {
  //   setSelectedFile(selectedFile);
  //   if(!selectedFile){
  //     getDefaultProfileImgURL().then((url)=> setImgUrl(url));
  //   }
  // },[selectedFile]);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    console.log('내가 선택한 파일',selectedFile); // 여기까지는 잘찍힘
    setSelectedFileIsFilled(true);
  }



  const saveUpdatedProfile = async(e) => {
    const imageRef = ref(storage, `profile/${userInfo.nickname}`);
    e.preventDefault();
    // validation check
    if (userInfo?.nickname.length === 0){
      alert("닉네임을 입력해주세요.");
      return;
    } else if (userInfo?.nickname.length > 10){
      alert("닉네임을 10자 이내로 입력해주세요.");
      return;
    } else if (/^\s*$/.test(userInfo?.nickname)){
      alert("공백만 입력하셨습니다. 다시 입력해주세요.");
    } else {
      if(window.confirm("변경사항을 저장하시겠습니까?")){
        await uploadBytes(imageRef, selectedFile);
        setSelectedFileIsFilled(true);
        setEditedNickname(userInfo?.nickname);
        alert("변경사항이 저장되었습니다.");
        setSelectedFileIsFilled(false);
        setIsEditing(false);
      } else {
        return;
      }
    }
    
    // image file URL save 
    const downloadURL = await getDownloadURL(imageRef);
    await setUserProfileImgUrl(downloadURL);
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
                  <StHiMyNickname>안녕하세요, {userInfo?.nickname}님!</StHiMyNickname>
                  <StMyInformationDetailsSmallContainer>
                    <StMyEmail>E-mail: {userInfo?.email}</StMyEmail>
                    {!isEditing && <><StMyNickName>Nickname: {userInfo?.nickname}</StMyNickName></>}
                    {isEditing && <EditForm onSubmit={saveUpdatedProfile}>
                      닉네임: <NicknameEditInput onChange={typeEditedNickname} value={userInfo?.nickname} />
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
