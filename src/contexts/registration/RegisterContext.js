import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/compact/app";
import { auth } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function logout() {
    return firebase.auth().signOut();
  }
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentuser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    signup,
    currentUser,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
