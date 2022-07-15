import React, { useContext, useState, useEffect } from "react";
import { message } from "antd";
import { auth } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import Axios from "axios";
const provider = new GoogleAuthProvider();
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [loading, setLoading] = useState(true);
  const [localMid, setLocalMid] = useState();
  const [localrole, setLocalRole] = useState();

  const warningAdmin = () => {
    message.warning("This is account is a Teacher");
  };
  const warningStudent = () => {
    message.warning("This is account is a Student");
  };
  async function SignInWithGoogle(history) {
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const avatar = user.photoURL;

        Axios.post("/api/admin/google-login", { user }).then((response) => {
          const currentUserUUID = response.data;

          Axios.get("/api/admin/login/" + currentUserUUID)
            .then((res) => {
              localStorage.setItem("mid", res.data[0]?.auth_id);
              localStorage.setItem("role", res.data[0]?.role);
              localStorage.setItem("tid", res.data[0]?.teacher);
              localStorage.setItem("avatar", avatar);
              localStorage.setItem("fullname", res.data[0]?.full_name);
              localData(res.data[0].uuid, res.data[0]?.role);
              if (res.data[0]?.role != "Admin") warningStudent();
            })
            .then((_) => {
              history.push("/admin/dashboard");
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function SignInWithGoogleStudent(history) {
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;

        Axios.post("/api/student/google-login", {
          user,
        }).then((response) => {
          const currentUserUUID = response.data;

          Axios.get("/api/admin/login/" + currentUserUUID)
            .then((res) => {
              localStorage.setItem("mid", res.data[0]?.auth_id);
              localStorage.setItem("role", res.data[0]?.role);
              localStorage.setItem("sid", res.data[0]?.student);
              localStorage.setItem("fullname", res.data[0]?.full_name);
              localData(res.data[0].uuid, res.data[0]?.role);
              if (res.data[0]?.role != "Student") warningAdmin();
            })
            .then((_) => {
              history.push("/client/home");
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
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

  function updateProfile(profile) {
    return currentUser.updateProfile(profile);
  }
  function logout() {
    localStorage.removeItem("auth_id");
    localStorage.removeItem("role");
    localStorage.removeItem("mid");
    localStorage.removeItem("tid");
    localStorage.removeItem("avatar");
    localStorage.removeItem("sid");
    localStorage.removeItem("fullname");
    return auth.signOut();
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentuser(user);
      localStorage.setItem("auth_id", user?.uid);

      setLoading(false);
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
    updateProfile,
    SignInWithGoogle,
    SignInWithGoogleStudent,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
