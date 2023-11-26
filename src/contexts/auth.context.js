import {
  GithubAuthProvider,
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

// initialState
const initialState = {
  userInfo: auth.currentUser,
  isLoading: false,
  error: null,
  signInWithEmail: (email, password) => {},
  signOutUser: () => {},
  signInWithGithub: () => {},
  signUpByEmail: (email, password, nickname) => {}
};
// context 생성
export const AuthContext = createContext(initialState);
// Provider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);

  const [isLoading, executeAuth, error] = useAsync();
  const signInWithEmail = async (email, password) =>
    executeAuth(
      'sign in with email',
      () => signInWithEmailAndPassword(auth, email, password),
      { asyncTask: (userCredential) => setUser(userCredential.user) }
    );
  const updateProfileBy = async (updatedValue) => {
    if (!auth.currentUser)
      return new Promise((_, rej) => {
        rej(new Error('Not valid auth current user'));
      });
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
      });
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

    updateProfileBy(user, {
      displayName: userInputNickname || nickname,
      photoURL: profileImgUrl
    });
  };
  const signInWithGithub = async () =>
    executeAuth(
      'sign in with github',
      () => signInWithPopup(auth, new GithubAuthProvider()),
      {
        asyncTask: setUserProfile()
      }
    );
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
    switch (error.code) {
      case 'auth/invalid-login-credentials':
        return alert('이메일이 존재하지 않습니다.');
      case 'auth/user-not-found' || 'auth/wrong-password':
        return alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
      case 'auth/network-request-failed':
        return alert('네트워크 연결에 실패 하였습니다.');
      case 'auth/internal-error':
        return alert('잘못된 요청입니다.');
      case 'auth/email-already-exists':
        return alert('이메일을 기존 사용자가 이미 사용 중입니다.');
      default:
        return alert('로그인에 실패 하였습니다.');
    }
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
    signUpByEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
function getNicknameWithEmail(email) {
  return email.split('@')[0];
}
