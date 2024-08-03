/* eslint-disable react/prop-types */
import { Box, Button, Grid, TextField, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Fragment } from "react";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import SaveIcon from "../../../../../assets/svgs/settings/SaveIcon";
import { addDeviceSchema } from "../../../../../schemas";
import { useDispatch } from "react-redux";
import { addDeviceAction } from "../../../../../redux/actions/device.actions";

const AddDevice = ({ onClose }) => {
    const dispatch = useDispatch();
    const initialValues = {
        deviceName: "",
        deviceType: "",
        ipAddress: "",
        uniqueId: "",
    };

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: addDeviceSchema,
        onSubmit: (values) => {
            const data = {
                name: values.deviceName,
                type: values.deviceType,
                ip: values.ipAddress,
                uniqueId: values.uniqueId,
            };
            dispatch(addDeviceAction(data));
        },
    });

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
                    ADD DEVICE
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
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: "20px",
                        marginBottom: "2rem",
                    }}
                >
                    General Info
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing="14">
                        <Grid item xs="12" lg="6">
                            <TextField
                                fullWidth
                                type="text"
                                name="deviceName"
                                value={values.deviceName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.deviceName && Boolean(errors.deviceName)}
                                helperText={touched.deviceName && errors.deviceName}
                                label="Device Name"
                                maxLength="20"
                            />
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                fullWidth
                                type="text"
                                label="Device Type"
                                maxLength="30"
                                name="deviceType"
                                id="deviceType"
                                value={values.deviceType}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.deviceType && Boolean(errors.deviceType)}
                                helperText={touched.deviceType && errors.deviceType}
                            />
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                fullWidth
                                type="text"
                                label="Unique Id"
                                maxLength="30"
                                name="uniqueId"
                                id="uniqueId"
                                value={values.uniqueId}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.uniqueId && Boolean(errors.uniqueId)}
                                helperText={touched.uniqueId && errors.uniqueId}
                            />
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                fullWidth
                                type="text"
                                label="Ip Address"
                                maxLength="30"
                                name="ipAddress"
                                id="ipAddress"
                                value={values.ipAddress}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.ipAddress && Boolean(errors.ipAddress)}
                                helperText={touched.ipAddress && errors.ipAddress}
                            />
                        </Grid>
                        <Grid item xs="12" mt={3}>
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
                                        width: "157px",
                                        padding: "16px",
                                        "&:disabled": {
                                            opacity: "0.3",
                                            color: "white",
                                            cursor: "not-allowed",
                                        },
                                    }}
                                    // disabled={isLoading}
                                >
                                    {/* {isLoading ? "Saving..." : "SAVE Device"} */}
                                    Save Device
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Fragment>
    );
};

export default AddDevice;

const CancelBtn = styled("span")({
    fontsize: "16px",
    fontWeight: 600,
    color: "rgba(17, 17, 17, 1)",
    cursor: "pointer",
});
