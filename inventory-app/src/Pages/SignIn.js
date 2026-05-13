import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import Base from "../Component/Base";
import bgImage from "../assets/BGImage2.jpg";

import { Link as ReactLink, useNavigate } from "react-router-dom";
import { signInFun } from "../services/user-service";
import { toast } from "react-toastify";
import { doLogin } from "../auth/auth";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    signInFun(data)
      .then((jwtToken) => {
        doLogin(jwtToken, () => {
          console.log("Token Stored in LocalStorage !!");

          navigate("/user/dashboard");
        });

        toast.success("SignIn Success");

        setData({
          email: "",
          password: "",
        });

        // 🔥 CLEAR ERRORS
        setError({
          errors: {},
          isError: false,
        });
      })
      .catch((error) => {
        // Ignore session expiry error
        if (error.response?.status === 401) {
          return;
        }

        console.log(error.response?.data);

        if (error.response?.status === 404) {
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <Base>
      <div
        className="d-flex justify-content-center align-items-start pt-5"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "calc(100vh - 56px)",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <Card
                className="p-3"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  maxWidth: "380px",
                  margin: "auto",
                }}
              >
                <CardBody>
                  <h3 className="text-center mb-3">Login</h3>
                  <p className="text-center text-muted">
                    Enter your credentials
                  </p>

                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <Button color="dark" block>
                      Login
                    </Button>

                    <Button
                      color="secondary"
                      block
                      className="mt-2"
                      tag={ReactLink}
                      to="/signup"
                    >
                      SignUp
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default Login;
