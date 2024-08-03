/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendVerificationTokenAction } from "../../redux/actions/user.actions";

const NotVerified = ({ isVerified = false, user = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const resendVerificationLink = async () => {
        setLoading(true);
        await dispatch(resendVerificationTokenAction());
        setLoading(false);
    };

    useEffect(() => {
        if (isVerified) return navigate("/dashboard/home");
        if (!user) return navigate("/login");
    }, [isVerified, navigate, user]);
    return (
        <Container
            maxWidth="md"
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
        >
            <Box mt={6} p={3} width={"100%"} boxShadow={3} bgcolor="background.paper">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    p={2}
                >
                    <Typography
                        variant="h4"
                        sx={{ paddingBottom: "30px", fontSize: "27px", color: "red", fontWeight: 600 }}
                    >
                        Please verify your account
                    </Typography>
                    <Typography variant="h4" sx={{ fontSize: "20px", fontWeight: 400 }}>
                        Open your mail box and click on verification link to verify your account.
                    </Typography>
                    <Typography color="gray" variant="h4" sx={{ fontSize: "16px", fontWeight: 400, mt: 2 }}>
                        if you don&apos;t recieved verification link or want to resend verification link click
                        the button below.
                    </Typography>

                    <Button
                        onClick={resendVerificationLink}
                        sx={{ mt: 4, color: "white", padding: "10px 20px", opacity: loading ? 0.5 : 1 }}
                    >
                        {loading ? <CircularProgress sx={{ color: "white", mx: 1 }} size={20} /> : null}
                        {loading ? "Sending Verification link" : "Resend Verification Link"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default NotVerified;
