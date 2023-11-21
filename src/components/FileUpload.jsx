import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import styled from 'styled-components';
import { storage } from '../firebase/firebase.config';

function FileUpload({setImgUrl,userId}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleUpload = async () => {
    const imageRef = ref(storage, `profile/${userId}`);
    if(window.confirm("프로필 사진을 변경하시겠습니까?")){
      await uploadBytes(imageRef, selectedFile);
      alert("변경사항이 저장되었습니다.");
      setSelectedFile(""); // input 필드 초기화 안됨
    } else {
      return
    }
    
    // image file URL save
    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);
    setImgUrl(downloadURL);
  };

  return (
    <StImageInputContainer>
      <StImageInput type="file" onChange={handleFileSelect}/>
      <StButton onClick={handleUpload}>변경사항 저장</StButton>
    </StImageInputContainer>
  )
}

export default FileUpload;

const StImageInputContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 10px;
`;

const StImageInput = styled.input`
  cursor: pointer;
`;

const StButton = styled.button`
  cursor: pointer;
`;