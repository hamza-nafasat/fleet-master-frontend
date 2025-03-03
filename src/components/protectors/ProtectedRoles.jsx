/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoles = ({ isAllowed = false, children, redirect = "/dashboard/home" }) => {
  if (!isAllowed) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoles;
