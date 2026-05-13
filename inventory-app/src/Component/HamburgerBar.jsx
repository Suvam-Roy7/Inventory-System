import React, { useState, useEffect } from "react";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { NavLink as ReactLink } from "react-router-dom";

function HamburgerBar({ sidebarOpen, setSidebarOpen }) {
  // =========================================
  // STATES
  // =========================================

  // Product Category State
  const [productOpen, setProductOpen] = useState(false);

  // Inventory Category State
  const [inventoryOpen, setInventoryOpen] = useState(false);

  // Order Category State
  const [orderOpen, setOrderOpen] = useState(false);

  // =========================================
  // FREEZE BACKGROUND SCROLL
  // =========================================

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
      {/* ========================================= */}
      {/* OVERLAY */}
      {/* ========================================= */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* ========================================= */}
      {/* SIDEBAR */}
      {/* ========================================= */}

      <div
        style={{
          // Fixed Position
          position: "fixed",

          // Below Navbar
          top: "56px",

          // Open/Close Animation
          left: sidebarOpen ? "0" : "-260px",

          // Sidebar Width
          width: "260px",

          // Full Height
          height: "100vh",

          // Dark Theme
          backgroundColor: "#212529",

          // Smooth Transition
          transition: "0.3s",

          // Above Overlay
          zIndex: 1001,

          // Inner Padding
          padding: "15px",

          // Scroll
          overflowY: "auto",

          // Text Color
          color: "white",
        }}
      >
        {/* ========================================= */}
        {/* PRODUCT CATEGORY */}
        {/* ========================================= */}

        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{
            cursor: "pointer",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={() => setProductOpen(!productOpen)}
        >
          <span>Product</span>

          {productOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {/* PRODUCT BUTTONS */}

        {productOpen && (
          <div className="ms-3 mb-3">
            <ReactLink
              to="/product/addproduct"
              className="btn btn-dark w-100 text-start mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              Add Product
            </ReactLink>

            <ReactLink
              to="/product/allproducts"
              className="btn btn-dark w-100 text-start mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              All Products
            </ReactLink>
          </div>
        )}

        {/* ========================================= */}
        {/* INVENTORY CATEGORY */}
        {/* ========================================= */}

        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{
            cursor: "pointer",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={() => setInventoryOpen(!inventoryOpen)}
        >
          <span>Inventory</span>

          {inventoryOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {/* INVENTORY BUTTONS */}

        {inventoryOpen && (
          <div className="ms-3 mb-3">
            <ReactLink
              to="/update-quantity"
              className="btn btn-dark w-100 text-start mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              Update Quantity
            </ReactLink>

            <ReactLink
              to="/view-inventory"
              className="btn btn-dark w-100 text-start"
              onClick={() => setSidebarOpen(false)}
            >
              View Inventory
            </ReactLink>
          </div>
        )}

        {/* ========================================= */}
        {/* ORDER CATEGORY */}
        {/* ========================================= */}

        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{
            cursor: "pointer",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={() => setOrderOpen(!orderOpen)}
        >
          <span>Order</span>

          {orderOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {/* ORDER BUTTONS */}

        {orderOpen && (
          <div className="ms-3 mb-3">
            <ReactLink
              to="/order/placeorder"
              className="btn btn-dark w-100 text-start mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              Place New Order
            </ReactLink>

            <ReactLink
              to="/order/orderhistory"
              className="btn btn-dark w-100 text-start mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              Order History
            </ReactLink>
          </div>
        )}
      </div>
    </>
  );
}

export default HamburgerBar;
