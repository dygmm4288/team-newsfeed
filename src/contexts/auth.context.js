import {
  GithubAuthProvider,
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
  error: null,
  isLoading: false
};
// context 생성
export const AuthContext = createContext(initialState);
// Provider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //! 현재는 테스트를 위해 로그인을 할 때 default 이미지를 넣지만 나중에는 회원가입을 할 때 해당 기능을 수행해야한다.

  const signInWithEmail = (email, password) => {
    setIsLoading(true);
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentialImpl) => {
        setUser(userCredentialImpl.user);
        setDefaultProfileImgUrl(userCredentialImpl.user);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };
  const signOutUser = () => {
    setError(null);
    setIsLoading(true);
    signOut(auth).finally(() => setIsLoading(false));
  };
  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    setError(null);
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setUser(result.user);
        setDefaultProfileImgUrl(result.user);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
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
    return updateProfileBy({ photoURL: await getDefaultProfileImgURL() });
  } catch (err) {
    console.error(
      'error occurred while getting the default profile image url.'
    );
    console.error(err);
  }
}
