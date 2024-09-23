import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CameraIcon from "../../../assets/svgs/modal/CameraIcon";
import { registerUserAction } from "../../../redux/actions/user.actions";
import { registerSchema } from "../../../schemas";
import placeholderImg from '../../../assets/images/login/placeholder-img.jpeg'

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.user);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    image: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        setLoading(true);
        if (values.password !== values.confirmPassword) {
          setLoading(false);
          return toast.error("Password does not match");
        }
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phone);
        formData.append("password", values.password);
        formData.append("address", values.address);
        formData.append("trialPeriod", "7");
        formData.append("file", values.image);
        await dispatch(registerUserAction(formData));
        setLoading(false);
      },
    });

  const handleImageSrc = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
        setFieldValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (message) {
      resetForm();
      return navigate("/verify-email");
    }
  }, [message, dispatch, resetForm, navigate]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Register
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Welcome to Fleet Master
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                type="text"
                label="First Name"
                name="firstName"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="text"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="email"
                label="Email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="tel"
                name="phone"
                label="Phone Number"
                value={values.phone}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Address"
                name="address"
                value={values.address}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <LocationOnIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                label="Password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                label="Confirm Password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: "#1976d2", fontSize: "18px", fontWeight: 600 }}>
                With 7 Days Trial Period
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} display="flex" alignItems="center" flexDirection="column">
          <Image src={profile || placeholderImg} />
          <ChangeButton startIcon={<CameraIcon />}>
            Upload
            <FileInput type="file" onChange={handleImageSrc} />
          </ChangeButton>
          {touched.image && errors.image && (
            <Typography sx={{ fontSize: "12px", mb: 2 }} color="error">
              {errors.image}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            sx={{
              padding: "0.8rem 2.5rem",
              fontSize: "18px",
              "&:disabled": { opacity: "0.5", cursor: "not-allowed" },
            }}
            variant="contained"
            disabled={loading}
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "rgba(0, 107, 206, 1)" }}>
              Login
            </Link>
          </Box>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled("form")({
  width: "100%",
});

const ChangeButton = styled(Button)({
  border: "1px solid rgba(0, 107, 206, 1)",
  borderRadius: "14px",
  position: "relative",
  background: "transparent",
  padding: "0.8rem",
  fontSize: "18px",
  width: "210px",
  "&:hover": {
    background: "transparent",
  },
});

const FileInput = styled("input")({
  position: "absolute",
  inset: 0,
  opacity: "0",
  cursor: "pointer",
});

const Image = styled("img")({
  maxWidth: "100%",
  width: "240px",
  height: "240px",
  objectFit: "cover",
  border: "2px solid #1976d2",
  // "@media (max-width:768px)": {
  //     width: "100%",
  // },
  borderRadius: "50%",
  margin: "0px 0 20px",
});
