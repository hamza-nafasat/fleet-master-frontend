import { Box, Drawer, Menu, MenuItem, Typography, styled } from "@mui/material";
import { useState } from "react";
import HeaderBgImg from "../../../../assets/images/header-bg-img.png";
import profilePic from "../../../../assets/images/settings/driver-profile.png";
import { MenuRounded } from "@mui/icons-material";
import Aside from "../Aside";
import Notification from "./components/Notification";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  let urlArr = location.pathname.split("/");
  const { newNotifications } = useSelector((state) => state.notification);
  let pageTitle = urlArr[urlArr.length - 1].replaceAll("-", " ");
  const {user} = useSelector((state) => state.user)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleNav = (newOpen) => {
    setOpenNav(newOpen);
  };

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
          <Notification length={newNotifications?.length} />
          <Box
            onClick={handleClick}
            sx={{ cursor: "pointer", display: "inline-block", position:'absolute', top:'25px', right:'20px' }}
          >
            <img
              src={user?.image?.url || profilePic}
              alt="Saudi Arabia Logo"
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
            {/* <MenuItem
              sx={{
                fontSize: "14px",
                fontWeight: "500",
              }}
              onClick={handleClose}
            >
              My Profile
            </MenuItem> */}
            <MenuItem
              sx={{ fontSize: "14px", fontWeight: "500" }}
              onClick={handleClose}
            >
              Logout
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
  padding: "92px 34px 149px 34px",
  "@media (min-width: 960px)": {
    padding: "92px 34px 149px 34px",
  },
  position: "relative",
});
