import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { auth } from "firebase";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { Row, Card, Col, Form, Input, Checkbox, Button, Space } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import "./Login.css";
import "assets/css/custom-design.css";

function ClientLogin() {
  const { login, currentUser, localData, SignInWithGoogleStudent } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  console.log(currentUser?.uid);
  async function loginGoogleUser(e) {
    SignInWithGoogleStudent(history);
  }
  async function handleSubmit(values) {
    console.log(currentUser?.uid);

    try {
      setError("");
      setLoading(true);
      console.log("test");
      await login(values.email, values.password).then(() => {
        setTimeout(async () => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              console.log("user is signed in");
              console.log(user?.uid);
              axios
                .get("/api/student/login/" + user.uid)
                .then((res) => {
                  console.log("resdata:", res.data);
                  console.log( res.data[0].full_name)
                  localStorage.setItem("mid", res.data[0]?.auth_id);
                  localStorage.setItem("role", "Student");
                  localStorage.setItem("sid", res.data[0]?.student);
                  localStorage.setItem("fullname", res.data[0].full_name);
                  localData(res.data[0].uuid, res.data[0]?.role);

                  user
                  .updateProfile({
                    displayName: res.data[0].full_name,
                  })
                  .then(() => {
                    console.log("Update successful");
                    history.push("/client/home");
                  })
                  .catch((error) => {
                    console.log("displayName failed");
                  });
                })
                // .then((_) => {
                //   history.push("/client/home");
                // });
            } else {
              // User is signed out
              // ...
            }
          });
        }, 400);

        // history.push("/");
      });
      console.log("test");
    } catch (err) {
      setError("Email or Password is wrong");
      console.log(err);
    }

    setLoading(false);
  }
  const divStyle = {
    height: "100vh",
    backgroundImage: "url('/img/background/green-wave.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "auto",
  };

  const rightLoginDiv = {
    paddingRight: "20px",
    backgroundImage: "url('/img/others/Online_presentation_Isometric.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundOrigin: "content-box",
    overflow: "hidden",
  };

  return (
    <div style={divStyle}>
      <Row className="h-100" justify="center" align="middle">
        <Card className="login-card">
          <Row gutter={70}>
            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={24}
              sm={24}
              xs={24}
              style={{ height: "auto" }}
            >
              <h2 className="login-card-label">Login</h2>
              <Form layout="horizontal" onFinish={handleSubmit}>
                <div className="form-input-field-style">
                  <Form.Item
                    label={<FaUserAlt />}
                    labelAlign="left"
                    required={false}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input email",
                      },
                    ]}
                  >
                    <Input className="custom-input" placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label={<AiFillLock />}
                    labelAlign="left"
                    required={false}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input password",
                      },
                    ]}
                  >
                    <Input.Password
                      className="custom-input"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                </div>

                <Space className="w-100" direction="vertical">
                  <Row
                    className="w-100"
                    align="between"
                    justify="center"
                    style={{ marginBottom: "15px" }}
                  >
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      {/* <Checkbox className="remember-me-style">
                        Remember me
                      </Checkbox> */}
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                      <button className="custom-button-green sm-btn">
                        Sign in
                      </button>
                    </Col>
                  </Row>
                </Space>
              </Form>{" "}
              <div className="w-100 center-div login-with">
                <Space>
                  <p className="m-0">Login with: </p>
                  <button
                    onClick={(e) => loginGoogleUser(e)}
                    className="custom-button-white"
                  >
                    <FcGoogle />
                  </button>
                </Space>
              </div>{" "}
              <div className="center-div">
                <Link to="/client/register" className="login-custom-link">
                  Create an account
                </Link>
              </div>
            </Col>

            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={0}
              sm={0}
              xs={0}
              style={rightLoginDiv}
            ></Col>
          </Row>
        </Card>
      </Row>
    </div>
  );
}

export default ClientLogin;
