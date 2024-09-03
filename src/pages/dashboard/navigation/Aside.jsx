/* eslint-disable react/prop-types */
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AsideTruckBgImg from "../../../assets/images/asidetrucksec.png";
import AsideTruckIcon from "../../../assets/svgs/AsideTruckIcon";
import ChevronIcon from "../../../assets/svgs/ChevronIcon";
import ChevronIconUp from "../../../assets/svgs/ChevronIconUp";
import ChevronRightIcon from "../../../assets/svgs/ChevronRightIcon";
import DashboardIcon from "../../../assets/svgs/DashboardIcon";
import GeofenceIcon from "../../../assets/svgs/geofence/GeofenceIcon";
import HomeIcon from "../../../assets/svgs/HomeIcon";
import LogoIcon from "../../../assets/svgs/LogoIcon";
import PlanIcon from "../../../assets/svgs/plans/PlanIcon";
import PricingIcon from "../../../assets/svgs/plans/PricingIcon";
import ReceiptIcon from "../../../assets/svgs/plans/ReceiptIcon";
import RealTimeMapIcon from "../../../assets/svgs/RealTimeMapIcon";
import ReportNestedIcon from "../../../assets/svgs/ReportNestedIcon";
import ReportsIcon from "../../../assets/svgs/ReportsIcon";
import SettingIcon from "../../../assets/svgs/SettingIcon";
import SettingNestedIcon from "../../../assets/svgs/SettingNestedIcon";
import { logoutUserAction } from "../../../redux/actions/user.actions";
import { clearUserError, clearUserMessage } from "../../../redux/slices/user.slice";

const Aside = ({ toggleNav }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let urlArr = location.pathname.split("/");
  let path = urlArr[2];
  const [openPage, setOpenPage] = useState(null);
  const [isActivePage, setIsActivePage] = useState(path);
  const [isLoading, setIsLoading] = useState(false);

  const { message, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handlePages = (page) => {
    if (page.subPages) {
      setOpenPage(page.page);
    } else {
      setOpenPage(openPage === page ? null : page);
    }
    setIsActivePage(page);
  };

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logoutUserAction());
    navigate("/login");
    setIsLoading(false);
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearUserMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
  }, [message, error, dispatch]);

  const pages = [
    {
      icon: <HomeIcon isActivePage={isActivePage} />,
      title: "Home",
      route: "/dashboard/home",
      page: "home",
    },
    {
      icon: <DashboardIcon isActivePage={isActivePage} />,
      title: "Dashboard",
      // route: '/dashboard/map',
      page: "dashboard",
      subPages: [
        {
          icon: <RealTimeMapIcon isActivePage={isActivePage} />,
          title: "Real Time Map",
          route: "/dashboard/real-time-map",
          page: "real-time-map",
        },
        {
          icon: <GeofenceIcon isActivePage={isActivePage} />,
          title: "Geofence",
          route: "/dashboard/geofence",
          page: "geofence",
        },
      ],
    },
    {
      icon: <ReportsIcon isActivePage={isActivePage} />,
      title: "Reports",
      // route: '/dashboard/reports/truckreport',
      page: "reports",
      subPages: [
        {
          icon: <ReportNestedIcon />,
          title: "Truck Report",
          route: "/dashboard/reports/truck-report",
          page: "truck-report",
        },
        // {
        //   icon: <ReportNestedIcon />,
        //   title: "Daily Operation",
        //   route: "/dashboard/reports/operations",
        //   page: "daily-operation",
        // },
        // {
        //   icon: <ReportNestedIcon />,
        //   title: "Video Evidence",
        //   route: "/dashboard/reports/video",
        //   page: "video-evidence",
        // },
        // {
        //   icon: <ReportNestedIcon />,
        //   title: "SOS",
        //   route: "/dashboard/reports/sos",
        //   page: "sos",
        // },
      ],
    },
    {
      icon: <SettingIcon isActivePage={isActivePage} />,
      title: "Settings",
      //   route: '/dashboard/setting/alert',
      page: "settings",
      subPages: [
        {
          icon: <SettingNestedIcon />,
          title: "Alerts Type",
          route: "/dashboard/setting/alert",
          page: "alerts-type",
        },
        {
          icon: <SettingNestedIcon />,
          title: "Drivers",
          route: "/dashboard/setting/drivers",
          page: "drivers",
        },
        {
          icon: <SettingNestedIcon />,
          title: "Trucks",
          route: "/dashboard/setting/trucks",
          page: "trucks",
        },
        {
          icon: <SettingNestedIcon />,
          title: "Devices",
          route: "/dashboard/setting/devices",
          page: "devices",
        },
        {
          icon: <SettingNestedIcon />,
          title: "Employees",
          route: "/dashboard/setting/employees",
          page: "employees",
        },
      ],
    },
    {
      icon: <PricingIcon isActivePage={isActivePage} />,
      title: "Pricing Plan",
      page: "plans",
      subPages: [
        {
          icon: <PlanIcon />,
          title: "Plans",
          route: "/dashboard/plans/subscription-plan",
          page: "subscription-plan",
        },
        {
          icon: <ReceiptIcon />,
          title: "Receipt",
          route: "/dashboard/plans/subscription-history",
          page: "subscription-history",
        },
      ],
    },
  ];

  return (
    <>
      <Asidemain>
        <Stack
          justifyContent="space-between"
          sx={{
            gap: {
              sm: "1rem",
              md: "4rem",
            },
            width: "100%",
          }}
        >
          <ImageContainer>
            <LogoIcon />
          </ImageContainer>
          {/* Links  */}
          <Box
            sx={{
              marginTop: {
                xs: "30px",
                md: "40px",
                lg: "50px",
              },
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {pages.map((page, i) => (
              <React.Fragment key={i}>
                <Box
                  component={Link}
                  to={page.route}
                  onClick={() => {
                    handlePages(page.page);
                    setIsActivePage(page.page);
                    page.page === "home" && window.innerWidth <= 1199 && toggleNav(false);
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    padding: "9px 16px",
                    backgroundColor: isActivePage === page.page ? "#fff" : "transparent",
                  }}
                >
                  {page.icon}
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: "20px",
                      fontWeight: "400",
                      lineHeight: "30px",
                      color: isActivePage === page.page ? "#000" : "#fff",
                    }}
                  >
                    {page.title}
                  </Typography>
                  {page.subPages &&
                    (openPage === page.page ? (
                      <ChevronIconUp isActivePage={isActivePage === page.page} />
                    ) : (
                      <ChevronIcon isActivePage={isActivePage === page.page} />
                    ))}
                </Box>
                {page.subPages &&
                  page.subPages.map((subpage) => (
                    <Collapse
                      key={subpage.title}
                      in={openPage === page.page}
                      timeout="auto"
                      unmountOnExit
                      sx={{
                        paddingLeft: "15px",
                      }}
                    >
                      <Box
                        component={Link}
                        to={subpage.route}
                        onClick={() => {
                          setIsActivePage(subpage.page);
                          window.innerWidth <= 1199 && toggleNav(false);
                        }}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          borderRadius: "8px",
                          padding: "9px 16px",
                          width: "100%",
                          backgroundColor: isActivePage === subpage.page ? "#fff" : "transparent",
                        }}
                      >
                        {isActivePage === subpage.page && subpage.icon}
                        <Typography
                          variant="h2"
                          sx={{
                            fontFamily: '"Poppins", sans-serif',
                            fontSize: "20px",
                            fontWeight: "400",
                            lineHeight: "30px",
                            color: isActivePage === subpage.page ? "#000" : "#fff",
                          }}
                        >
                          {subpage.title}
                        </Typography>
                      </Box>
                    </Collapse>
                  ))}
              </React.Fragment>
            ))}
          </Box>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: "1rem" }}>
          <Button
            size="large"
            sx={{
              color: "#fff",
            }}
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </Box>
      </Asidemain>
    </>
  );
};

export default Aside;

const Asidemain = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "16px 8px",
  gap: "3rem",
  background: "linear-gradient(180deg, #006BCB 0%, #004A8B 100%)",
  "@media (min-width:991px)": {
    padding: "28px 14px 40px",
  },
  "@media (min-height:800px)": {
    height: "100%",
  },
});

const ImageContainer = styled(Box)({
  maxWidth: "100%",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// const AsideTruckSec = styled(Box)({
//   background: `url(${AsideTruckBgImg}) no-repeat center / cover`,
//   position: "relative",
//   width: "100%",
//   // flexGrow: '1',
//   display: "flex",
//   alignItems: "flex-end",
//   justifyContent: "center",
//   height: "141px",
//   padding: "16px",
//   borderRadius: "10px",
//   marginTop: "6rem",
// });
