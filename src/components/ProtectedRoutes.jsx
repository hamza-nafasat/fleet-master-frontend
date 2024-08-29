/* eslint-disable react/prop-types */
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isLogin = false, children, redirect = "/login", user = false }) => {
  const navigate = useNavigate();
  if (user && !user?.isVerified) {
    return navigate("/verify-email");
    // return <Navigate to={"/verify-email"} />;
  }
  if (!isLogin) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
