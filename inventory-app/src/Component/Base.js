import NavBar from "./NavBar";

const Base = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f3f4f6",
      }}
    >
      {/* ================= HEADER ================= */}
      <div
        style={{
          background: "#111827",
          borderBottom: "0px solid #111827",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          zIndex: 1000,
        }}
      >
        <NavBar />
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div
        className="main-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* PAGE CONTENT */}
        <div>{children}</div>

        {/* ================= FOOTER ================= */}
        <footer
          style={{
            background: "#111827",
            color: "#d1d5db",
            padding: "18px 30px",
            borderTop: "1px solid #374151",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            {/* LEFT */}
            <div>
              <h5
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                Inventory Management System
              </h5>

              <small style={{ color: "#9ca3af" }}>
                Manage products, inventory, and orders efficiently
              </small>
            </div>

            {/* CENTER */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                fontSize: "14px",
                color: "#d1d5db",
              }}
            >
              <span>📦 Product Management</span>
              <span>📊 Live Inventory</span>
              <span>🛒 Order Tracking</span>
            </div>

            {/* RIGHT */}
            <div
              style={{
                textAlign: "right",
                fontSize: "13px",
                color: "#9ca3af",
              }}
            >
              <div>© 2026 Inventory System</div>
              <div>Built with React + Spring Boot</div>
            </div>
          </div>
        </footer>
      </div>

      {/* ================= GLOBAL SCROLLBAR ================= */}
      <style>
        {`
          html,
          body,
          #root {
            margin: 0;
            padding: 0;
            height: 100%;
          }

          .main-scroll::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }

          .main-scroll::-webkit-scrollbar-track {
            background: #e5e7eb;
          }

          .main-scroll::-webkit-scrollbar-thumb {
            background: #6b7280;
          }

          .main-scroll::-webkit-scrollbar-thumb:hover {
            background: #374151;
          }
        `}
      </style>
    </div>
  );
};

export default Base;
