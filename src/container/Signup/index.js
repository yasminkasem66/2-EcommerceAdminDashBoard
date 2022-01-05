import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/actions";


export default function Signup() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    // const [error, setError] = useState('');

  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    if (auth.authenticate) {
      navigate("/");
    }
  }, [auth.authenticate]);

  if (user.loading) {
    return <p> Loading......</p>
  }

  const userSignUp = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password }
    dispatch(signUp(user))
  }
  return (
    <>
      <Layout>
        <Container>
          {user.msg && <span className=" alert alert-danger mx-auto d-block text-center">{user.msg} </span >}
          <Row style={{ marginTop: "5rem" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignUp}>
                <Row>
                  <Col md={6}>
                    <Input
                      Label="First Name"
                      placeholder="First Name"
                      type="text"
                      value={firstName}
                      onChange={(e) => {setfirstName(e.target.value)}}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      Label="Last Name"
                      placeholder="Last Name"
                      type="text"
                      value={lastName}
                      onChange={(e) => { setlastName(e.target.value) }}
                    />
                  </Col>
                </Row>

                <Input
                  Label="Email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <Input
                  Label="Password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}

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
