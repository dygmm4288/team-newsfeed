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

// initialState
const initialState = {
  userInfo: auth.currentUser,
  signInWithEmail: (email, password) => {},
  signOutUser: () => {},
  setUserNickname: (nickname) => {},
  setUserProfileImgUrl: (profileImgUrl) => {},
  signInWithGithub: () => {},
  signUpByEmail: (email, password, nickname) => {},
  error: null
};
// context 생성
export const AuthContext = createContext(initialState);
// Provider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInWithEmail = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (err) {
      setError(err);
      console.error(err);
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const signOutUser = () => {
    setError(null);
    signOut(auth);
  };
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    setIsLoading(true);
    setError(null);
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
      setError(err);
      console.error(err);
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserNickname = async (nickname) => {
    setIsLoading(true);
    await updateProfileBy({ displayName: nickname });
    setIsLoading(false);
  };
  const setUserProfileImgUrl = async (profileImgUrl) => {
    setIsLoading(true);
    await updateProfileBy({ photoURL: profileImgUrl });
    setIsLoading(false);
  };
  const signUpByEmail = async (email, password, nickname) => {
    setIsLoading(true);
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
      setIsLoading(false);
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const updateProfileBy = (updatedValue) => {
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

async function setDefaultProfileImgUrl(user) {
  if (user.photoURL) return;
  try {
    updateProfileBy({ photoURL: await getDefaultProfileImgURL() });
  } catch (err) {
    console.error(
      'error occurred while getting the default profile image url.'
    );
    console.error(err);
  }
}
