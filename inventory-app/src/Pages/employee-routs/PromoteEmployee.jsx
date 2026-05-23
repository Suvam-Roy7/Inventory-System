import React, { useEffect, useState } from "react";
import { promoteUser, getRoles } from "../../services/employee-service";
import Base from "../../Component/Base";
import bgImage from "../../assets/employee.jpg";

import { Card, CardBody, Input, Button, Spinner } from "reactstrap";
import { FaUserShield, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const PromoteEmployee = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingRoles, setFetchingRoles] = useState(true);

  useEffect(() => {
    getRoles()
      .then((data) => setRoles(data))
      .catch(() => toast.error("Failed to load roles"))
      .finally(() => setFetchingRoles(false));
  }, []);

  const handlePromote = () => {
    if (!email || !role) {
      toast.warning("Please enter email and select role");
      return;
    }

    setLoading(true);

    promoteUser({ email, role })
      .then(() => {
        toast.success("User promoted successfully 🚀");
        setEmail("");
        setRole("");
      })
      .catch(() => toast.error("Promotion failed"))
      .finally(() => setLoading(false));
  };

  return (
    <Base>
      <div className="promote-wrapper">
        {/* OVERLAY */}
        <div className="overlay" />

        {/* CENTER CONTENT */}
        <div className="center">
          <Card className="glass-card">
            <CardBody>
              <h3 className="title">
                <FaUserShield /> Promote Employee
              </h3>

              <p className="subtitle">Upgrade employee role access instantly</p>

              {/* EMAIL */}
              <div className="input-box">
                <label>Email</label>
                <Input
                  className="custom-input"
                  type="email"
                  placeholder="employee@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* ROLE */}
              <div className="input-box">
                <label>Select Role</label>

                {fetchingRoles ? (
                  <div className="loader">
                    <Spinner size="sm" color="light" />
                  </div>
                ) : (
                  <Input
                    type="select"
                    className="custom-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">-- Select Role --</option>
                    {roles.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </Input>
                )}
              </div>

              {/* BUTTON */}
              <Button
                className="submit-btn"
                onClick={handlePromote}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" /> Processing...
                  </>
                ) : (
                  <>
                    <FaCheckCircle /> Promote User
                  </>
                )}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* STYLE */}
      <style>{`
        .promote-wrapper {
          min-height: 100vh;
          width: 100%;
          background: url(${bgImage}) center/cover no-repeat;
          position: relative;
          overflow: hidden;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px);
        }

        .center {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }

        /* GLASS CARD */
        .glass-card {
          width: 420px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.37);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          color: #fff;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }

        .title {
          text-align: center;
          font-weight: 700;
          margin-bottom: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
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
          margin-bottom: 6px;
          display: block;
          opacity: 0.8;
        }

        .custom-input {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          color: #000000 !important;
          border-radius: 10px;
        }

        .custom-input:focus {
          box-shadow: 0 0 12px #00d4ff !important;
          border-color: #00d4ff !important;
        }

        .loader {
          text-align: center;
          padding: 10px;
        }

        /* BUTTON */
        .submit-btn {
          width: 100%;
          margin-top: 10px;
          border-radius: 12px;
          background: linear-gradient(135deg, #00d4ff, #007bff);
          border: none;
          font-weight: 600;
          transition: 0.3s;
          color: #fff;
        }

        .submit-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(0,212,255,0.4);
        }
      `}</style>
    </Base>
  );
};

export default PromoteEmployee;
