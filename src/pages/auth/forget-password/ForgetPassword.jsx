import { Box, Button, Grid, TextField, Typography, styled } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Icon from "../../../assets/images/login/icon.png";
import LoginBg from "../../../assets/images/login/loginbg.png";
import { forgetPasswordAction } from "../../../redux/actions/user.actions";
import { clearUserError, clearUserMessage } from "../../../redux/slices/user.slice";

const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.user);

    const handleForget = (e) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter your email to reset the password");
        dispatch(forgetPasswordAction(email));
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
    return (
        <Fragment>
            <Main container>
                <Grid
                    item
                    md={8}
                    sx={{
                        height: "100vh",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    {/* Form */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: {
                                xs: "16px",
                                md: "0",
                            },
                        }}
                    >
                        <Typography variant="h5">Forget Your Password?</Typography>
                        <Typography
                            sx={{
                                my: 2,
                                textAlign: "center",
                                width: {
                                    xs: "100%",
                                    md: "38vw",
                                },
                            }}
                        >
                            Please enter the email address associated with your account. We will send you a
                            link to reset your password.
                        </Typography>
                        <TextField
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "38vw",
                                },
                            }}
                            label={"Enter your eMail"}
                        />
                        <Button
                            sx={{
                                mt: 2,
                                width: {
                                    xs: "100%",
                                    md: "200px",
                                },
                                color: "#fff",
                            }}
                            onClick={handleForget}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={4}
                    sx={{
                        height: "100vh",
                        width: "100%",
                        backgroundImage: `url(${LoginBg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        display: {
                            xs: "none",
                            md: "block",
                        },
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
        </Fragment>
    );
};

export default ForgotPassword;

const Main = styled(Grid)({
    height: "100vh",
    display: "flex",
});
