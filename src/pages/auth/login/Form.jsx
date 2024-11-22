import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmailIcon from "../../../assets/svgs/login/EmailIcon";
import { loginUserAction } from "../../../redux/actions/user.actions";
import { clearUserError, clearUserMessage } from "../../../redux/slices/user.slice";
import { loginSchema } from "../../../schemas";

const Form = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      await dispatch(loginUserAction(values.email, values.password));
      setIsLoading(false);
      resetForm();
    },
  });

  // show message and error
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearUserMessage());
      navigate("/dashboard/home");
      return;
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
  }, [message, error, dispatch, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Sign in
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Welcome to Fleet Master
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: { xs: "90%", sm: "38vw" },
          }}
        >
          <TextField
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            margin="normal"
            id="email"
            label="Enter your email"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            InputProps={{
              endAdornment: <EmailIcon />,
            }}
            sx={{ width: "100%", mb: 2 }}
          />
          <TextField
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            margin="normal"
            name="password"
            label="Enter your password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
            sx={{ width: "100%", mb: 2 }}
          />
          <Link to="/forget-password" style={{ alignSelf: "start" }}>
            <Typography
              variant="body2"
              sx={{
                alignSelf: "start",
                color: "rgba(0, 107, 206, 1)",
                cursor: "pointer",
                mb: 2,
                padding: "5px",
              }}
            >
              Forgot Password?
            </Typography>
          </Link>
          <Button type="submit" variant="contained" sx={{ width: "100%", maxWidth: "20vw", mb: 2 }}>
            {isLoading ? <CircularProgress sx={{ color: "white", mx: 1 }} size={20} /> : null}
            Sign in
          </Button>
        </Box>
      </form>
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        Don&apos;t have an account?{" "}
        <Link to="/register" style={{ color: "rgba(0, 107, 206, 1)" }}>
          Register
        </Link>
      </Box>
    </Box>
  );
};

export default Form;
