import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

// initialState
const initialState = {
  user: auth.currentUser,
  signInWithEmail: (email, password) => {},
  signOutUser: () => {},
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

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const value = { user, signInWithEmail, error, signOutUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
