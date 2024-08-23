/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Box, Button, Grid, TextField, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CameraIcon from "../../../../../assets/svgs/modal/CameraIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import SaveIcon from "../../../../../assets/svgs/settings/SaveIcon";
import { addTruckAction, getAllTrucksAction } from "../../../../../redux/actions/truck.actions";
import { truckSchema } from "../../../../../schemas";

const AddTruck = ({ onClose }) => {
    const [imageSrc, setImageSrc] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        truckName: "",
        fleetNumber: "",
        plateNumber: "",
        deviceID: "",
        image: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: truckSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log("hello");
            setIsLoading(true);
            const formData = new FormData();
            formData.append("truckName", values.truckName);
            formData.append("fleetNumber", values.fleetNumber);
            formData.append("plateNumber", values.plateNumber);
            formData.append("deviceId", values.deviceID);
            formData.append("file", values.image);
            await dispatch(addTruckAction(formData));
            resetForm();
            setIsLoading(false);
            dispatch(getAllTrucksAction());
        },
    });

    const handleImageSrc = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setFieldValue("image", file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
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
                        fontSize: { xs: "1rem", md: "1.5rem" },
                        fontWeight: 600,
                    }}
                >
                    <Box sx={{ cursor: "pointer", height: "25px" }} onClick={onClose}>
                        <BackIcon />
                    </Box>
                    ADD TRUCK
                </Box>
                <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                    <CloseIcon />
                </Box>
            </Box>
            <Box sx={{ marginTop: { xs: "1rem", lg: "2.5rem" } }}>
                <Typography sx={{ fontWeight: 700, fontSize: "20px", marginBottom: "2rem" }}>
                    General Info
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        type="text"
                                        label="Truck Name"
                                        value={values.truckName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        name="truckName"
                                        id="truckName"
                                        error={touched.truckName && Boolean(errors.truckName)}
                                        helperText={touched.truckName && errors.truckName}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        type="number"
                                        label="Fleet Number"
                                        value={values.fleetNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        name="fleetNumber"
                                        id="fleetNumber"
                                        error={touched.fleetNumber && Boolean(errors.fleetNumber)}
                                        helperText={touched.fleetNumber && errors.fleetNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        type="number"
                                        label="Plate Number"
                                        value={values.plateNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        name="plateNumber"
                                        id="plateNumber"
                                        error={touched.plateNumber && Boolean(errors.plateNumber)}
                                        helperText={touched.plateNumber && errors.plateNumber}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Typography
                                sx={{
                                    color: "rgba(113, 117, 121, 1)",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                }}
                            >
                                Truck PICTURE
                            </Typography>
                            <Image src={imageSrc} />
                            <ChangeButton startIcon={<CameraIcon />}>
                                CHANGE PHOTOS
                                <FileInput type="file" name="file" id="file" onChange={handleImageSrc} />
                            </ChangeButton>
                            {touched.image && errors.image && (
                                <Typography color="error">{errors.image}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
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
                                    startIcon={<SaveIcon />}
                                    sx={{
                                        color: "#fff",
                                        borderRadius: "16px",
                                        width: "137px",
                                        padding: "16px",
                                        "&:disabled": {
                                            color: "#fff",
                                            opacity: "0.3",
                                            cursor: "not-allowed",
                                        },
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Saving..." : "Save"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    );
};

export default AddTruck;

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
    clipPath: "inset(0)",
});

const CancelBtn = styled("span")({
    fontSize: "16px",
    fontWeight: 600,
    color: "rgba(17, 17, 17, 1)",
    cursor: "pointer",
});
