import React, { useEffect, useState } from "react";
import Base from "../../Component/Base";
import bgImage from "../../assets/employee.jpg";

import { Input, Button, Spinner } from "reactstrap";
import { FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { editEmployee } from "../../services/employee-service";
import { useLocation, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedEmployee = location.state; // 👈 coming from AllEmployees

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= PREFILL DATA ================= */
  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        username: selectedEmployee.username || "",
        email: selectedEmployee.email || "",
        password: "",
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE ================= */
  const handleUpdate = () => {
    if (!form.username || !form.email) {
      toast.warning("Username and Email are required");
      return;
    }

    setLoading(true);

    editEmployee(selectedEmployee.email, form)
      .then(() => {
        toast.success("Employee updated successfully 🚀");
        navigate("/employees/allemployee"); // go back after success
      })
      .catch(() => toast.error("Update failed"))
      .finally(() => setLoading(false));
  };

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    navigate("/employees/allemployee");
  };

  return (
    <Base>
      <div className="edit-wrapper">
        <div className="overlay" />

        <div className="edit-center">
          <div className="edit-card">
            <h3 className="title">
              <FaUserEdit /> Edit Employee
            </h3>

            {/* USERNAME */}
            <div className="input-box">
              <label>Username</label>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            {/* EMAIL */}
            <div className="input-box">
              <label>Email</label>
              <Input name="email" value={form.email} onChange={handleChange} />
            </div>

            {/* PASSWORD */}
            <div className="input-box">
              <label>New Password (optional)</label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank if not changing"
              />
            </div>

            {/* BUTTONS */}
            <div className="btn-row">
              <Button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </Button>

              <Button
                className="save-btn"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* STYLE */}
      <style>{`
        .edit-wrapper {
          min-height: 100vh;
          width: 100%;
          background: url(${bgImage}) center/cover no-repeat;
          position: relative;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
        }

        .edit-center {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }

        .edit-card {
          width: 420px;
          padding: 25px;
          border-radius: 18px;

          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(18px);

          color: #fff;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
          font-weight: 700;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .input-box {
          margin-bottom: 15px;
        }

        .input-box label {
          font-size: 13px;
          opacity: 0.8;
        }

        input {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          color: #fff !important;
          border-radius: 10px !important;
        }

        input:focus {
          box-shadow: 0 0 10px #00d4ff !important;
          border-color: #00d4ff !important;
        }

        .btn-row {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .cancel-btn {
          flex: 1;
          margin-right: 10px;
          border-radius: 10px;
          background: rgba(255,255,255,0.2);
          border: none;
          color: #fff;
        }

        .save-btn {
          flex: 1;
          border-radius: 10px;
          background: linear-gradient(135deg, #00d4ff, #007bff);
          border: none;
          color: #fff;
        }

        .save-btn:hover {
          box-shadow: 0 0 15px rgba(0,212,255,0.4);
        }
      `}</style>
    </Base>
  );
};

export default EditEmployee;
