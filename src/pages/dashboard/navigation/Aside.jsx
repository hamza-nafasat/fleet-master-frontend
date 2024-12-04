/* eslint-disable react/prop-types */
import { Box, Stack, Typography, styled } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ChevronIcon from "../../../assets/svgs/ChevronIcon";
import ChevronIconUp from "../../../assets/svgs/ChevronIconUp";
import LogoIcon from "../../../assets/svgs/LogoIcon";
import { useSelector } from "react-redux";
import usePageRoutes from "./usePageRoutes";

const Aside = ({ toggleNav }) => {
  const location = useLocation();
  const [openPage, setOpenPage] = useState(null);
  const [isActivePage, setIsActivePage] = useState();
  const { user } = useSelector((state) => state.user);
  const [routes, refetch] = usePageRoutes(isActivePage, user);

  const handlePages = (page) => {
    if (page.subPages) setOpenPage(page.page);
    else setOpenPage(openPage === page ? null : page);
    setIsActivePage(page);
  };

  useEffect(() => {
    let currentPath = location.pathname.split("/")[2];
    setIsActivePage(currentPath || "home");
  }, [location.pathname]);

  useEffect(() => {
    refetch(isActivePage, user);
  }, [isActivePage, user, refetch]);

  return (
    routes && (
      <Asidemain>
        <Stack
          sx={{
            gap: {
              sm: "1rem",
              md: "4rem",
            },
            width: "100%",
            height: "100%",
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
            {routes.map((page, i) => (
              <React.Fragment key={i}>
                <Box
                  component={Link}
                  to={page.route}
                  onClick={() => {
                    handlePages(page.page);
                    setIsActivePage(page.page);
                    page.page === "home" &&
                      window.innerWidth <= 1199 &&
                      toggleNav(false);
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    padding: "9px 16px",
                    backgroundColor:
                      isActivePage === page.page ? "#fff" : "transparent",
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
                      <ChevronIconUp
                        isActivePage={isActivePage === page.page}
                      />
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
                          backgroundColor:
                            isActivePage === subpage.page
                              ? "#fff"
                              : "transparent",
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
                            color:
                              isActivePage === subpage.page ? "#000" : "#fff",
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
      </Asidemain>
    )
  );
};

export default Aside;

const Asidemain = styled(Box)({
  display: "flex",
  height: "auto",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "16px 8px",
  "@media (min-width:991px)": {
    padding: "28px 14px 40px",
  },
  "@media (min-height:800px)": {
    height: "auto",
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
