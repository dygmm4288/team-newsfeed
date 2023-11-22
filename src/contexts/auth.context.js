import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

// initialState
const initialState = {
  userInfo: auth.currentUser,
  signInWithEmail: (email, password) => {},
  signOutUser: () => {},
  setUserNickname: (nickname) => {},
  setUserProfileImgUrl: (profileImgUrl) => {},
  signInWithGithub: () => {},
  error: null
};
// context 생성
export const AuthContext = createContext(initialState);
// Provider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState(null);

  const signInWithEmail = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentialImpl) => {
        setUser(userCredentialImpl.user);
      })
      .catch((err) => setError(err));
  };
  const signOutUser = () => {
    setError(null);
    signOut(auth);
  };
  const signInWithGithub = () => {
    const provider = GithubAuthProvider();
    setError(null);
    signInWithRedirect(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  const setUserNickname = (nickname) => {
    return updateProfileBy({ displayName: nickname });
  };
  const setUserProfileImgUrl = (profileImgUrl) => {
    return updateProfileBy({ photoURL: profileImgUrl });
  };
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
    signInWithEmail,
    error,
    signOutUser,
    setUserNickname,
    setUserProfileImgUrl,
    signInWithGithub
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const updateProfileBy = (updatedValue) => {
  if (!auth.currentUser)
    return new Promise((_, rej) => {
      rej(new Error('Not valid auth current user'));
    });
  updateProfile(auth.currentUser, updatedValue)
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
