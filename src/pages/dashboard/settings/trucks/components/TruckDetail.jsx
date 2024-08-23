/* eslint-disable react/prop-types */
import AddLinkIcon from "@mui/icons-material/AddLink";
import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar, Box, Grid, Tooltip, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import profilePic from "../../../../../assets/images/settings/vehicle-pic.png";
import Modal from "../../../../../components/modal/Modal";
import {
    detachDeviceFromTruckAction,
    getSingleTruckAction,
} from "../../../../../redux/actions/truck.actions";
import { clearTruckError, clearTruckMessage } from "../../../../../redux/slices/truck.slice";
import AttacheModal from "./AttacheModal";

const TruckDetail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const truckId = params?.truckId;
    const { truck, message, error } = useSelector((state) => state.truck);
    const [modalType, setModalType] = useState(null);
    const [truckForAttach, setTruckForAttach] = useState(null);

    const handleOpenAttachModal = (truckId) => {
        setTruckForAttach(truckId);
        setModalType("attach");
    };

    const handleCloseModal = () => {
        setModalType(null);
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearTruckMessage());
        }
        if (error) {
            toast.error(error);
            dispatch(clearTruckError());
        }

        dispatch(getSingleTruckAction(truckId));
    }, [dispatch, message, error, truckId]);
    return (
        <React.Fragment>
            <TruckContainer container sx={{ padding: { xs: "16px", md: "24px" } }}>
                <Grid item xs={11}>
                    <Avatar
                        alt="profile"
                        src={profilePic}
                        sx={{
                            width: "200px",
                            height: "200px",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <Typography variant="h6" sx={{ width: "200px", textAlign: "center", mt: 1 }}>
                        {truck?.truckName}
                    </Typography>
                </Grid>
                <Grid item xs={1} display="flex" justifyContent="flex-end">
                    <Box sx={{ cursor: "pointer" }} onClick={() => handleOpenAttachModal(truck?._id)}>
                        <Tooltip title="Attach Device">
                            <AddLinkIcon style={{ color: "#006bce", width: "40px", height: "40px" }} />
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12} mt={4}>
                    <Typography variant="h6">Attached Devices</Typography>
                    <Grid container spacing={2} mt={1}>
                        {truck?.devices?.map((device) => (
                            <DeviceCard key={device._id} device={device} truck={truck} />
                        ))}
                    </Grid>
                </Grid>
            </TruckContainer>
            {modalType === "attach" && (
                <Modal onClose={handleCloseModal}>
                    <AttacheModal onClose={handleCloseModal} truckId={truckForAttach} />
                </Modal>
            )}
        </React.Fragment>
    );
};

export default TruckDetail;

const DeviceCard = ({ device, truck }) => {
    const dispatch = useDispatch();
    const deleteDeviceHandle = (truckId, deviceId) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to detach device?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await dispatch(detachDeviceFromTruckAction(truckId, deviceId));
                    },
                },
                {
                    label: "No",
                    onClick: () => toast.info("Delete action cancelled"),
                },
            ],
        });
    };

    return (
        <Grid item xs={12} md={4}>
            <Box
                sx={{
                    position: "relative",
                    background: "rgba(255, 255, 255, 1)",
                    borderRadius: "12px",
                    padding: {
                        xs: "1rem",
                        md: "2rem",
                    },
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        color: "rgba(70, 66, 85, 1)",
                        fontSize: "18px",
                        fontWeight: 500,
                    }}
                >
                    {device?._id}
                </Typography>
                <Box
                    sx={{
                        marginTop: "1.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                color: "rgba(127, 127, 146, 1)",
                                fontSize: "12px",
                            }}
                        >
                            Creation Date
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(0, 107, 206, 1)",
                                fontSize: "16px",
                            }}
                        >
                            {device?.createdAt?.split("T")[0]}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                color: "rgba(127, 127, 146, 1)",
                                fontSize: "12px",
                            }}
                        >
                            Device Name
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(0, 107, 206, 1)",
                                fontSize: "16px",
                            }}
                        >
                            {device?.name}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: "1.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                color: "rgba(127, 127, 146, 1)",
                                fontSize: "12px",
                            }}
                        >
                            Device Type
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(0, 107, 206, 1)",
                                fontSize: "16px",
                            }}
                        >
                            {device?.type}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                color: "rgba(127, 127, 146, 1)",
                                fontSize: "12px",
                            }}
                        >
                            Assigned To
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(0, 107, 206, 1)",
                                fontSize: "16px",
                            }}
                        >
                            {truck?.truckName}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    onClick={() => deleteDeviceHandle(truck._id, device._id)}
                    sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer" }}
                >
                    <Tooltip title="Detach Device">
                        <CancelIcon style={{ color: "#d30000" }} />
                    </Tooltip>
                </Box>
            </Box>
        </Grid>
    );
};

const TruckContainer = styled(Grid)({
    background: "#F5F4F4",
    borderRadius: "24px",
    // height: "100%",
    marginTop: "-4rem",
});
