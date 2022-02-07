import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { auth } from "firebase";
import { Row, Col } from "antd";
import "assets/css/custom.css";
import Wave from "assets/img/wave.png";
import Bg from "assets/img/bg6.svg";
import Avatar from "assets/img/avatar.svg";
import { LoginLink } from "./LoginElement";
import axios from "axios";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const fullNameRef = useRef();
  let inputs = document.querySelectorAll(".input");
  const { signup, currentUser, localData } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const user = auth.currentUser;
  // console.log(user);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(error);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        () => {
          setTimeout(async () => {
            await auth.onAuthStateChanged((user) => {
              if (user) {
                const data = {
                  email: user.email,
                  fullName: fullNameRef.current.value,
                  uuid: user.uid,
                };
                user
                  .updateProfile({
                    displayName: fullNameRef.current.value,

                    // photoURL: "https://example.com/jane-q-user/profile.jpg",
                  })
                  .then(() => {
                    // Update successful
                    // ...
                    console.log("Update successful");
                  })
                  .catch((error) => {
                    // An error occurred
                    // ...
                    console.log("displayName failed");
                  });

                console.log(data);
                axios
                  .post("/api/admin/register", data)
                  .then((res) => {
                    console.log(res.data);
                    console.log(res.data.role);
                    localStorage.setItem("mid", res.data.mid);
                    localStorage.setItem("role", res.data.role);
                    localStorage.setItem("tid", res.data.tid);

                    localData(res.data.mid, res.data.role);
                    history.push("/admin/dashboard");
                  })
                  .then((_) => {
                    history.push("/admin/dashboard");
                    setLoading(false);
                  });
              } else {
                // User is signed out
                // ...
              }
            });
          }, 1000);
        }
      );
    } catch (e) {
      console.log(e.message);
      setError("");
      setLoading(false);

      setError("Failed to create an account");
    }
  }

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
                  ref={fullNameRef}
                  placeholder="Full Name"
                  className="input"
                />
              </div>
            </div>{" "}
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
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input"
                  ref={passwordConfirmRef}
                />
              </div>
            </div>
            <input
              type="submit"
              disabled={loading}
              className="form-button"
              value="Sign Up"
            />
            <div className="mt-2 text-center w-100">
              Already have an account{" "}
              <LoginLink to="/admin/login">Login </LoginLink>
            </div>
          </form>{" "}
        </div>
      </div>
    </>
  );
};

export default Login;
