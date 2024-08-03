/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    styled,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import SaveIcon from "../../../../../assets/svgs/settings/SaveIcon";
import { getAllDevicesAction } from "../../../../../redux/actions/device.actions";
import { attachDeviceToTruckAction } from "../../../../../redux/actions/truck.actions";
import { attachModalSchema } from "../../../../../schemas";

const AttacheModal = ({ onClose, truckId }) => {
    const dispatch = useDispatch();
    const { devices } = useSelector((state) => state.device);
    const devicesData = devices.filter((device) => !device.assignedTo?._id);

    useEffect(() => {
        dispatch(getAllDevicesAction());
    }, [dispatch]);

    const initialValues = {
        deviceId: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: attachModalSchema,
        onSubmit: async (values) => {
            await dispatch(attachDeviceToTruckAction(truckId, values.deviceId));
            onClose();
        },
    });

    return (
        <React.Fragment>
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
                        gap: "16px",
                        color: "rgba(17, 17, 17, 1)",
                        fontSize: { xs: "16px", md: "24px" },
                        fontWeight: 600,
                    }}
                >
                    <Box sx={{ cursor: "pointer", height: "1.5625rem" }} onClick={onClose}>
                        <BackIcon />
                    </Box>
                    ATTACH DEVICE
                </Box>
                <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                    <CloseIcon />
                </Box>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container mt={2} spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={touched.deviceName && !!errors.deviceName}>
                            <InputLabel id="deviceId">Select Device</InputLabel>
                            <Select
                                labelId="device-name"
                                label="Select Device"
                                name="deviceId"
                                value={values.deviceId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ width: "100%" }}
                            >
                                {devicesData?.length > 0 ? (
                                    devicesData?.map((device) => (
                                        <MenuItem key={device?._id} value={device?._id}>
                                            {device?.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem key="notDevice" value="">
                                        Not Any Device Available
                                    </MenuItem>
                                )}
                            </Select>
                            {touched.deviceId && errors.deviceId && (
                                <FormHelperText>{errors.deviceId}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
            <FormControl fullWidth error={touched.deviceType && !!errors.deviceType}>
              <InputLabel id="device-type">Select Device Type</InputLabel>
              <Select
                labelId="device-type"
                label="Select Device Type"
                name="deviceType"
                value={values.deviceType}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ width: "100%" }}
              >
                {deviceTypes?.length > 0 ? (
                  deviceTypes?.map((device, i) => (
                    <MenuItem key={i} value={device}>
                      {device}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem key="notDevice" value="">
                    Not Any Device Available
                  </MenuItem>
                )}
              </Select>
              {touched.deviceType && errors.deviceType && (
                <FormHelperText>{errors.deviceType}</FormHelperText>
              )}
            </FormControl>
          </Grid> */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                width: "15.9375rem",
                                justifyContent: "center",
                            }}
                        >
                            <CancelBtn onClick={onClose}>Cancel</CancelBtn>
                            <Button
                                type="submit"
                                startIcon={<SaveIcon />}
                                sx={{
                                    color: "#fff",
                                    borderRadius: "1rem",
                                    width: "9.8125rem",
                                    padding: "1rem",
                                    "&:disabled": {
                                        color: "#fff",
                                        opacity: "0.3",
                                        cursor: "not-allowed",
                                    },
                                }}
                                // disabled={isLoading}
                            >
                                {/* {isLoading ? "Saving..." : "Save"} */}
                                Save Device
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default AttacheModal;

const CancelBtn = styled("span")({
    fontSize: "1rem",
    fontWeight: 600,
    color: "rgba(17, 17, 17, 1)",
    cursor: "pointer",
});
