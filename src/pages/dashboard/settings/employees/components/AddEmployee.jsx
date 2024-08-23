/* eslint-disable react/prop-types */
import { Box, Button, Grid, TextField, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CameraIcon from "../../../../../assets/svgs/modal/CameraIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import { addNewEmployAction } from "../../../../../redux/actions/employees.action";
import { getAllTrucksAction } from "../../../../../redux/actions/truck.actions";
import { addEmployeeSchema } from "../../../../../schemas";

const AddEmployee = ({ onClose }) => {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        image: "",
        role: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: addEmployeeSchema,

        onSubmit: async (values) => {
            console.log(values), setIsLoading(true);
            const formData = new FormData();
            formData.append("file", values.image);
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("role", values.role);
            await dispatch(addNewEmployAction(formData));
            setIsLoading(false);
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
        dispatch(getAllTrucksAction());
    }, [dispatch]);

    return (
        <Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        color: "rgba(17, 17, 17, 1)",
                        fontSize: {
                            xs: "1rem",
                            md: "1.5rem",
                        },
                        fontWeight: 600,
                    }}
                >
                    <Box sx={{ cursor: "pointer", height: "25px" }} onClick={onClose}>
                        <BackIcon />
                    </Box>
                    ADD EMPLOYEE
                </Box>
                <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                    <CloseIcon onClick={onClose} />
                </Box>
            </Box>
            {/* Form  */}
            <Box
                sx={{
                    marginTop: {
                        xs: "1rem",
                        lg: "2.5rem",
                    },
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing="16">
                        <Grid item xs="12" lg="6">
                            <TextField
                                type="text"
                                label="First Name"
                                maxLength="20"
                                name="firstName"
                                id="firstName"
                                fullWidth
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                type="text"
                                label="Last Name"
                                maxLength="20"
                                name="lastName"
                                id="lastName"
                                fullWidth
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                type="email"
                                label="Email"
                                maxLength="30"
                                fullWidth
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                type="tel"
                                label="Phone Number"
                                name="phoneNumber"
                                id="phoneNumber"
                                maxLength="30"
                                fullWidth
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                type="text"
                                label="Role"
                                maxLength="30"
                                fullWidth
                                name="role"
                                id="role"
                                value={values.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.role && Boolean(errors.role)}
                                helperText={touched.role && errors.role}
                            />
                        </Grid>
                        <Grid item xs="12" lg="6" display="flex" flexDirection="column" alignItems="flex-end">
                            <Typography
                                sx={{
                                    color: "rgba(113, 117, 121, 1)",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                }}
                            >
                                PROFILE PICTURE
                            </Typography>
                            <Image src={profile} />
                            <ChangeButton startIcon={<CameraIcon />}>
                                CHANGE PHOTOS
                                <FileInput type="file" onChange={handleImageSrc} />
                            </ChangeButton>
                            {touched.image && errors.image && (
                                <Typography sx={{ fontSize: "12px", mb: 2 }} color="error">
                                    {errors.image}
                                </Typography>
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    width: "255px",
                                    justifyContent: "center",
                                }}
                            >
                                <CancelBtn onClick={onClose}>Cancel</CancelBtn>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    sx={{
                                        color: "#fff",
                                        borderRadius: "16px",
                                        width: "137px",
                                        padding: "16px",
                                        "&:disable": {
                                            color: "#fff",
                                            opacity: "0.3",
                                            cursor: "not-allowed",
                                        },
                                    }}
                                >
                                    {isLoading ? "Saving..." : "Save"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Fragment>
    );
};

export default AddEmployee;

const ChangeButton = styled(Button)({
    border: "1px solid rgba(0, 107, 206, 1)",
    borderRadius: "14px",
    position: "relative",
    background: "transparent",
    padding: "1rem",
    width: "255px",
    "@media (max-width:768px)": {
        width: "100%",
    },
    "&:hover": {
        background: "transparent",
    },
    marginBottom: "2rem",
});

const FileInput = styled("input")({
    position: "absolute",
    inset: 0,
    opacity: "0",
    cursor: "pointer",
});

const Image = styled("img")({
    maxWidth: "100%",
    width: "255px",
    "@media (max-width:768px)": {
        width: "100%",
    },
    borderRadius: "14px",
    margin: "10px 0 20px",
});

const CancelBtn = styled("span")({
    fontsize: "16px",
    fontWeight: 600,
    color: "rgba(17, 17, 17, 1)",
    cursor: "pointer",
});
