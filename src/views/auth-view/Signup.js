import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { auth } from "firebase";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser, localData } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        () => {
          setTimeout(async () => {
            auth.onAuthStateChanged((user) => {
              if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User

                const data = {
                  email: user.email,
                  uuid: user.uid,
                };
                console.log(data);
                axios
                  .post("http://localhost:5000/admin/register", data)
                  .then((res) => {
                    console.log(res.data);
                    console.log(res.data.role);
                    localStorage.setItem("mid", res.data.mid);
                    localStorage.setItem("role", res.data.role);
                    localStorage.setItem("tid", res.data.tid);

                    localData(res.data.mid, res.data.role);
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
        }
      );
    } catch (e) {
      console.log(e.message);
      setError("Failed to create an account");
      setError("");
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
                <h2 className="mb-4 text-center">Sign up</h2>
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
                  <Form.Group id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      ref={passwordConfirmRef}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className="mt-2 w-100"
                    type="submit"
                  >
                    {" "}
                    Sign up
                  </Button>
                </Form>
              </Card.Body>
              <div className="mt-2 text-center w-100">
                Already have an account? <Link to="/admin/login">Login </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
