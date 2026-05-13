import NavBar from "./NavBar";

const Base = ({ title = "Welcome to website", children }) => {
  return (
    <div
      className="container-fluid p-0 m-0"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* FIXED HEADER */}
      <NavBar />

      {/* PAGE CONTENT */}
      <div
        style={{
          marginTop: "0px",
          height: "calc(100vh - 70px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {children}

        <h1>THis is Footer</h1>
      </div>
    </div>
  );
};

export default Base;
