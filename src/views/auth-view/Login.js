import React, { useRef, useState } from "react";
import { Card, Form, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { auth } from "firebase";
import { Row, Col, Button, Space } from "antd";
import "assets/css/custom.css";
import Wave from "assets/img/wave.png";
import Bg from "assets/img/bg.svg";
import Avatar from "assets/img/avatar.svg";
import { LoginLink } from "./LoginElement";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, localData, SignInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  console.log(currentUser?.uid);

  async function loginGoogleUser(e) {
    SignInWithGoogle(history);
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(currentUser?.uid);

    try {
      setError("");
      setLoading(true);
      console.log("test");
      await login(emailRef.current.value, passwordRef.current.value).then(
        () => {
          setTimeout(async () => {
            auth.onAuthStateChanged((user) => {
              if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;
                console.log("user is signed in");
                console.log(user?.uid);
                axios
                  .get("http://localhost:5000/admin/login/" + user.uid)
                  .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("mid", res.data[0]?.auth_id);
                    localStorage.setItem("role", res.data[0]?.role);
                    localStorage.setItem("tid", res.data[0]?.teacher);

                    localData(res.data[0].uuid, res.data[0]?.role);
                  })
                  .then((_) => {
                    history.push("/admin/dashboard");
                  });
              } else {
                // User is signed out
                // ...
              }
            });
          }, 400);

          // history.push("/");
        }
      );
      console.log("test");
    } catch (err) {
      setError("Email or Password is wrong");
      console.log(err);
    }

    setLoading(false);
  }
  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });

  return (
    <>
      <img className="wave" src={Wave} />
      <div className="container">
        {" "}
        <div className="img">
          {" "}
          <img src={Bg} />
        </div>
        <div className="login-content">
          {" "}
          <form onSubmit={handleSubmit} className="form-login">
            <img src={Avatar} />
            <h2 className="title">Welcome</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>

              <div className="div">
                <input
                  type="text"
                  ref={emailRef}
                  placeholder="Email"
                  className="input"
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  ref={passwordRef}
                />
              </div>
            </div>
            <div>
              <div className="a-right">
                <LoginLink to="/admin/forgotpassword">
                  Forgot Password?
                </LoginLink>
              </div>
            </div>

            <input
              type="submit"
              disabled={loading}
              className="form-button"
              value="Login"
              style={{marginTop:50}}
            />
            <button
              className="text-center w-100 admin-login-custom-button-style"
              onClick={(e) => loginGoogleUser(e)}
              style={{borderRadius:30, }}
            >
              <Space direction="horizontal" align="middle">
                <FcGoogle style={{marginTop:-2}}/>
                <p className="m-0" style={{fontSize:20, color:"grey"}}>Login with Google</p>
              </Space>
            </button>
            <div className="mt-2 text-center w-100">
              Need an account?{" "}
              <LoginLink to="/admin/signup">Sign up </LoginLink>
            </div>
          </form>{" "}
        </div>
      </div>
    </>
  );
};

export default Login;
