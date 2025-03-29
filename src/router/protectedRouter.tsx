import React from "react";
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  // const token = Cookies.get("access_token");
console.log(token)
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  if (token && token === "") {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
