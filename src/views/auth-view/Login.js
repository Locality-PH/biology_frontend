import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { auth } from "firebase";

import axios from "axios";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, localData } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  console.log(currentUser?.uid);
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
      setError("Failed to log in");
      console.log(err);
    }

    setLoading(false);
  }
  return (
    <div>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div>
            <Card>
              <Card.Body>
                <h2 className="mb-4 text-center">Login In</h2>
                {/* {JSON.stringify(currentUser)} */}

                <Form onSubmit={handleSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      ref={emailRef}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      ref={passwordRef}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    disabled={loading}
                    className="mt-2 w-100"
                    type="submit"
                  >
                    {" "}
                    Login
                  </Button>
                </Form>
              </Card.Body>
              <div className="mt-2 mb-2 text-center w-100">
                <Link to="/forgot-password">Forgot Password</Link>
              </div>
            </Card>
            <div className="mt-2 text-center w-100">
              Need an account? <Link to="/admin/signup">Sign up </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
