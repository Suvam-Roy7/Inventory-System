import React, { useEffect, useState } from "react";
import { signUpFun } from "../services/user-service";
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
  FormFeedback,
} from "reactstrap";

import Base from "../Component/Base";

import bgImage from "../assets/BGImage2.jpg";

import { toast } from "react-toastify";

const SignUp = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    // 🔥 Remove error for that specific field
    setError((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [e.target.name]: null,
      },
    }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    signUpFun(data)
      .then((resp) => {
        console.log(resp);
        console.log("Sucessfully Sign Up");
        toast.success("User Requster Successfully");

        setData({
          username: "",
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

        const res = error.response;

        if (res && res.data) {
          // Validation errors
          if (typeof res.data === "object") {
            setError({
              errors: res.data,
              isError: true,
            });
          }

          // Custom exception message
          else if (typeof res.data === "string") {
            toast.error(res.data);
          }
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <Base>
      <div
        className="className=d-flex justify-content-center pt-5 pb-5"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh)", // adjust if navbar height differs
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card
                className="p-4"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  maxWidth: "450px",
                  margin: "auto",
                }}
              >
                <CardBody>
                  <h3 className="text-center mb-3">Create Account</h3>
                  <p className="text-center text-muted">
                    Please enter your details
                  </p>

                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label>User Name</Label>
                      <Input
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        required
                        invalid={error.errors?.username ? true : false}
                      />
                      <FormFeedback>{error.errors?.username}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        invalid={error.errors?.email ? true : false}
                      />
                      <FormFeedback>{error.errors?.email}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        invalid={error.errors?.password ? true : false}
                      />
                      <FormFeedback>{error.errors?.password}</FormFeedback>
                    </FormGroup>

                    <Button color="dark" block>
                      Sign Up
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

export default SignUp;
