/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { Elements } from "@stripe/react-stripe-js";
import { lazy, Suspense, useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import GlobalLoader from "./components/loader/Loader";
import ProtectedRoute from "./components/ProtectedRoutes";
import NotVerified from "./components/verification/NotVerified";
import { socket, socketEvent, stripeLoad } from "./constants/constants";
import ForgetPassword from "./pages/auth/forget-password/ForgetPassword";
import Otp from "./pages/auth/otp/Otp";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import Dashboard from "./pages/dashboard";
import { adminDashboardDetailsAction } from "./redux/actions/admin.actions";
import { getDeviceDataAction, getMyAllSensorsDataAction } from "./redux/actions/device.actions";
import { getAllNotificationsAction } from "./redux/actions/notification.actions";
import { getMyProfileAction } from "./redux/actions/user.actions";
import { clearUserError, clearUserMessage } from "./redux/slices/user.slice";

const Login = lazy(() => import("./pages/auth/login"));
const Home = lazy(() => import("./pages/dashboard/Home/Home"));
const TruckReport = lazy(() => import("./pages/dashboard/report/truckreport/TruckReport"));
const DailyOperations = lazy(() => import("./pages/dashboard/report/operations/DailyOperations"));
const SOS = lazy(() => import("./pages/dashboard/report/sos/SOS"));
const VideoEvidence = lazy(() => import("./pages/dashboard/report/video/VideoEvidence"));
const AlertType = lazy(() => import("./pages/dashboard/settings/alert/AlertType"));
const Drivers = lazy(() => import("./pages/dashboard/settings/drivers/Drivers"));
const Trucks = lazy(() => import("./pages/dashboard/settings/trucks/Trucks"));
const Devices = lazy(() => import("./pages/dashboard/settings/devices/Devices"));
const Employees = lazy(() => import("./pages/dashboard/settings/employees/Employees"));
const GeoFence = lazy(() => import("./pages/dashboard/dashboardPages/geofence/GeoFence"));
const RealTimeMap = lazy(() => import("./pages/dashboard/dashboardPages/RealTimeMap/RealTimeMap"));
const SubscriptionPlan = lazy(() => import("./pages/dashboard/plans/subscriptionPlan/SubscriptionPlan"));
const SubscriptionHistory = lazy(
  () => import("./pages/dashboard/plans/subscriptionHistory/SubscriptionHistory")
);
const TruckDetail = lazy(() => import("./pages/dashboard/settings/trucks/components/TruckDetail"));
const Notification = lazy(
  () => import("./pages/dashboard/navigation/header/components/NotificationDetail")
);
const Register = lazy(() => import("./pages/auth/register/Register"));
const ConfigurationSettings = lazy(
  () => import("./pages/dashboard/settings/configuration/ConfigurationSettings")
);

function App() {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  // use effect for socket
  // -------------------
  useEffect(() => {
    socket.on("connect", () => {
      // console.log(socket.id);
    });
    socket.on(socketEvent.SENSORS_DATA, (data) => {
      // console.log("trucks data coming from server ", data);
      dispatch(getDeviceDataAction(data));
    });
    socket.on(socketEvent.NOTIFICATIONS, async (data) => {
      // console.log("i am called");
      await dispatch(adminDashboardDetailsAction());
      await dispatch(getAllNotificationsAction());
    });
  }, [dispatch]);
  // use effect for get profile and all notification in first time
  // ------------------------------------------------------------
  useEffect(() => {
    dispatch(getMyProfileAction());
    dispatch(getAllNotificationsAction());
  }, [dispatch]);

  // show message and error
  // ------------------------
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
  }, [message, error, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      // dispatch(getMyAllSensorsDataAction());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Elements stripe={stripeLoad}>
      <Router>
        <Suspense fallback={<GlobalLoader />}>
          <Routes>
            <Route
              element={
                <ProtectedRoute isLogin={user ? false : true} user={user} redirect="/dashboard/home" />
              }
            >
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/verify-otp" element={<Otp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/verify-email"
              element={<NotVerified user={user} isVerified={user?.isVerified} />}
            />
            <Route path="/reset-password/:reset-token" element={<ResetPassword />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route element={<ProtectedRoute user={user} isLogin={user ? true : false} />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="reports/truck-report" element={<TruckReport />} />
                <Route path="reports/operations" element={<DailyOperations />} />
                <Route path="reports/sos" element={<SOS />} />
                <Route path="reports/video" element={<VideoEvidence />} />
                <Route path="setting/alert" element={<AlertType />} />
                <Route path="setting/drivers" element={<Drivers />} />
                <Route path="setting/trucks" element={<Trucks />} />
                <Route path="setting/devices" element={<Devices />} />
                <Route path="setting/employees" element={<Employees />} />
                <Route path="settings/configuration-settings" element={<ConfigurationSettings />} />
                <Route path="real-time-map" element={<RealTimeMap />} />
                <Route path="geofence" element={<GeoFence />} />
                <Route path="plans/subscription-plan" element={<SubscriptionPlan />} />
                <Route path="plans/subscription-history" element={<SubscriptionHistory />} />
                <Route path="truck-detail/:truckId" element={<TruckDetail />} />
                <Route path="notification" element={<Notification />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer autoClose={2000} />
        </Suspense>
      </Router>
    </Elements>
  );
}

export default App;
