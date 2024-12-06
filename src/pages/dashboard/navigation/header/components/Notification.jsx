/* eslint-disable react/prop-types */
import { Box, styled } from "@mui/material";
import { useState } from "react";
import NotificationIcon from "../../../../../assets/svgs/NotifictionIcon";
import NotificationContent from "./NotificationContent";

const Notification = ({ length }) => {
  const [notificationOpen, setNotificationOpen] = useState(null);
  const handleNotificationOpen = async (e) => setNotificationOpen(e.currentTarget);
  const handleNotificationClose = async () => setNotificationOpen(null);

  return (
    <>
      <NotificationBox onClick={handleNotificationOpen}>
        <NotificationIcon length={length} />
        {length > 0 && <NotificationNumbers>{length}</NotificationNumbers>}
      </NotificationBox>
      {notificationOpen && (
        <NotificationContent notificationOpen={notificationOpen} handleNotificationClose={handleNotificationClose} />
      )}
    </>
  );
};

export default Notification;

const NotificationBox = styled(Box)({
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
