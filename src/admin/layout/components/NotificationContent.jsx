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
          height: 'auto',
          maxHeight: "396px",
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
  const { notifications } = useSelector((state) => state.notification);
  return (
    <Box height={"100%"} width={"100%"}>
      <Box
        sx={{
          display: "flex",
          gap: "1.3rem",
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
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        {notifications?.map((notification, index) => (
          <NotificationItem
            key={index}
            id={notification?._id}
            truckId={notification?.truckId}
            type={notification?.type}
            message={notification?.message}
            createdAt={notification?.createdAt}
            isRead={notification?.isRead}
            onClose={handleNotificationClose}
          />
        ))}
      </Box>

      <Link
        onClick={handleNotificationClose}
        to="notification"
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          padding: "12px 0",
          textAlign: "center",
          display: "block",
          color: "rgba(0, 107, 206, 1)",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 1)",
          fontSize: "12px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        SEE ALL NOTIFICATIONS
      </Link>
    </Box>
  );
};
