import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase.config';

export const createStorageRef = (filePath) => ref(storage, filePath);

export const getDownloadFileURL = (filePath) => {
  const fileRef = createStorageRef(filePath);
  return getDownloadURL(fileRef);
};

export const getDefaultProfileImgURL = (() => {
  const DEFAULT_PROFILE_IMG_PATH = 'profile/default-profile-img2.png';
  let downloadURL = null;

  return () => {
    if (downloadURL) return new Promise((res) => res(downloadURL));
    return getDownloadFileURL(DEFAULT_PROFILE_IMG_PATH);
  };
})();
