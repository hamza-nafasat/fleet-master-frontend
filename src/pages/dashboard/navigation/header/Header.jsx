import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderBgImg from "../../../../assets/images/header-bg-img.png";
import profilePic from "../../../../assets/images/settings/driver-profile.png";
import { getAllNotificationsAction } from "../../../../redux/actions/notification.actions";
import { logoutUserAction } from "../../../../redux/actions/user.actions";
import Notification from "./components/Notification";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newNotificationLength, setNewNotificationLength] = useState(0);
  const location = useLocation();

  let urlArr = location.pathname.split("/");
  let pageTitle = urlArr[urlArr.length - 1].replaceAll("-", " ");

  const goToProfile = () => {
    setDropdownOpen(false); // Close dropdown
    navigate("/dashboard/profile");
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await dispatch(logoutUserAction());
    setDropdownOpen(false);
    navigate("/login");
    setIsLoading(false);
  };

  useEffect(() => {
    if (notifications) {
      const unreadNotifications = notifications?.filter((notification) => !notification?.isRead);
      setNewNotificationLength(unreadNotifications?.length);
    }
  }, [notifications]);

  useEffect(() => {
    if (user && (user?.role == "user" || user?.role == "site-manager")) {
      dispatch(getAllNotificationsAction());
    }
  }, [dispatch, user]);

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${HeaderBgImg})`,
        backgroundSize: "cover",
        padding: "80px 34px",
      }}
    >
      <div className="flex justify-between items-start text-white">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">Fleet Management Transportation</h1>
          {user?.subscriptionId && user.subscriptionId.subscriptionStatus === "trialing" && (
            <p className="mt-2">
              You are on trial mode. Your trial will end on{" "}
              {user?.subscriptionId?.subscriptionEndDate?.split("T")[0]?.split("-").reverse().join("-")}
            </p>
          )}
          <p className="uppercase text-lg md:text-xl font-medium">{pageTitle}</p>
        </div>
        <div className="relative mt-[-30px]">
          {user && (user?.role == "user" || (user && user?.role == "site-manager")) && (
            <div className="h-[25px]">
              <Notification length={newNotificationLength} />
            </div>
          )}
          <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer inline-block">
            <img
              src={user?.image?.url || profilePic}
              alt={user?.firstName}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0  w-36 bg-white rounded-md shadow-lg z-20">
              <ul className="py-1">
                <li
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={goToProfile}
                >
                  My Profile
                </li>
                <li
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
