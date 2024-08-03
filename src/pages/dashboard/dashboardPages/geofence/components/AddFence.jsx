/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { Fragment, useState } from "react";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import SaveIcon from "../../../../../assets/svgs/settings/SaveIcon";
import { addFenceSchema } from "../../../../../schemas";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createGeofenceAction, getAllGeofenceAction } from "../../../../../redux/actions/geofence.action";

const AddFence = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        status: "",
        alert: "",
        startDate: "",
        endDate: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: addFenceSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            const data = {
                name: values.name,
                status: values.status,
                alert: values.alert,
                startDate: values.startDate,
                endDate: values.endDate,
            };
            await dispatch(createGeofenceAction(data));
            await dispatch(getAllGeofenceAction());
            setIsLoading(false);
            onClose();
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
                    ADD GEOFENCE
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
                        lg: "2rem",
                    },
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing="14">
                        <Grid item xs="12" lg="6">
                            <TextField
                                type="text"
                                label="Geofence Name"
                                maxLength="20"
                                fullWidth
                                name="name"
                                id="name"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                                <InputLabel id="select-status">Select Status</InputLabel>
                                <Select
                                    labelId="select-status"
                                    label="Select Status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    <MenuItem value={"inactive"}>Inactive</MenuItem>
                                    <MenuItem value={"active"}>Active</MenuItem>
                                </Select>
                                {touched.alert && errors.alert && (
                                    <Typography color="error" fontSize="12px">
                                        {errors.alert}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth error={touched.alert && Boolean(errors.alert)}>
                                <InputLabel id="select-fence">Select Fence</InputLabel>
                                <Select
                                    labelId="select-fence"
                                    label="Select Fence"
                                    name="alert"
                                    value={values.alert}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    sx={{ width: "100%" }}
                                >
                                    <MenuItem value={"infence"}>In-Fence</MenuItem>
                                    <MenuItem value={"outfence"}>Out-Fence</MenuItem>
                                </Select>
                                {touched.status && errors.status && (
                                    <Typography color="error" fontSize="12px">
                                        {errors.status}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                type="date"
                                label="startDate"
                                maxLength="30"
                                fullWidth
                                name="startDate"
                                id="startDate"
                                value={values.startDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.startDate && Boolean(errors.startDate)}
                                helperText={touched.startDate && errors.startDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs="12" lg="6">
                            <TextField
                                type="date"
                                label="endDate"
                                maxLength="30"
                                fullWidth
                                name="endDate"
                                id="endDate"
                                value={values.endDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.endDate && Boolean(errors.endDate)}
                                helperText={touched.endDate && errors.endDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Saving..." : "SAVE Fence"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Fragment>
    );
};

export default AddFence;

const CancelBtn = styled("span")({
    fontsize: "16px",
    fontWeight: 600,
    color: "rgba(17, 17, 17, 1)",
    cursor: "pointer",
});
