/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FatigueIcon from "../../../../../assets/svgs/notification/FatigueIcon";
import GeoFencingIcon from "../../../../../assets/svgs/notification/GeoFencingIcon";
import InFenceIcon from "../../../../../assets/svgs/notification/InFence";
import { timeAgo } from "../../../../../utils/features";
import { useDispatch } from "react-redux";
import {
  getAllNotificationsAction,
  readNotificationAction,
} from "../../../../../redux/actions/notification.actions";
import { adminDashboardDetailsAction } from "../../../../../redux/actions/admin.actions";

const NotificationItem = ({ id, truckId, createdAt, type, message, isRead, onClose }) => {
  const dispatch = useDispatch();
  const { backgroundColor, icon } = getNotificationDetails(type);

  const openNotification = async () => {
    onClose();
    await dispatch(readNotificationAction(id));
    await dispatch(getAllNotificationsAction());
    await dispatch(adminDashboardDetailsAction());
  };

  return (
    <Link onClick={openNotification} to={`/dashboard/truck-detail/${truckId}`}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          p: 1.5,
          backgroundColor: isRead ? "rgba(255, 255, 255, 1)" : "lightgray",
          borderRadius: "12px",
          boxShadow: isRead ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "0px 2px 7px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1 , 1.1)",
            boxShadow: isRead ? "0px 0px 10px rgba(0, 0, 0, 0.5)" : "0px 4px 12px rgba(255, 255, 2555)",
          },
        }}
      >
        <Box
          sx={{
            border: "2px solid rgba(0, 0, 0, 0.15)",
            backgroundColor,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(34, 34, 34, 1)",
              fontSize: "12px",
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            {String(type)?.toUpperCase()}
          </Typography>
          <Typography sx={{ color: "rgba(50, 50, 50, 0.9)", fontSize: "10px", fontWeight: 500 }}>
            {message}
          </Typography>
          <Typography
            sx={{
              color: "rgba(110, 110, 110, 1)",
              fontSize: "10px",
              fontWeight: 400,
              textAlign: "right",
              mt: 0.3,
            }}
          >
            {timeAgo(createdAt)}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default NotificationItem;

const getNotificationDetails = (type) => {
  switch (type) {
    case "speed":
      return { backgroundColor: "rgba(255, 107, 107, 1)", icon: <FatigueIcon /> };
    case "outfence":
      return { backgroundColor: "rgba(100, 221, 23, 1)", icon: <GeoFencingIcon /> };
    case "infence":
      return { backgroundColor: "rgba(255, 171, 64, 1)", icon: <InFenceIcon /> };

    default:
      return { backgroundColor: "#e0e0e0", icon: null };
  }
};
