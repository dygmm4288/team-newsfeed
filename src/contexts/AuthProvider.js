import {
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { getDefaultProfileImgURL } from '../firebase/firebaseStorage';
import useAsync from '../hooks/useAsync';
import { AuthContext, setDefaultProfileImgUrl, updateProfileBy } from './auth.context';

// Provider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);

  const [isLoading, executeAuth, error] = useAsync();

  const signInWithEmail = async (email, password) => {
    executeAuth(
      'sing in with email',
      () => signInWithEmailAndPassword(auth, email, password),
      { asyncTask: (userCredential) => setUser(userCredential.user) }
    );
  };
  const signOutUser = () => {
    signOut(auth);
  };
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      setUser(user);
      if (!userCredential.photoURL) {
        await setDefaultProfileImgUrl(user);
      }
      if (!userCredential.displayName) {
        const emailNickname = user.email.split('@')[0];
        await updateProfileBy({
          displayName: emailNickname
        });
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
    }
  };

  const setUserNickname = async (nickname) => {
    await updateProfileBy({ displayName: nickname });
  };
  const setUserProfileImgUrl = async (profileImgUrl) => {
    await updateProfileBy({ photoURL: profileImgUrl });
  };
  const signUpByEmail = async (email, password, nickname) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      let profileImgUrl = user.photoURL;
      if (!profileImgUrl) profileImgUrl = await getDefaultProfileImgURL();

      await updateProfile(user, {
        displayName: nickname,
        photoURL: profileImgUrl
      });
      return true;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    } finally {
    }
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
    signInWithGithub,
    signUpByEmail
  };

  return <AuthContext.Provider value={value}>{children}
    <button onClick=></button></AuthContext.Provider >;
};
