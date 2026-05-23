import React, { useEffect, useState } from "react";
import {
  getAllEmployee,
  deleteEmployee,
  editEmployee,
} from "../../services/employee-service";
import bgImage from "../../assets/employee.jpg";
import Base from "../../Component/Base";

import { Card, CardBody, Badge, Spinner, Input } from "reactstrap";

import { FaUser, FaEnvelope, FaIdBadge, FaTrash, FaEdit } from "react-icons/fa";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployee()
      .then((data) => setEmployees(data))
      .finally(() => setLoading(false));
  }, []);

  /* ================= DELETE ================= */
  const openDeleteModal = (emp) => {
    setSelectedEmployee(emp);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedEmployee) return;

    const { email, userid } = selectedEmployee;

    setDeletingId(userid);

    deleteEmployee(email)
      .then(() => {
        toast.success("Employee deleted successfully");

        setEmployees((prev) => prev.filter((emp) => emp.email !== email));
      })
      .catch(() => toast.error("Failed to delete employee"))
      .finally(() => {
        setDeletingId(null);
        setShowDeleteModal(false);
        setSelectedEmployee(null);
      });
  };

  /* ================= EDIT NAV ================= */
  const handleEdit = (emp) => {
    navigate("/employees/editemployee", {
      state: emp, // send employee data
    });
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.username?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Base>
      <div className="emp-wrapper">
        <div className="overlay" />

        <div className="content">
          <h2 className="title">Employee Directory</h2>

          {/* SEARCH */}
          <div className="search-box">
            <Input
              className="search-input"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="loader">
              <Spinner color="light" />
            </div>
          ) : (
            <div className="container">
              <div className="row">
                {filteredEmployees.length === 0 ? (
                  <p className="no-data">No employees found</p>
                ) : (
                  filteredEmployees.map((emp) => (
                    <div className="col-md-4 mb-4" key={emp.userid}>
                      <Card className="glass-card emp-card">
                        <CardBody className="emp-card-body">
                          <div>
                            <h5 className="emp-name">
                              <FaUser /> {emp.username}
                            </h5>

                            <p className="emp-info">
                              <FaEnvelope /> {emp.email}
                            </p>

                            <p className="emp-info">
                              <FaIdBadge /> ID: {emp.userid}
                            </p>
                          </div>

                          <Badge className="role-badge">{emp.role}</Badge>

                          {/* ACTION BUTTONS */}
                          <div className="action-box">
                            {/* EDIT */}
                            <button
                              className="icon-btn edit-btn"
                              onClick={() => handleEdit(emp)}
                            >
                              <FaEdit />
                            </button>

                            {/* DELETE */}
                            <button
                              className="icon-btn delete-btn"
                              onClick={() => openDeleteModal(emp)}
                              disabled={deletingId === emp.userid}
                            >
                              {deletingId === emp.userid ? (
                                <Spinner size="sm" />
                              ) : (
                                <FaTrash />
                              )}
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>⚠️ Confirm Delete</h4>

            <p>
              Are you sure you want to delete{" "}
              <b>{selectedEmployee?.username}</b>?
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button className="confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STYLE ================= */}
      <style>{`
        .emp-wrapper {
          min-height: 100vh;
          width: 100%;
          background: url(${bgImage}) center/cover no-repeat;
          position: relative;
          padding: 30px;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px);
        }

        .content {
          position: relative;
          z-index: 2;
        }

        .title {
          text-align: center;
          color: #fff;
          font-weight: 700;
          margin-bottom: 20px;
        }

        /* SEARCH */
        .search-box {
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
        }

        .search-input {
          width: 400px;
          border-radius: 12px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
        }

        .search-input:focus {
          box-shadow: 0 0 12px #00d4ff;
          border: 1px solid #00d4ff;
        }

        /* CARD */
        .glass-card {
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(16px);
          color: #fff;
        }

        .emp-card {
          position: relative;
        }

        .emp-card-body {
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .emp-name {
          display: flex;
          gap: 8px;
          align-items: center;
          font-weight: 600;
        }

        .emp-info {
          display: flex;
          gap: 8px;
          opacity: 0.85;
          font-size: 14px;
        }

        /* ROLE */
        .role-badge {
          align-self: flex-start;
          padding: 5px 10px;
          border-radius: 20px;
          background: linear-gradient(135deg, #00d4ff, #007bff);
          font-size: 11px;
        }

        /* ACTION BUTTONS */
        .action-box {
          position: absolute;
          bottom: 12px;
          right: 12px;

          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.25s;
          color: #fff;
        }

        /* EDIT BUTTON */
        .edit-btn {
          background: rgba(6, 174, 96, 0.9);
        }

        .edit-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 12px rgba(63, 212, 13, 0.84);
        }

        /* DELETE BUTTON */
        .delete-btn {
          background: #ff1f1f;
        }

        .delete-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 12px rgba(255,0,0,0.6);
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal-box {
          width: 350px;
          padding: 20px;
          border-radius: 18px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          text-align: center;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .cancel-btn {
          flex: 1;
          margin-right: 10px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.2);
          color: #fff;
        }

        .confirm-btn {
          flex: 1;
          border-radius: 10px;
          border: none;
          background: #ff1f1f;
          color: #fff;
        }
      `}</style>
    </Base>
  );
};

export default AllEmployees;
