/* eslint-disable react/prop-types */
import { Box, Menu, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotificationItem from "./NotificationItem";

const NotificationContent = ({ notificationOpen, handleNotificationClose }) => {
  return (
    <Menu
      anchorEl={notificationOpen}
      open={Boolean(notificationOpen)}
      onClose={handleNotificationClose}
      PaperProps={{
        sx: {
          width: "300px",
          height: "396px",
          borderRadius: "6px",
          boxShadow: "2px 2px 8px 0px rgba(0, 0, 0, 0.32), -2px 2px 8px 0px rgba(0, 0, 0, 0.32)",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(0, 25, 51, 0.2)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0, 107, 206, 1)",
            borderRadius: "4px",
          },
        },
      }}
    >
      <NotificationInnerContent handleNotificationClose={handleNotificationClose} />
    </Menu>
  );
};
export default NotificationContent;

const NotificationInnerContent = ({ handleNotificationClose }) => {
  const { newNotifications } = useSelector((state) => state.notification);
  return (
    <Box height={"100%"} width={"100%"} sx={{ overflow: "auto" }}>
      <Box
        sx={{
          display: "flex",
          gap: "1.3rem",
          p: 2,
        }}
      >
        <Typography
          sx={{
            width: "100%",
            fontSize: "18px",
            color: "rgba(0, 107, 206, 1)",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Notifications
        </Typography>
      </Box>
      {newNotifications?.map((notification, index) => (
        <NotificationItem
          key={index}
          truckId={notification?.truckId}
          type={notification?.type}
          message={notification?.message}
          createdAt={notification?.createdAt}
          isRead={notification?.isRead}
        />
      ))}
      <Link
        onClick={handleNotificationClose}
        to="notification"
        style={{
          padding: "12px 0",
          textAlign: "center",
          display: "block",
          color: "rgba(0, 107, 206, 1)",
          fontSize: "12px",
          fontWeight: 500,
          p: 2,
          cursor: "pointer",
        }}
      >
        SEE ALL NOTIFICATIONS
      </Link>
    </Box>
  );
};
