import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import providers from '../data/oAuths';
import { auth } from '../firebase/firebase.config';
import { getDefaultProfileImgURL } from '../firebase/firebaseStorage';
import useAsync from '../hooks/useAsync';
import useModal from '../hooks/useModal';
import handlerAuthError from './handlerAuthError';

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
      setUser(updatedValue);
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

  // ? 1차 : 원래 코드
  /* const signInWithGithub = signInWith(GithubAuthProvider, 'github');
  const signInWithGoogle = signInWith(GoogleAuthProvider, 'google'); */

  // ? 2차 : 2개 이상이 들어올 경우 providers 데이터만 바꿔주면 바뀔 수 있게끔 수정
  /* const [signInWithGithub, signInWithGoogle] = providers.map(
    ({ provider, name }) => signInWith(provider, name)
  ); */

  // ? 3차 : 분리를 하면서 배열로 값이 들어오는 것 보다는
  // ? 객체로 들어오는 것이 순서 상관 없이 접근할 수 있기 때문에 수정
  const { signInWithGithub, signInWithGoogle } = createSignInWithProvider(
    providers,
    signInWith
  );

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

// ? 4차 원래 auth.context에서 oAuths 파일로 위치를 옮김
// ? 어떤 기대효과 떄문에? 위치를 옮길 필요성을 못느낌 오히려 코드를 읽는데 방해가 될 것 같다
// ? 5차 다시 원래 자리로 돌림 -> 어차피 signInWith이라는 종속성을 가지고 있다고 생각
function createSignInWithProvider(providers, signInWith) {
  return providers.reduce((signInMethods, { provider, name }) => {
    signInMethods[`signInWith${name[0].toUpperCase() + name.slice(1)}`] =
      signInWith(provider, name);

    return signInMethods;
  }, {});
}
