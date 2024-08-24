/* eslint-disable react/prop-types */
import SDIcon from "../../../../../assets/svgs/notification/SDIcon";
import FatigueIcon from "../../../../../assets/svgs/notification/FatigueIcon";
import GeoFencingIcon from "../../../../../assets/svgs/notification/GeoFencingIcon";
import InFenceIcon from "../../../../../assets/svgs/notification/InFence";
import HeadwayIcon from "../../../../../assets/svgs/notification/HeadwayIcon";
import { Box, Typography } from "@mui/material";
import { timeAgo } from "../../../../../utils/features";

const NotificationItem = ({ createdAt, type, message, isRead }) => {
  const { backgroundColor, icon } = getNotificationDetails(type);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        p: 1.5,
        backgroundColor: isRead ? "rgba(240, 240, 240, 1)" : "rgba(255, 255, 255, 1)",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "lightgray",
          transform: "scale(0.98)",
          boxShadow: "0px 6px 20px rgba(255, 255, 255, 255)",
        },
      }}
    >
      <Box
        sx={{
          border: "2px solid rgba(0, 0, 0, 0.15)",
          backgroundColor,
          borderRadius: "50%",
          width: "45px",
          height: "45px",
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
            fontSize: "15px",
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {String(type)?.toUpperCase()}
        </Typography>
        <Typography sx={{ color: "rgba(50, 50, 50, 0.9)", fontSize: "13px", fontWeight: 500 }}>
          {message}
        </Typography>
        <Typography
          sx={{
            color: "rgba(110, 110, 110, 1)",
            fontSize: "12px",
            fontWeight: 400,
            textAlign: "right",
            mt: 0.3,
          }}
        >
          {timeAgo(createdAt)}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationItem;

const getNotificationDetails = (type) => {
  switch (type) {
    case "sdcard-removal":
      return { backgroundColor: "rgba(255, 214, 10, 1)", icon: <SDIcon /> };
    case "fatigue-detection":
      return { backgroundColor: "rgba(255, 107, 107, 1)", icon: <FatigueIcon /> };
    case "outfence":
      return { backgroundColor: "rgba(100, 221, 23, 1)", icon: <GeoFencingIcon /> };
    case "headway-monitoring":
      return { backgroundColor: "rgba(158, 158, 158, 1)", icon: <HeadwayIcon /> };
    case "infence":
      return { backgroundColor: "rgba(255, 171, 64, 1)", icon: <InFenceIcon /> };
    case "driverCreated":
      return { backgroundColor: "rgba(129, 212, 250, 1)", icon: <InFenceIcon /> };
    default:
      return { backgroundColor: "#e0e0e0", icon: null };
  }
};
