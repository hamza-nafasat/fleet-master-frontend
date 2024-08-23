import { Box, Grid, styled, Typography } from "@mui/material";
import React from "react";
import Icon from "../../../assets/images/login/icon.png";
import LoginBg from "../../../assets/images/login/loginbg.png";
import Form from "./Form";
const Login = () => {
    return (
        <>
            <Main container>
                <Grid
                    item
                    md={8}
                    xs={12}
                    sx={{
                        height: "100vh",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Form />
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={0}
                    sx={{
                        height: "100vh",
                        width: "100%",
                        display: { xs: "none", md: "block" },
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
                                It is a long established fact that a reader will be distracted by the readable
                                content of a page when looking at its layout. The point of using Lorem Ipsum.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Main>
        </>
    );
};

export default Login;
const Main = styled(Grid)({
    height: "100vh",
    display: "flex",
});
