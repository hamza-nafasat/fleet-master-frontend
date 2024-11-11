/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AlertIcon from "../../../assets/svgs/notification/AlertIcon";
import CheckIcon from "../../../assets/svgs/notification/CheckIcon";
import DangerIcon from "../../../assets/svgs/notification/DangerIcon";
import LikeIcon from "../../../assets/svgs/notification/LikeIcon";
import { adminDashboardDetailsAction } from "../../../redux/actions/admin.actions";
import {
  getAllNotificationsAction,
  readNotificationAction,
} from "../../../redux/actions/notification.actions";
import { timeAgo } from "../../../utils/features";
import overspeedImg from "../../../assets/images/notifications/overspeed.png";
import geofencingImg from "../../../assets/images/notifications/geo-fencing.png";
import infenceImg from "../../../assets/images/notifications/infence.png";
import outfenceImg from "../../../assets/images/notifications/outfence.png";
import damageSensorImg from "../../../assets/images/notifications/damage-sensor.png";

const NotificationItem = ({ id, truckId, createdAt, type, message, isRead, onClose }) => {
  const dispatch = useDispatch();
  const { icon, miniIcon } = getNotificationDetails(type);

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
          justifyContent: "space-between",
          gap: "0.5rem",
          p: 1.5,
          backgroundColor: isRead ? "rgba(255, 255, 255, 1)" : "#96cdff",
          borderBottom: "1px solid #0000001c",
          transition: "all 0.2s ease",
          "&:hover": {
            cursor: "pointer",
            background: "#d9edff",
          },
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={icon} alt="icon" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {miniIcon}
            <Typography
              variant="body2"
              sx={{
                color: "rgba(34, 34, 34, 1)",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {String(type)}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "rgba(50, 50, 50, 0.9)",
              fontSize: "10px",
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        </Box>
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
    </Link>
  );
};

export default NotificationItem;

const getNotificationDetails = (type) => {
  switch (type) {
    case "speed":
      return {
        icon: overspeedImg,
        miniIcon: <AlertIcon />,
      };
    case "sensor-damage":
      return {
        icon: damageSensorImg,
        miniIcon: <DangerIcon />,
      };
    case "geo-fencing":
      return {
        icon: geofencingImg,
        miniIcon: <CheckIcon />,
      };
    case "infence":
      return {
        icon: infenceImg,
        miniIcon: <LikeIcon />,
      };
    case "outfence":
      return {
        icon: outfenceImg,
        miniIcon: <AlertIcon />,
      };

    default:
      return { icon: null };
  }
};
