import { Box, Grid } from "@mui/material";
import ListOfTrucks from "./components/lists/ListOfTrucks";
import Map from "./components/map/Map";
const RealTimeMap = () => {
  return (
    <Grid container sx={{ margin: 0 }}>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          paddingLeft: {
            xs: "0 !important",
            // md: "24px !important",
          },
          paddingRight: "24px",
        }}
      >
        <Box
          sx={{
            height: "100%",
            background: "#fff",
            borderRadius: "16px",
          }}
        >
          <Map realTime />
        </Box>
      </Grid>
      <Grid item xs={12} md={4} sx={{ pl: "0 !important" }}>
        <Box
          sx={{
            height: "100vh",
            background: "#fff",
            borderRadius: "16px",
            p: 2,
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(0, 25, 51, 0.2)",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0, 107, 206, 1)",
              borderRadius: "10px",
            },
          }}
        >
          <ListOfTrucks />
        </Box>
      </Grid>
    </Grid>
  );
};

export default RealTimeMap;
