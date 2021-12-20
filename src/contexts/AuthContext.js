import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [loading, setLoading] = useState(true);
  const [localMid, setLocalMid] = useState();
  const [localrole, setLocalRole] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function localData(mid, role) {
    return [setLocalMid(mid), setLocalRole(role)];
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updatePassword(password) {
    return auth.updatePassword(password);
  }
  function logout() {
    localStorage.removeItem("auth_id");
    localStorage.removeItem("role");
    localStorage.removeItem("mid");

    return auth.signOut();
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentuser(user);
      localStorage.setItem("auth_id", user?.uid);

      setLoading(false);
      console.log("test");
    });

    return unsubscribe;
  }, []);

  const value = {
    signup,
    localData,
    localMid,
    currentUser,
    localrole,
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
