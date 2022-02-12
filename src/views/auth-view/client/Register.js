import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { auth } from "firebase";
import { Alert } from "react-bootstrap";

import { Row, Card, Col, Form, Input, Checkbox, Button } from "antd";

//Icons
import { FaUserAlt, FaFeatherAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import "./Register.css";
import "assets/css/custom-design.css";

function ClientRegister() {
  const { signup, currentUser, localData } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const divStyle = {
    height: "100vh",
    backgroundImage: "url('/img/background/green-wave.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "auto",
  };

  const leftLoginDiv = {
    paddingRight: "20px",
    backgroundImage: "url('/img/others/Videocall_Isometric.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundOrigin: "content-box",
    overflow: "hidden",
  };
  //   const handleSubmit = async (values) => {
  //     console.log(values);
  //   };
  const handleSubmit = async (values) => {
    console.log(error);
    console.log(values);
    if (values.confirm_password !== values.password) {
      return setError("Password do not match");
    }
    try {
      setLoading(true);
      await signup(values.email, values.password).then(() => {
        setTimeout(async () => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User

              const data = {
                email: user.email,
                uuid: user.uid,
                full_name: values.fullname,
              };
              console.log(data);
              axios
                .post("/api/student/register", data)
                .then((res) => {
                  console.log(res.data);
                  console.log(res.data.role);
                  localStorage.setItem("mid", res.data.mid);
                  localStorage.setItem("role", res.data.role);
                  localStorage.setItem("sid", res.data.sid);
                  localStorage.setItem("fullname", data.full_name);
                  localData(res.data.mid, res.data.role);

                  user
                  .updateProfile({
                    displayName: values.fullname,

                  })
                  .then(() => {
                    console.log("Update successful");
                    history.push("/client/home");
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.log("displayName failed");
                  });
                })

            } else {
              // User is signed out
              // ...
            }
          });
        }, 400);
      });
    } catch (e) {
      console.log(e.message);
      setError("Failed to create an account or email already exists");

      setLoading(false);
    }
  };
  return (
    <div style={divStyle}>
      <Row className="h-100" justify="center" align="middle">
        <Card className="register-card">
          <Row gutter={70}>
            <Col span={12} style={leftLoginDiv}></Col>

            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={24}
              sm={24}
              xs={24}
              style={{ height: "auto" }}
            >
              <h2 className="login-card-label">Register</h2>
              <Form layout="horizontal" onFinish={handleSubmit}>
                {" "}
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="form-input-field-style">
                  <Form.Item
                    label={<FaUserAlt />}
                    labelAlign="left"
                    required={false}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input Email!!",
                      },
                    ]}
                  >
                    <Input className="custom-input" placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label={<FaFeatherAlt />}
                    labelAlign="left"
                    required={false}
                    name="fullname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Full Name!!",
                      },
                    ]}
                  >
                    <Input className="custom-input" placeholder="Full Name" />
                  </Form.Item>
                  <Form.Item
                    label={<AiFillLock />}
                    labelAlign="left"
                    required={false}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input password!!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="custom-input"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item
                    label={<AiFillLock />}
                    labelAlign="left"
                    required={false}
                    name="confirm_password"
                    rules={[
                      {
                        required: true,
                        message: "Please type your password again!!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="custom-input"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                </div>
                <Row className="w-100" align="between" justify="center">
                  <Col xxl={14} xl={14} lg={12} md={12} sm={24} xs={24}>
                    <Link to="/client/login" className="register-custom-link">
                      Already have an account?
                    </Link>
                  </Col>
                  <Col xxl={10} xl={10} lg={12} md={12} sm={24} xs={24}>
                    <button className="custom-button-green sm-btn">
                      Sign up
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Row>
    </div>
  );
}

export default ClientRegister;
