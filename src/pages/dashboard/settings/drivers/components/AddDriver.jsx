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
import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boolean } from "yup";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CameraIcon from "../../../../../assets/svgs/modal/CameraIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import SaveIcon from "../../../../../assets/svgs/settings/SaveIcon";
import { addDriverAction } from "../../../../../redux/actions/driver.actions";
import { getAllTrucksAction } from "../../../../../redux/actions/truck.actions";
import { addDriverSchema } from "../../../../../schemas";

// eslint-disable-next-line react/prop-types
const AddDriver = ({ onClose }) => {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [truckId, setTruckId] = useState("");
    const { trucks } = useSelector((state) => state.truck);

    const [selectedTrucks, setSelectedTrucks] = useState([]);

    const initialValues = {
        firstName: "",
        lastName: "",
        fleetNumber: "",
        licenseExpiry: "",
        phoneNumber: "",
        image: "",
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: addDriverSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("fleetNumber", values.fleetNumber);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("licenseExpiry", values.licenseExpiry);
            formData.append("file", values.image);
            if (truckId) formData.append("assignedTruck", truckId);
            await dispatch(addDriverAction(formData));
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

    useEffect(() => {
        if (trucks) {
            const newTrucks = trucks.filter((truck) => truck.status !== "connected");
            setSelectedTrucks(newTrucks);
        }
    }, [trucks, setSelectedTrucks]);

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
                    ADD DRIVER
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
                    <Grid container spacing="2rem">
                        <Grid item xs="12" lg="8">
                            <Grid container spacing="14">
                                <Grid item xs="12" lg="6">
                                    <TextField
                                        type="text"
                                        label="First Name"
                                        maxLength="20"
                                        fullWidth
                                        name="firstName"
                                        id="firstName"
                                        value={values.firstName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs="12" lg="6">
                                    <TextField
                                        type="text"
                                        label="Last Name"
                                        fullWidth
                                        maxLength="20"
                                        name="lastName"
                                        id="lastName"
                                        value={values.lastName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs="12" lg="6">
                                    <TextField
                                        type="number"
                                        name="fleetNumber"
                                        id="fleetNumber"
                                        fullWidth
                                        label="Fleet Number"
                                        maxLength="30"
                                        value={values.fleetNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.fleetNumber && Boolean(errors.fleetNumber)}
                                        helperText={touched.fleetNumber && errors.fleetNumber}
                                    />
                                </Grid>
                                <Grid item xs="12" lg="6">
                                    <TextField
                                        type="date"
                                        label="License Expiry"
                                        maxLength="30"
                                        fullWidth
                                        name="licenseExpiry"
                                        id="licenseExpiry"
                                        value={values.licenseExpiry}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.licenseExpiry && Boolean(errors.licenseExpiry)}
                                        helperText={touched.licenseExpiry && errors.licenseExpiry}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="truck-select-label">Select Truck</InputLabel>
                                        <Select
                                            labelId="truck-select-label"
                                            label="Select Truck"
                                            value={truckId}
                                            onChange={(e) => setTruckId(e.target.value)}
                                            sx={{ width: "100%" }}
                                        >
                                            {selectedTrucks?.length > 0 ? (
                                                selectedTrucks?.map((truck) => (
                                                    <MenuItem key={truck?._id} value={truck?._id}>
                                                        {truck?.truckName}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem key="notTruck" value="">
                                                    Not Any Truck Available
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs="12">
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: "20px",
                                            margin: "2rem 0",
                                        }}
                                    >
                                        Contacts
                                    </Typography>
                                </Grid>
                                <Grid item xs="12" lg="6">
                                    <TextField
                                        type="tel"
                                        label="Phone Number"
                                        maxLength="20"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        fullWidth
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                        helperText={touched.phoneNumber && errors.phoneNumber}
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
                                            {isLoading ? "Saving..." : "SAVE Driver"}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs="12" lg="4">
                            <Typography
                                sx={{
                                    color: "rgba(113, 117, 121, 1)",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                }}
                            >
                                Driver PICTURE
                            </Typography>
                            <Image src={profile} />
                            <ChangeButton startIcon={<CameraIcon />}>
                                CHANGE PHOTOS
                                <FileInput type="file" onChange={handleImageSrc} />
                            </ChangeButton>
                            {touched.image && errors.image && (
                                <Typography sx={{ fontSize: "12px" }} color="error">
                                    {errors.image}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Fragment>
    );
};

export default AddDriver;

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
