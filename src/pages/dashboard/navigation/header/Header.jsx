import { Box, Drawer, Typography, styled } from "@mui/material";
import { useState } from "react";
import HeaderBgImg from "../../../../assets/images/header-bg-img.png";
import SaudiLogo from "../../../../assets/images/saudi-arabia-logo.png";
import { MenuRounded } from "@mui/icons-material";
import Aside from "../Aside";
import Notification from "./components/Notification";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    const location = useLocation();
    let urlArr = location.pathname.split("/");
    const { newNotifications } = useSelector((state) => state.notification);
    let pageTitle = urlArr[urlArr.length - 1].replaceAll("-", " ");

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
                <SaudiLogoDiv>
                    <img src={SaudiLogo} alt="saudi logo" style={{ width: "92px", height: "auto" }} />
                </SaudiLogoDiv>
                <Notification length={newNotifications?.length} />
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
                    ></MenuRounded>
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

const SaudiLogoDiv = styled(Box)({
    position: "absolute",
    right: "29px",
    top: "12px",
    width: "92px",
});
