import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isLogIn } from "../auth/auth";

const PrivateProductRout = () => {
  if (isLogIn()) {
    return <Outlet />;
  } else {
    return <Navigate to={"/signin"} />;
  }
};

export default PrivateProductRout;
