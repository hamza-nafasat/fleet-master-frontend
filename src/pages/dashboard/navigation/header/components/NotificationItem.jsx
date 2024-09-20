/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { timeAgo } from "../../../../../utils/features";
import { useDispatch } from "react-redux";
import {
  getAllNotificationsAction,
  readNotificationAction,
} from "../../../../../redux/actions/notification.actions";
import { adminDashboardDetailsAction } from "../../../../../redux/actions/admin.actions";
import OverspeedIcon from "../../../../../assets/svgs/notification/OverspeedIcon";
import DamageSensorIcon from "../../../../../assets/svgs/notification/DamageSensorIcon";
import OutfenceIcon from "../../../../../assets/svgs/notification/OutfenceIcon";
import GeoFencingIcon from "../../../../../assets/svgs/notification/GeofencingIcon";
import InfenceIcon from "../../../../../assets/svgs/notification/InfenceIcon";
import AlertIcon from "../../../../../assets/svgs/notification/AlertIcon";
import DangerIcon from "../../../../../assets/svgs/notification/DangerIcon";
import CheckIcon from "../../../../../assets/svgs/notification/CheckIcon";
import LikeIcon from "../../../../../assets/svgs/notification/LikeIcon";

const NotificationItem = ({
  id,
  truckId,
  createdAt,
  type,
  message,
  isRead,
  onClose,
}) => {

  const dispatch = useDispatch();
  const { icon, miniIcon } = getNotificationDetails(type);
  const helo = getNotificationDetails(type);
  console.log(id,type,helo)

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
          {icon}
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
        icon: <OverspeedIcon />,
        miniIcon: <AlertIcon />,
      };
    case "damage-sensor":
      return {
        icon: <DamageSensorIcon />,
        miniIcon: <DangerIcon />,
      };
    case "geo-fencing":
      return {
        icon: <GeoFencingIcon />,
        miniIcon: <CheckIcon />,
      };
    case "infence":
      return {
        icon: <InfenceIcon />,
        miniIcon: <LikeIcon />,
      };
    case "outfence":
      return {
        icon: <OutfenceIcon />,
        miniIcon: <AlertIcon />,
      };

    default:
      return { icon: null };
  }
};


