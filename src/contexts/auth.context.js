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

// initialState
const initialState = {
  userInfo: auth.currentUser,
  isLoading: false,
  error: null,
  isProfileUpdatingLoading: false,
  signInWithEmail: (email, password) => {},
  signOutUser: () => {},
  signInWithGithub: () => {},
  signInWithGoogle: () => {},
  signUpByEmail: (email, password, nickname) => {},
  updateProfileBy: async (updatedValue) => {},
  updateProfileByNickname: (nickname) => {},
  updateProfileByProfileImgUrl: (profileImgUrl) => {}
};
// context 생성
export const AuthContext = createContext(initialState);
// Provider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);

  const [isLoading, executeAuth, error] = useAsync();
  const [isProfileUpdatingLoading, setIsProfileUpdatingLoading] =
    useState(false);
  const { alertModal } = useModal();

  const signInWithEmail = async (email, password) =>
    executeAuth(
      'sign in with email',
      () => signInWithEmailAndPassword(auth, email, password),
      { asyncTask: (userCredential) => setUser(userCredential.user) }
    );
  const updateProfileBy = async (updatedValue) => {
    if (!auth.currentUser) {
      return new Promise((_, rej) => {
        rej(new Error('Not valid auth current user'));
      });
    }
    setIsProfileUpdatingLoading(true);
    return updateProfile(auth.currentUser, updatedValue)
      .then(() => {
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
      })
      .finally(() => {
        console.log('[updateProfile] : update Profile processed');
        setIsProfileUpdatingLoading(false);
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
    await updateProfileBy({
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
    isProfileUpdatingLoading,
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
  console.log(email);
  return email ? email.split('@')[0] : '닉네임 변경 바람';
}
