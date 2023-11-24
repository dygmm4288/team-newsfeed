import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth.context';
import { storage } from '../../firebase/firebase.config';

export default function MyPageEditForm({
  nickname,
  email,
  setIsEditing,
  children
}) {
  const [imgInputValue, setImgInputValue] = useState(null);
  const [editedNickname, setEditedNickname] = useState(nickname || '');

  const { setUserProfileImgUrl, setUserNickname } = useAuth();
  const handleFileSelect = (e) => {
    setImgInputValue(e.target.files[0]);
  };
  const handleChangeEditedNickname = (e) => {
    setEditedNickname(e.target.value);
  };

  const handleSaveUpdatedProfile = async (e) => {
    e.preventDefault();
    if (!checkValidation(editedNickname)) return;

    if (imgInputValue) {
      const imageRef = ref(storage, `profile/${email}`);
      try {
        await uploadBytes(imageRef, imgInputValue);
      } catch (e) {
        console.error('error occurred while uploading image to storage', e);
        alert('이미지를 업로드하는데 실패했습니다.');
        return;
      }

      try {
        const downloadURL = await getDownloadURL(imageRef);
        await setUserProfileImgUrl(downloadURL);
      } catch {
        console.error(
          'error occurred while downloading image from storage or setting user profile image url',
          e
        );
        alert('이미지를 변경 하는데 실패했습니다.');
        return;
      }
    }
    try {
      await setUserNickname(editedNickname);
      setIsEditing(false);
      alert('성공적으로 변경되었습니다.');
      return;
    } catch (e) {
      console.error('error occurred while setting user nickname', e);
      alert('사용자 닉네임을 변경하는데 실패했습니다.');
    }
  };

  const checkValidation = (nickname) => {
    if (nickname.length === 0) {
      alert('닉네임을 입력해주세요.');
      return false;
    }
    if (nickname.length > 10) {
      alert('닉네임을 10자 이내로 입력해주세요.');
      return false;
    }
    if (/^\s*$/.test(nickname)) {
      alert('공백만 입력하셨습니다. 다시 입력해주세요.');
      return false;
    }
    return window.confirm('변경사항을 저장하시겠습니까?');
  };

  return (
    <StEditForm onSubmit={handleSaveUpdatedProfile}>
      <span>닉네임: </span>
      <StNicknameEditInput
        value={editedNickname}
        onChange={handleChangeEditedNickname}
      />
      <StImageInputAfterWrapper>
        <StImageInput
          type="file"
          // value={imgInputValue}
          onChange={handleFileSelect}
        />
      </StImageInputAfterWrapper>
      {children}
    </StEditForm>
  );
}

const StEditForm = styled.form`
  color: #929292;
  font-size: 0.95rem;
`;
const StNicknameEditInput = styled.input`
  color: #929292;
  border: 0.5px solid #c8c8c8;
  width: 120px;
  padding-left: 3px;
`;
const StImageInputAfterWrapper = styled.div`
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
