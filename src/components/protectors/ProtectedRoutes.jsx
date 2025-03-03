/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLogin = false, children, redirect = "/login", user = false }) => {
  if (user && !user?.isVerified) return <Navigate to={"/verify-email"} />;
  if (!isLogin) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
