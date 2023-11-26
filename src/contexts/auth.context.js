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

  const [isLoading, executeAuth, error] = useAsync();

  const signInWithEmail = async (email, password) =>
    executeAuth(
      'sign in with email',
      () => signInWithEmailAndPassword(auth, email, password),
      { asyncTask: (userCredential) => setUser(userCredential.user) }
    );

  const signOutUser = () => {
    signOut(auth);
  };
  const signInWithGithub = async () =>
    executeAuth(
      'sign in with github',
      () => signInWithPopup(auth, new GithubAuthProvider()),
      {
        asyncTask: async (userCredential) => {
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
        }
      }
    );

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
