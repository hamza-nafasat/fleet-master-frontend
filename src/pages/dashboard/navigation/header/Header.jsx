import { Box, Drawer, Menu, MenuItem, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import HeaderBgImg from "../../../../assets/images/header-bg-img.png";
import profilePic from "../../../../assets/images/settings/driver-profile.png";
import { MenuRounded } from "@mui/icons-material";
import Aside from "../Aside";
import Notification from "./components/Notification";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../../../redux/actions/user.actions";
import { getAllNotificationsAction } from "../../../../redux/actions/notification.actions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const [openNav, setOpenNav] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newNotificationLength, setNewNotificationLength] = useState(0);
  const location = useLocation();

  let urlArr = location.pathname.split("/");
  let pageTitle = urlArr[urlArr.length - 1].replaceAll("-", " ");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await dispatch(logoutUserAction());
    navigate("/login");
    handleClose();
    setIsLoading(false);
  };
  const toggleNav = (newOpen) => {
    setOpenNav(newOpen);
  };

  useEffect(() => {
    if (notifications) {
      const unreadNotifications = notifications?.filter((notification) => !notification?.isRead);
      console.log("unreadNotifications", unreadNotifications);
      setNewNotificationLength(unreadNotifications?.length);
    }
  }, [notifications]);

  useEffect(() => {
    dispatch(getAllNotificationsAction());
  }, [dispatch]);

  return (
    <>
      <HeaderBg>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "20px",
              md: "30px",
            },
            fontWeight: "500",
            lineHeight: "normal",
            color: "#ffffff",
          }}
        >
          Fleet Management Transportation
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: "16px",
              md: "20px",
            },
            fontWeight: "500",
            lineHeight: "normal",
            color: "#ffffff",
            textTransform: "uppercase",
          }}
        >
          {pageTitle}
        </Typography>
        <Box>
          <Notification length={newNotificationLength} />
          <Box
            onClick={handleClick}
            sx={{
              cursor: "pointer",
              display: "inline-block",
              position: "absolute",
              top: "25px",
              right: "20px",
            }}
          >
            <img
              src={user?.image?.url || profilePic}
              alt={user?.firstName}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "4px",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
                marginTop: "7px",
                width: "9rem",
              },
            }}
          >
            <Link to="/dashboard/profile" onClick={handleClose}>
              <MenuItem
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  background: "#fff",
                  color: "#000",
                  borderBottom: "1px solid #0000001c",
                }}
                disabled={isLoading}
              >
                My Profile
              </MenuItem>
            </Link>
            <MenuItem
              sx={{ fontSize: "14px", fontWeight: "500", background: "#fff" }}
              disabled={isLoading}
              onClick={handleLogout}
            >
              {isLoading ? "Logging out..." : "Logout"}
            </MenuItem>
          </Menu>
        </Box>
        <Box
          onClick={() => toggleNav(true)}
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: "5px",
            left: "14px",
            display: {
              sm: "block",
              xl: "none",
            },
          }}
        >
          <MenuRounded
            sx={{
              width: "1.5em",
              height: "1.5em",
              color: "#006bce",
            }}
          />
        </Box>
        <Drawer
          open={openNav}
          onClose={() => toggleNav(false)}
          PaperProps={{
            sx: {
              width: "310px",
              "&::-webkit-scrollbar": {
                width: 0,
                height: 0,
              },
              background: "linear-gradient(180deg, #006BCB 0%, #004A8B 100%)",
            },
          }}
        >
          <Aside toggleNav={toggleNav} />
        </Drawer>
      </HeaderBg>
    </>
  );
};

export default Header;

const HeaderBg = styled(Box)({
  background: `url(${HeaderBgImg}) no-repeat center / cover`,
  padding: "80px 34px 80px 34px",
  "@media (min-width: 960px)": {
    padding: "72px 34px 80px 34px",
  },
  position: "relative",
});
