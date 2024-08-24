import Card from "./components/Card";
import { Box, Grid } from "@mui/material";
import PiechartFleet from "./components/PiechartFleet";
import ReportChart from "./components/ReportChart";
import { Fragment, useEffect, useState } from "react";
import ListOfTrucks from "../dashboardPages/RealTimeMap/components/lists/ListOfTrucks";
import { useDispatch, useSelector } from "react-redux";
import { adminDashboardDetailsAction } from "../../../redux/actions/admin.actions";
import Map from "../dashboardPages/RealTimeMap/components/map/Map";
const Home = () => {
  const dispatch = useDispatch();
  const { dashboardDetails } = useSelector((state) => state.admin);
  const [dashboardDate, setDashboardDate] = useState({
    totalTrucks: 0,
    totalDrivers: 0,
    totalAssignedTrucks: 0,
    totalUnAssignedTrucks: 0,
    totalEmployees: 0,
    totalDevices: 0,
    totalAlarms: 0,
  });

  useEffect(() => {
    dispatch(adminDashboardDetailsAction());
  }, [dispatch]);

  useEffect(() => {
    if (dashboardDetails) {
      setDashboardDate((prevState) => ({
        totalTrucks: dashboardDetails.totalTrucks || prevState.totalTrucks,
        totalDrivers: dashboardDetails.totalDrivers || prevState.totalDrivers,
        totalAssignedTrucks: dashboardDetails.totalAssignedTrucks || prevState.totalAssignedTrucks,
        totalUnAssignedTrucks: dashboardDetails.totalUnAssignedTrucks || prevState.totalUnAssignedTrucks,
        totalEmployees: dashboardDetails.totalEmployees || prevState.totalEmployees,
        totalDevices: dashboardDetails.totalDevices || prevState.totalDevices,
        totalAlarms: dashboardDetails.totalAlarms || prevState.totalAlarms,
      }));
    }
  }, [dashboardDetails]);
  return (
    <Fragment>
      <Box
        sx={{
          marginTop: "-5rem",
          width: "100%",
        }}
      >
        <Card dashboardDate={dashboardDate} />
      </Box>
      <Grid container spacing={3} sx={{ margin: 0 }}>
        <Grid item xs={12} md={4} sx={{ pl: "0 !important" }}>
          <Box
            sx={{
              height: "300px",
              paddingRight: {
                xs: "24px",
                md: "0",
              },
            }}
          >
            <PiechartFleet />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            paddingLeft: {
              xs: "0 !important",
              md: "24px !important",
            },
            paddingRight: "24px",
          }}
        >
          <Box
            sx={{
              height: "300px",
              background: "#fff",
              borderRadius: "16px",
            }}
          >
            <ReportChart />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} height={"400px"} sx={{ margin: 0 }}>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            pb: "10px !important",
            pl: "0 !important",
            height: "100%",
            paddingRight: {
              xs: "24px",
              md: "0",
            },
          }}
        >
          <ListOfTrucks />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          sx={{
            pb: "10px !important",
            height: "100%",
            paddingLeft: {
              xs: "0 !important",
              md: "24px !important",
            },
            paddingRight: "24px",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              borderRadius: "12px",
              height: "100%",
            }}
          >
            <Map />
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
