import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { getDefaultProfileImgURL } from '../firebase/firebaseStorage';
import useAsync from '../hooks/useAsync';
import useModal from '../hooks/useModal';
import getErrorContent from '../lib/handlerAuthError';

const initialState = {
  userInfo: auth.currentUser,
  isLoading: false,
  error: null,
  signInWithEmail: (email, password) => {},
  signOutUser: () => {},
  signInWithGithub: () => {},
  signInWithGoogle: () => {},
  signUpByEmail: (email, password, nickname) => {},
  updateProfileBy: (updatedValue) => {},
  updateProfileByNickname: (nickname) => {},
  updateProfileByProfileImgUrl: (profileImgUrl) => {}
};
export const AuthContext = createContext(initialState);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);

  const [isLoading, executeAuth, error] = useAsync();

  const { alertModal } = useModal();

  const signInWithEmail = async (email, password) =>
    executeAuth(
      'sign in with email',
      () => signInWithEmailAndPassword(auth, email, password),
      { asyncTask: (userCredential) => setUser(userCredential.user) }
    );
  const updateProfileBy = (updatedValue) => {
    if (!auth.currentUser) {
      throw new Error('No user is signed in');
    }
    let prevUser = { ...user };
    updateProfile(auth.currentUser, {
      displayName: updatedValue.nickname,
      photoURL: updatedValue.profileImgUrl
    })
      .then(() => {
        setUser((prevUser) => ({ ...prevUser, ...updatedValue }));
        console.log(
          '[updateProfile] : Update Profile Success, update value is : ',
          updatedValue
        );
      })
      .catch((err) => {
        console.error(
          '[Error updateProfile] : Update Profile Fail, err is : ',
          err
        );
        setUser(prevUser);
      })
      .finally(() => {
        console.log('[updateProfile] : update Profile processed');
      });
  };
  const updateProfileByNickname = (nickname) => {
    return updateProfileBy({ displayName: nickname });
  };
  const updateProfileByProfileImgUrl = (nickname) => {
    return updateProfileBy({ photoURL: nickname });
  };
  const signOutUser = () => {
    signOut(auth);
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
    executeAuth(
      'sign in with ' + providerName,
      () => signInWithPopup(auth, new provider()),
      {
        asyncTask: setUserProfile()
      }
    );
  const signInWithGithub = signInWith(GithubAuthProvider, 'github');
  const signInWithGoogle = signInWith(GoogleAuthProvider, 'google');

  const signUpByEmail = async (email, password, nickname) =>
    executeAuth(
      'sign up with email',
      () => createUserWithEmailAndPassword(auth, email, password),
      {
        asyncTask: setUserProfile(nickname)
      }
    );

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (!error) return;
    alertModal({
      name: '오류',
      content: getErrorContent(error.code),
      errorContent: error.code
    });
  }, [error]);

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
    error,
    signOutUser,
    signInWithGithub,
    signInWithGoogle,
    signUpByEmail,
    updateProfileBy,
    updateProfileByNickname,
    updateProfileByProfileImgUrl
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
function getNicknameWithEmail(email) {
  return email ? email.split('@')[0] : '닉네임 변경 바람';
}
