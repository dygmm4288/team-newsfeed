import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase.config';

export const createStorageRef = (filePath) => ref(storage, filePath);

export const getDownloadFile = (filePath) => {
  const fileRef = createStorageRef(filePath);
  return getDownloadURL(fileRef);
};
