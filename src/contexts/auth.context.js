import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { getDefaultProfileImgURL } from '../firebase/firebaseStorage';
import useAsync from '../hooks/useAsync';
import useModal from '../hooks/useModal';
import handlerAuthError from '../lib/handlerAuthError';

const initialState = {
  userInfo: auth.currentUser,
  isLoading: false,
  signInWithEmail: (email, password) => {},
  signOut: () => {},
  signInWithGithub: () => {},
  signInWithGoogle: () => {},
  signUpByEmail: (email, password, nickname) => {},
  updateProfileBy: (updatedValue) => {}
};
export const AuthContext = createContext(initialState);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);

  const { alertModal } = useModal();
  // 에러를 처리하는 다른 방법. 공통된 내용을 하나의 에러 핸들러로 등록하여 관리한다.
  const [isLoading, runAuth] = useAsync({
    handleError: (error) => {
      alertModal({
        name: '오류',
        content: handlerAuthError(error.code),
        errorContent: error.code
      });
    }
  });

  const signInWithEmail = async (email, password) =>
    runAuth('sign in with email', {
      asyncAction: () => signInWithEmailAndPassword(auth, email, password),
      onSuccess: (userCredential) => setUser(userCredential.user)
    });

  const signOut = () => {
    firebaseSignOut(auth);
  };

  const updateProfileBy = async (updatedValue) => {
    if (!user) {
      throw new Error('No user is signed in');
    }
    try {
      await updateProfile(auth.currentUser, {
        displayName: updatedValue.nickname,
        photoURL: updatedValue.profileImgUrl
      });
      setUser((prevUser) => ({ ...prevUser, ...updatedValue }));
    } catch (error) {
      console.error(
        '[Error updateProfile] : Update Profile Fail, err is : ',
        error
      );
    }
  };

  const setUserProfile = (userInputNickname) => async (userCredential) => {
    const user = userCredential.user;
    let { displayName, photoURL } = user;

    let profileImgUrl = photoURL;
    let nickname = displayName;

    if (!profileImgUrl) profileImgUrl = await getDefaultProfileImgURL();
    if (!displayName) nickname = getNicknameWithEmail(user.email);
    updateProfileBy({
      displayName: userInputNickname || nickname,
      photoURL: profileImgUrl
    });
  };

  const signInWith = (provider, providerName) => async () =>
    runAuth('sign in with ' + providerName, {
      asyncAction: () => signInWithPopup(auth, new provider()),
      onSuccess: setUserProfile()
    });

  const signInWithGithub = signInWith(GithubAuthProvider, 'github');
  const signInWithGoogle = signInWith(GoogleAuthProvider, 'google');

  const signUpByEmail = async (email, password, nickname) =>
    runAuth('sign up with email', {
      asyncAction: () => createUserWithEmailAndPassword(auth, email, password),
      onSuccess: setUserProfile(nickname)
    });

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const userInfo = user
    ? {
        nickname: user.displayName,
        email: user.email,
        profileImgUrl: user.photoURL
      }
    : null;

  const value = {
    userInfo,
    isLoading,
    signInWithEmail,
    signOut,
    signInWithGithub,
    signInWithGoogle,
    signUpByEmail,
    updateProfileBy
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
function getNicknameWithEmail(email) {
  return email ? email.split('@')[0] : '닉네임 변경 바람';
}
