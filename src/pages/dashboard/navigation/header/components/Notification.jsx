/* eslint-disable react/prop-types */
import { Box, styled } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import NotificationIcon from "../../../../../assets/svgs/NotifictionIcon";
import { adminDashboardDetailsAction } from "../../../../../redux/actions/admin.actions";
import { getAllNotificationsAction } from "../../../../../redux/actions/notification.actions";
import NotificationContent from "./NotificationContent";

const Notification = ({ length }) => {
  const dispatch = useDispatch();
  const [notificationOpen, setNotificationOpen] = useState(null);

  const handleNotificationOpen = async (e) => {
    setNotificationOpen(e.currentTarget);
    await dispatch(getAllNotificationsAction());
    await dispatch(adminDashboardDetailsAction());
  };

  const handleNotificationClose = async () => {
    setNotificationOpen(null);
  };

  return (
    <>
      <NotificationBox onClick={handleNotificationOpen}>
        <NotificationIcon length={length} />
        {length > 0 && <NotificationNumbers>{length}</NotificationNumbers>}
      </NotificationBox>
      {notificationOpen && (
        <NotificationContent
          notificationOpen={notificationOpen}
          handleNotificationClose={handleNotificationClose}
        />
      )}
    </>
  );
};

export default Notification;

const NotificationBox = styled(Box)({
  // position: "absolute",
  // right: "50px",
  // top: "50px",
  width: "52px",
  cursor: "pointer",
});
const NotificationNumbers = styled(Box)({
  position: "absolute",
  top: "3px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "rgba(253, 75, 46, 1)",
  color: "#fff",
  fontSize: "8px",
  fontWeight: 300,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
