/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedSubscriber = ({ children, redirect = "/dashboard/home", user = false }) => {
    if (!user.subscriptionId) return <Navigate to={redirect} />;
    return children ? children : <Outlet />;
};

export default ProtectedSubscriber;
