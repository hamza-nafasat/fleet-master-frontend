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
  const [dashboardData, setDashboardData] = useState({
    totalTrucks: 0,
    totalDrivers: 0,
    totalAssignedTrucks: 0,
    totalUnAssignedTrucks: 0,
    totalEmployees: 0,
    totalDevices: 0,
    totalAlarms: 0,
    trucksActiveIdleChartData: [
      { name: "idle", value: 0 },
      { name: "active", value: 0 },
      { name: "critical", value: 0 },
    ],
    crashReport: {
      label: [],
      data: [],
    },
  });

  useEffect(() => {
    dispatch(adminDashboardDetailsAction());
  }, [dispatch]);
  // console.log("dashboard details", dashboardData);

  useEffect(() => {
    if (dashboardDetails) {
      setDashboardData((prevState) => ({
        ...prevState,
        totalTrucks: dashboardDetails.totalTrucks ?? prevState.totalTrucks,
        totalDrivers: dashboardDetails.totalDrivers ?? prevState.totalDrivers,
        totalAssignedTrucks: dashboardDetails.totalAssignedTrucks ?? prevState.totalAssignedTrucks,
        totalUnAssignedTrucks: dashboardDetails.totalUnAssignedTrucks ?? prevState.totalUnAssignedTrucks,
        totalEmployees: dashboardDetails.totalEmployees ?? prevState.totalEmployees,
        totalDevices: dashboardDetails.totalDevices ?? prevState.totalDevices,
        totalAlarms: dashboardDetails.totalAlarms ?? prevState.totalAlarms,
        crashReport: dashboardDetails.crashReport ?? prevState.crashReport,
        trucksActiveIdleChartData: dashboardDetails?.trucksActiveIdleChartData ?? prevState.trucksActiveIdleChartData,
      }));
    }
  }, [dashboardDetails]);
  return (
    <Fragment>
      <Box
        sx={{
          marginTop: "-3.5rem",
          width: "100%",
        }}
      >
        <Card dashboardData={dashboardData} />
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
            <PiechartFleet trucksActiveIdleChartData={dashboardData?.trucksActiveIdleChartData} />
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
            <ReportChart crashReport={dashboardData?.crashReport} />
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
