import React, { useState } from "react";
import { addEmployee } from "../../services/employee-service";
import bgImage from "../../assets/employee.jpg";

import {
  Card,
  CardBody,
  Input,
  Button,
  Spinner,
  InputGroup,
  InputGroupText,
} from "reactstrap";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import Base from "../../Component/Base";

const AddEmployee = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.warning("All fields are required");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (form.password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);

    addEmployee({
      username: form.username,
      email: form.email,
      password: form.password,
    })
      .then(() => {
        toast.success("Employee created successfully 🚀");
        setForm({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch(() => toast.error("Failed to create employee"))
      .finally(() => setLoading(false));
  };

  return (
    <Base>
      <div className="add-emp-wrapper">
        {/* DARK OVERLAY */}
        <div className="overlay" />

        {/* CARD */}
        <Card className="glass-card">
          <CardBody>
            <h3 className="title">Create Employee</h3>
            <p className="subtitle">Add new team member to system</p>

            {/* USERNAME */}
            <div className="input-box">
              <label>Username</label>
              <InputGroup className="custom-input">
                <InputGroupText>
                  <FaUser />
                </InputGroupText>
                <Input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </InputGroup>
            </div>

            {/* EMAIL */}
            <div className="input-box">
              <label>Email</label>
              <InputGroup className="custom-input">
                <InputGroupText>
                  <FaEnvelope />
                </InputGroupText>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                />
              </InputGroup>
            </div>

            {/* PASSWORD */}
            <div className="input-box">
              <label>Password</label>
              <InputGroup className="custom-input">
                <InputGroupText>
                  <FaLock />
                </InputGroupText>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </InputGroup>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-box">
              <label>Confirm Password</label>
              <InputGroup className="custom-input">
                <InputGroupText>
                  <FaLock />
                </InputGroupText>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                />
                <Button
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </div>

            {/* BUTTON */}
            <Button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Create Employee"}
            </Button>
          </CardBody>
        </Card>

        {/* STYLES */}
        <style>{`
        .add-emp-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background: url(${bgImage}) center/cover no-repeat;
          overflow: hidden;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px);
        }

        .glass-card {
            width: 420px;
            padding: 10px;
            border-radius: 20px;

            /* 👇 more transparent + premium glass look */
            background: rgba(255, 255, 255, 0.37);

            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);

            border: 1px solid rgba(255, 255, 255, 0.15);

            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

            color: #fff;
            z-index: 2;
        }

        .title {
          text-align: center;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .subtitle {
          text-align: center;
          font-size: 12px;
          opacity: 0.7;
          margin-bottom: 20px;
        }

        .input-box {
          margin-bottom: 15px;
        }

        .input-box label {
          font-size: 13px;
          margin-bottom: 5px;
          display: block;
          opacity: 0.8;
        }

        .custom-input input {
          background: rgba(255,255,255,0.08);
          border: none;
          color: #fff;
        }

        .custom-input input:focus {
          box-shadow: 0 0 10px #00d4ff;
          border: none;
        }

        .custom-input .input-group-text {
          background: rgba(255,255,255,0.1);
          border: none;
          color: #00d4ff;
        }

        .toggle-btn {
          background: transparent;
          border: none;
          color: #00d4ff;
        }

        .submit-btn {
          width: 100%;
          margin-top: 10px;
          border-radius: 12px;
          background: linear-gradient(135deg, #00d4ff, #007bff);
          border: none;
          font-weight: 600;
          transition: 0.3s;
        }

        .submit-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(0,212,255,0.5);
        }
      `}</style>
      </div>
    </Base>
  );
};

export default AddEmployee;
