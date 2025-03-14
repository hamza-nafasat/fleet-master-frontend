/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import crashImg from "../../../../../assets/images/notifications/crash.png";
import damageSensorImg from "../../../../../assets/images/notifications/damage-sensor.png";
import idleImg from "../../../../../assets/images/notifications/idle.png";
import infenceImg from "../../../../../assets/images/notifications/infence.png";
import offlineImg from "../../../../../assets/images/notifications/offline.png";
import outfenceImg from "../../../../../assets/images/notifications/outfence.png";
import overspeedImg from "../../../../../assets/images/notifications/overspeed.png";
import tirePressureImg from "../../../../../assets/images/notifications/tire-pressure.png";
import towImg from "../../../../../assets/images/notifications/tow.png";
import AlertIcon from "../../../../../assets/svgs/notification/AlertIcon";
import DangerIcon from "../../../../../assets/svgs/notification/DangerIcon";
import LikeIcon from "../../../../../assets/svgs/notification/LikeIcon";
import { timeAgo } from "../../../../../utils/features";
import RuleEngineIcon from "../../../../../assets/svgs/notification/RuleEngineIcon";

const NotificationItem = ({ id, truckId, createdAt, type, message, isRead, onClose, severity }) => {
  const { icon, miniIcon } = getNotificationDetails(type);

  return (
    <Link onClick={() => onClose()} to={`/dashboard/truck-detail/${truckId}`}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          p: 1.5,
          backgroundColor: !isRead
            ? severity === "high"
              ? "#FBDCD9"
              : severity === "low"
                ? "#D4E9D9"
                : severity === "medium"
                  ? "#FAE6CF"
                  : "#EEF7FF"
            : "",

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
    case "speed-alert":
      return {
        icon: overspeedImg,
        miniIcon: <AlertIcon />,
      };
    case "damage-alert":
      return {
        icon: damageSensorImg,
        miniIcon: <DangerIcon />,
      };
    // case "geo-fencing":
    //   return {
    //     icon: geofencingImg,
    //     miniIcon: <CheckIcon />,
    //   };
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
    case "two-detection":
      return {
        icon: towImg,
        miniIcon: <AlertIcon />,
      };
    case "ruleengine":
      return {
        miniIcon: <RuleEngineIcon />,
      };
    case "sensor-offline":
      return {
        icon: offlineImg,
        miniIcon: <DangerIcon />,
      };
    case "sudden-stop":
      return {
        icon: crashImg,
        miniIcon: <DangerIcon />,
      };
    case "tire-pressure":
      return {
        icon: tirePressureImg,
        miniIcon: <AlertIcon />,
      };
    case "idle-engine":
      return {
        icon: idleImg,
        miniIcon: <AlertIcon />,
      };

    default:
      return { icon: null };
  }
};
