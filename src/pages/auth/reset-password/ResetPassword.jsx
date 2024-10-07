import { Box, Button, Grid, IconButton, TextField, Typography, styled } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "../../../assets/images/login/icon.png";
import LoginBg from "../../../assets/images/login/loginbg.png";
import EyeIconCLose from "../../../assets/svgs/login/EyeIconCLose";
import EyeIconOpen from "../../../assets/svgs/login/EyeIconOpen";
import { resetPasswordAction } from "../../../redux/actions/user.actions";
import { clearUserError, clearUserMessage } from "../../../redux/slices/user.slice";

const ResetPassword = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { message: resetMessage, error: resetError } = useSelector((state) => state.user);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const validatePasswords = (newPwd, confirmPwd) => {
    if (newPwd !== confirmPwd) setError("Password do not match");
    else setError("");
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    validatePasswords(e.target.value, confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswords(newPassword, e.target.value);
  };

  const handlePasswordChange = async () => {
    const resetToken = params?.["reset-token"];
    if (!newPassword || !confirmPassword) return toast.error("Please Enter New And Confirm Password");
    if (!resetToken) return toast.error("Please Check Your Email And Try Again");
    await dispatch(resetPasswordAction(resetToken, newPassword));
    <Navigate to="/login" replace />;
  };
  useEffect(() => {
    if (resetMessage) {
      toast.success(resetMessage);
      dispatch(clearUserMessage());
    }
    if (resetError) {
      toast.error(resetError);
      dispatch(clearUserError());
    }
  }, [dispatch, resetMessage, resetError]);

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
            <Typography variant="h5">Reset Your Password</Typography>
            <Typography
              sx={{
                mt: 2,
                textAlign: "center",
                width: {
                  xs: "100%",
                  md: "28vw",
                },
              }}
            >
              Please enter and confirm your new password below. Ensure it&apos;s strong and secure.
            </Typography>
            <TextField
              margin="normal"
              required
              sx={{
                width: {
                  xs: "100%",
                  md: "38vw",
                },
              }}
              name="newPassword"
              label="Enter new password"
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              autoComplete="current-password"
              variant="outlined"
              value={newPassword}
              onChange={handleNewPasswordChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleNewPasswordVisibility}
                    edge="end"
                  >
                    {showNewPassword ? <EyeIconCLose /> : <EyeIconOpen />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              sx={{
                width: {
                  xs: "100%",
                  md: "38vw",
                },
              }}
              name="confirmPassword"
              label="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="current-password"
              variant="outlined"
              error={error !== ""}
              helperText={error}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <EyeIconCLose /> : <EyeIconOpen />}
                  </IconButton>
                ),
              }}
            />
            <Button
              onClick={handlePasswordChange}
              sx={{
                mt: 2,
                width: {
                  xs: "100%",
                  md: "200px",
                },
                color: "#fff",
              }}
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

export default ResetPassword;

const Main = styled(Grid)({
  height: "100vh",
  display: "flex",
});
