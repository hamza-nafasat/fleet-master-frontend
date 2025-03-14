/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import { Elements } from "@stripe/react-stripe-js";
import { lazy, Suspense, useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import GlobalLoader from "./components/loader/Loader";
import ProtectedRoute from "./components/protectors/ProtectedRoutes";
import NotVerified from "./components/verification/NotVerified";
import { socket, socketEvent, stripeLoad } from "./constants/constants";
import ForgetPassword from "./pages/auth/forget-password/ForgetPassword";
import Otp from "./pages/auth/otp/Otp";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import Dashboard from "./pages/dashboard";
import { adminDashboardDetailsAction } from "./redux/actions/admin.actions";
import { getDeviceDataAction, getMyAllSensorsDataAction } from "./redux/actions/device.actions";
import { getAllNotificationsAction, getNewNotificationsAction } from "./redux/actions/notification.actions";
import { getMyProfileAction } from "./redux/actions/user.actions";
import { clearUserError, clearUserMessage } from "./redux/slices/user.slice";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import ProtectedSubscriber from "./components/protectors/ProtectedSubscriber";
import ProtectedRoles from "./components/protectors/ProtectedRoles";

const Login = lazy(() => import("./pages/auth/login"));
const Home = lazy(() => import("./pages/dashboard/Home/Home"));
const TruckReport = lazy(() => import("./pages/dashboard/report/truckreport/TruckReport"));
const DevicesReport = lazy(() => import("./pages/dashboard/report/deivces/DevicesReport"));
const DriversReport = lazy(() => import("./pages/dashboard/report/drivers/DriversReport"));
const NotificationsReport = lazy(() => import("./pages/dashboard/report/alerts/NotificationsReport"));
const VideoEvidence = lazy(() => import("./pages/dashboard/report/video/VideoEvidence"));
const AlertType = lazy(() => import("./pages/dashboard/settings/alert/index"));
const Drivers = lazy(() => import("./pages/dashboard/settings/drivers/Drivers"));
const Trucks = lazy(() => import("./pages/dashboard/settings/trucks/Trucks"));
const Devices = lazy(() => import("./pages/dashboard/settings/devices/Devices"));
const Employees = lazy(() => import("./pages/dashboard/settings/employees/Employees"));
const GeoFence = lazy(() => import("./pages/dashboard/dashboardPages/geofence/GeoFence"));
const RealTimeMap = lazy(() => import("./pages/dashboard/dashboardPages/RealTimeMap/RealTimeMap"));
const SubscriptionPlan = lazy(() => import("./pages/dashboard/plans/subscriptionPlan/SubscriptionPlan"));
const SubscriptionHistory = lazy(() => import("./pages/dashboard/plans/subscriptionHistory/SubscriptionHistory"));
const TruckDetail = lazy(() => import("./pages/dashboard/settings/trucks/components/TruckDetail"));
const Notification = lazy(() => import("./pages/dashboard/navigation/header/components/NotificationDetail"));
const Register = lazy(() => import("./pages/auth/register/Register"));
const ConfigurationSettings = lazy(() => import("./pages/dashboard/settings/configuration/ConfigurationSettings"));
const MyProfile = lazy(() => import("./pages/dashboard/navigation/Profile"));

// Admin Routes
const AdminDashboard = lazy(() => import("./admin/layout/index"));
const AdminHome = lazy(() => import("./admin/pages/home/Home"));
const AdminUsers = lazy(() => import("./admin/pages/users/Users"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);
  // const [isSiteAdmin, setIsSiteAdmin] = useState(false);
  // const [isOperator, setIsOperator] = useState(false);
  // const [isUser, setIsUser] = useState(false);
  // const [isPaymentManager, setIsPaymentManager] = useState(false);

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
      if (user && (user?.role == "user" || user?.role == "site-admin")) {
        await Promise.all([
          dispatch(getAllNotificationsAction(false, false, false, 1, 10, "true")),
          dispatch(getNewNotificationsAction()),
          dispatch(adminDashboardDetailsAction()),
        ]);
      }
    });
  }, [dispatch, user]);
  // use effect for get profile and all notification in first time
  // ------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getMyProfileAction());
      } catch (error) {
        console.log("Error occurred while getting my profile First time", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);
  useEffect(() => {
    if (user && (user?.role == "user" || user?.role == "site-admin")) {
      dispatch(getNewNotificationsAction());
    }
  }, [dispatch, user]);

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

  // useEffect(() => {
  //   if (user?.role) {
  //     if (user.role == "payment-manager") setIsPaymentManager(true);
  //     if (user.role == "site-admin") setIsSiteAdmin(true);
  //     if (user.role == "operator") setIsOperator(true);
  //     if (user.role == "user") setIsUser(true);
  //   }
  // }, [user?.role]);

  useEffect(() => {
    let interval;
    if (user?.interval) {
      interval = setInterval(
        () => {
          // dispatch(getMyAllSensorsDataAction());
        },
        Number(user?.interval || 180) * 1000
      );
    }
    return () => clearInterval(interval);
  }, [dispatch, user?.interval]);

  return isLoading ? (
    <GlobalLoader />
  ) : (
    <Elements stripe={stripeLoad}>
      <Router>
        <Suspense fallback={<GlobalLoader />}>
          <ScrollToTop />
          <Routes>
            <Route element={<ProtectedRoute isLogin={user ? false : true} user={user} redirect="/dashboard/home" />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/verify-otp" element={<Otp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/verify-email" element={<NotVerified user={user} isVerified={user?.isVerified} />} />
            <Route path="/reset-password/:reset-token" element={<ResetPassword />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route element={<ProtectedRoute user={user} isLogin={user ? true : false} />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<MyProfile />} />
                {/* ONLY SUBSCRIBER ROUTES  */}
                <Route element={<ProtectedSubscriber user={user} redirect="/dashboard/home" />}>
                  <Route path="truck-report" element={<TruckReport />} />
                  <Route path="devices-report" element={<DevicesReport />} />
                  <Route path="drivers-report" element={<DriversReport />} />
                  <Route path="notifications-report" element={<NotificationsReport />} />
                  <Route path="reports/video" element={<VideoEvidence />} />
                  <Route path="employees" element={<Employees />} />
                  <Route path="configuration-settings" element={<ConfigurationSettings />} />
                  <Route path="geofence" element={<GeoFence />} />
                </Route>
                <Route path="alerts" element={<AlertType />} />
                <Route path="drivers" element={<Drivers />} />
                <Route path="trucks" element={<Trucks />} />
                <Route path="devices" element={<Devices />} />
                <Route path="real-time-map" element={<RealTimeMap />} />
                <Route path="subscription-plan" element={<SubscriptionPlan />} />
                <Route path="subscription-history" element={<SubscriptionHistory />} />
                <Route path="truck-detail/:truckId" element={<TruckDetail />} />
                <Route path="notification" element={<Notification />} />
              </Route>
            </Route>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
          <ToastContainer autoClose={2000} />
        </Suspense>
      </Router>
    </Elements>
  );
}

export default App;
