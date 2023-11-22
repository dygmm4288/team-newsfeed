import React from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebase.config';
import { useState } from 'react';
import { styled } from 'styled-components';

function SettingButton(setImgUrl,userId,isEditing,setIsEditing,selectedFile,setSelectedFile,selectedFileIsFilled,setSelectedFileIsFilled) {

  const handleUpload = async () => {
    const imageRef = ref(storage, `profile/${userId}`);
    if(window.confirm("프로필 사진을 변경하시겠습니까?")){
      await uploadBytes(imageRef, selectedFile);
      setSelectedFileIsFilled(true);
      alert("변경사항이 저장되었습니다.");
      setSelectedFileIsFilled(false);
    } else {
      return
    }
    
    // image file URL save 
    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);
    setImgUrl(downloadURL);
  };

  return (
    <>
    {selectedFileIsFilled === false ?
        (<StProfileEditButton onClick={()=> setIsEditing(true)}>프로필 사진<br />수정하기</StProfileEditButton>)
      // (<StProfileEditButton onClick={()=> {setSelectedFileIsFilled(true), setIsEditing(true)}}>프로필 사진<br />수정하기</StProfileEditButton>)
    : (<StImageInputAfterContainer>
        <StButton onClick={()=>setSelectedFileIsFilled(false)}>취소하기</StButton>
        <StButton onClick={handleUpload}>변경사항 저장</StButton>
      </StImageInputAfterContainer>
      )
    }

  </>
  )
}

export default SettingButton

const StImageInputAfterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const StProfileEditButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StButton = styled.button`
  cursor: pointer;
  width: 100%;
`;