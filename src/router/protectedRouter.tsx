import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  if (token && token === "") {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;