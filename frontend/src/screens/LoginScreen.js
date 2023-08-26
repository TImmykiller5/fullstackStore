import React, { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { Col, Form, Row, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LoginScreen() {
  const Location = useLocation();
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = Location.search ? Location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, user } = userLogin;
  useEffect(() => {
    if (user) {
      Navigate(redirect);
    }
  }, [user, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign IN</h1>
      {error && <message variant='danger'>{error}</message>}
      {loading && <Loader/>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Passord</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Dont't Have An Account ? Click{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Here{" "}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
