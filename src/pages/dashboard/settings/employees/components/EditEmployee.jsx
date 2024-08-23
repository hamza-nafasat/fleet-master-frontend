/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CameraIcon from "../../../../../assets/svgs/modal/CameraIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import InputField from "./InputField";
import { updateEmployAction } from "../../../../../redux/actions/employees.action";

const EditEmployee = ({ onClose, employ }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(employ?.firstName);
    const [lastName, setLastName] = useState(employ?.lastName);
    const [email, setEmail] = useState(employ?.email);
    const [phone, setPhone] = useState(employ?.phoneNumber);
    const [role, setRole] = useState(employ?.role);
    const [image, setImage] = useState("");
    const [profile, setProfile] = useState(employ?.image?.url);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        const formData = new FormData();
        if (image) formData.append("file", image);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phoneNumber", phone);
        formData.append("role", role);
        await dispatch(updateEmployAction(employ?._id, formData));
        setIsLoading(false);
    };

    const handleImageSrc = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                    EDIT EMPLOYEE
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
                <Grid container spacing="16">
                    <Grid item xs="12" lg="6">
                        <InputField
                            type="text"
                            label="First Name"
                            maxLength="20"
                            value={firstName}
                            change={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs="12" lg="6">
                        <InputField
                            type="text"
                            label="Last Name"
                            maxLength="20"
                            value={lastName}
                            change={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs="12" lg="6">
                        <InputField
                            type="email"
                            label="Email"
                            maxLength="30"
                            value={email}
                            change={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs="12" lg="6">
                        <InputField
                            type="tel"
                            label="Phone Number"
                            maxLength="30"
                            value={phone}
                            change={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs="12" lg="6">
                        <InputField
                            type="text"
                            label="Role"
                            maxLength="30"
                            value={role}
                            change={(e) => setRole(e.target.value)}
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
                                onClick={handleSave}
                                disabled={isLoading}
                                sx={{
                                    color: "#fff",
                                    borderRadius: "16px",
                                    width: "137px",
                                    padding: "16px",
                                    "&:disabled": {
                                        opacity: "0.3",
                                        color: "white",
                                        cursor: "not-allowed",
                                    },
                                }}
                            >
                                {isLoading ? "Saving..." : "Save"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
};

export default EditEmployee;

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
