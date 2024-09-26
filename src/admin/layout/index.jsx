import { Box, Grid, styled } from "@mui/material";
import Header from "./AdminHeader";
import Aside from "./AdminAside";
import Main from "./AdminMain";
import { Fragment } from "react";

const AdminDashboard = () => {
  return (
    <Fragment>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Grid
          container
          sx={{
            flexWrap: "nowrap !important",
            height: "100%",
          }}
        >
          <AsideGrid item xl={2.1}>
            <Box
              sx={{
                height: "100%",
                display: {
                  xs: "none",
                  xl: "block",
                },
                // background: "linear-gradient(180deg, #006BCB 0%, #004A8B 100%)",
              }}
            >
              <Aside />
            </Box>
          </AsideGrid>
          <Grid
            item
            xs={12}
            xl={9.9}
            sx={{ overflowY: "scroll", background: "#f3f8ff", "&::-webkit-scrollbar": { width: 0 } }}
          >
            <Header />
            <Main />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default AdminDashboard;

const AsideGrid = styled(Grid)({
  background: "linear-gradient(180deg, #006BCB 0%, #004A8B 100%)",
  overflowY: "scroll",
  MSOverflowStyle: "none",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
});
