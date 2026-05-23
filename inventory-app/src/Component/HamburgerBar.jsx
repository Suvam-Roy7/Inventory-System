import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { NavLink as ReactLink } from "react-router-dom";
import "../style/HamburgerBar.css";

function HamburgerBar({ sidebarOpen, setSidebarOpen }) {
  const [productOpen, setProductOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: "75px",
            left: 0,
            width: "100%",
            height: "calc(100vh - 75px)",
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 999,
          }}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: "75px",
          left: sidebarOpen ? "0" : "-260px",
          width: "260px",
          height: "calc(100vh - 75px)",
          backgroundColor: "#111827",
          transition: "0.3s ease",
          zIndex: 1001,
          padding: "15px",
          overflowY: "auto",
          color: "white",
          boxShadow: "4px 0 15px rgba(0,0,0,0.25)",
        }}
      >
        {/* PRODUCT */}
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{
            cursor: "pointer",
            padding: "12px",
            borderRadius: "8px",
            background: productOpen ? "rgba(255,255,255,0.08)" : "transparent",
            transition: "0.2s",
          }}
          onClick={() => setProductOpen(!productOpen)}
        >
          <span className="fw-semibold">Product</span>
          {productOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {productOpen && (
          <div className="ms-2 mb-3">
            <ReactLink
              to="/product/addproduct"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              Add Product
            </ReactLink>

            <ReactLink
              to="/product/allproducts"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              All Products
            </ReactLink>
          </div>
        )}

        {/* INVENTORY */}
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{
            cursor: "pointer",
            padding: "12px",
            borderRadius: "8px",
            background: inventoryOpen
              ? "rgba(255,255,255,0.08)"
              : "transparent",
            transition: "0.2s",
          }}
          onClick={() => setInventoryOpen(!inventoryOpen)}
        >
          <span className="fw-semibold">Inventory</span>
          {inventoryOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {inventoryOpen && (
          <div className="ms-2 mb-3">
            <ReactLink
              to="/inventory/updateproductquantity"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              Update Quantity
            </ReactLink>

            <ReactLink
              to="/inventory/viewinventory"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              View Inventory
            </ReactLink>
          </div>
        )}

        {/* ORDERS */}
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{
            cursor: "pointer",
            padding: "12px",
            borderRadius: "8px",
            background: orderOpen ? "rgba(255,255,255,0.08)" : "transparent",
            transition: "0.2s",
          }}
          onClick={() => setOrderOpen(!orderOpen)}
        >
          <span className="fw-semibold">Orders</span>
          {orderOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {orderOpen && (
          <div className="ms-2 mb-3">
            <ReactLink
              to="/order/placeorder"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              Place New Order
            </ReactLink>

            <ReactLink
              to="/order/orderhistory"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              Order History
            </ReactLink>
          </div>
        )}

        {/* EMPLOYEES */}
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{
            cursor: "pointer",
            padding: "12px",
            borderRadius: "8px",
            background: employeeOpen ? "rgba(255,255,255,0.08)" : "transparent",
            transition: "0.2s",
          }}
          onClick={() => setEmployeeOpen(!employeeOpen)}
        >
          <span className="fw-semibold">Employees</span>
          {employeeOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {employeeOpen && (
          <div className="ms-2 mb-3">
            <ReactLink
              to="/employees/addemployee"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              Add Employee
            </ReactLink>

            <ReactLink
              to="/employees/allemployee"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              All Employees
            </ReactLink>

            <ReactLink
              to="/employees/promoteemployee"
              className="sidebar-link w-100"
              onClick={() => setSidebarOpen(false)}
            >
              Promote Employee
            </ReactLink>
          </div>
        )}
      </div>
    </>
  );
}

export default HamburgerBar;
