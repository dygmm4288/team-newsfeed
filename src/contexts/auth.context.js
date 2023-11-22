import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

// initialState
const initialState = {
  user: auth.currentUser,
  signInWithEmail: (email, password) => {},
  signOutUser: () => {},
  setUserNickname: (nickname) => {},
  setUserProfileImgUrl: (profileImgUrl) => {},
  error: null
};
// context 생성
export const AuthContext = createContext(initialState);
// Provider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState(null);

  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentialImpl) => {
        setUser(userCredentialImpl.user);
      })
      .catch((err) => setError(err));
  };
  const signOutUser = () => {
    signOut(auth);
  };

  const setUserNickname = (nickname) => {
    updateProfileBy({ displayName: nickname });
  };
  const setUserProfileImgUrl = (profileImgUrl) => {
    updateProfile({ photoURL: profileImgUrl });
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
    setUserProfileImgUrl
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const updateProfileBy = (updatedValue) => {
  if (!auth.currentUser) return;
  updateProfile(auth.currentUser, updatedValue)
    .then(() => {
      console.log('update success');
    })
    .catch((err) => {
      console.error('update failed');
      console.error(err);
    })
    .finally(() => {
      console.log('update logic progressed');
    });
};
