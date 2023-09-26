import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);
  const [uid, setuid] = useState(null)
  console.log(user, 'user from firebase')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setuid(user?.uid)
      } else {
        setUser(null);
        setuid(null)
      }

      setIsLoading(false);
    });

    return () => {
      listen();
    };
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ signUp, login, logout, googleSignIn, user, uid, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
export function useAuth() {
  return useContext(AuthContext);
}
