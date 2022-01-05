import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    // const [error, setError] = useState('');

  const auth = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };

  useEffect(() => {
    if (auth.authenticate) {
       navigate("/");
    }
  }, [auth.authenticate]);

  return (
    <>
      <Layout>
        <Container >
          <Row style={{ marginTop: "5rem" }} >
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  Label="Email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  Label="Password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}
