import { Box, styled, Grid, Typography } from "@mui/material";
import LoginBg from "../../../assets/images/login/loginbg.png";
import Icon from "../../../assets/images/login/icon.png";
import Form from "./Form";
import { Fragment } from "react";

const Register = () => {
  return (
    <Fragment>
      <Main container>
        <Grid
          item
          xs={12}
          lg={8.5}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: {
              xs: "30px 16px",
              md: "24px",
              lg: "0 48px",
            },
          }}
        >
          <Form />
        </Grid>
        <Grid
          item
          xs={0}
          lg={3.5}
          sx={{
            height: "100vh",
            width: "100%",
            display: { xs: "none", lg: "block" },
            backgroundImage: `url(${LoginBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "60%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={Icon} alt="icon" width="200" height="150" />
              <Typography
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 18,
                  mt: 2,
                }}
              >
                It is a long established fact that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Main>
    </Fragment>
  );
};

export default Register;
const Main = styled(Grid)({
  height: "100vh",
  display: "flex",
});
