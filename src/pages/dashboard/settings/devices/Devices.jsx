import { Box, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import AddIcon from "../../../../assets/svgs/settings/AddIcon";
import Modal from "../../../../components/modal/Modal";
import { deleteDeviceAction, getAllDevicesAction } from "../../../../redux/actions/device.actions";
import AddDevice from "./components/AddDevice";
import DeviceCard from "./components/DeviceCard";
import EditDevice from "./components/EditDevice";
import { clearDeviceError, clearDeviceMessage } from "../../../../redux/slices/device.slice";
const Devices = () => {
    const dispatch = useDispatch();
    const { devices, message, error } = useSelector((state) => state.device);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [modalType, setModalType] = useState(null);

    const handleOpenEditModal = (device) => {
        setSelectedDevice(device);
        setModalType("edit");
    };

    const handleOpenAddModal = () => {
        setModalType("add");
    };

    const handleCloseModal = () => {
        setModalType(null);
    };

    const handleDeleteDevice = (deviceId) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to detach device?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await dispatch(deleteDeviceAction(deviceId));
                        toast.success("Device deleted successfully");
                    },
                },
                {
                    label: "No",
                    onClick: () => toast.info("Delete action cancelled"),
                },
            ],
        });
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearDeviceMessage());
            handleCloseModal();
        }
        if (error) {
            toast.error(error);
            dispatch(clearDeviceError());
        }
        dispatch(getAllDevicesAction());
    }, [message, error, dispatch]);
    return (
        <Fragment>
            <Box
                sx={{
                    background: "#F5F4F4",
                    padding: "16px",
                    borderRadius: "24px",
                }}
            >
                <Box
                    sx={{
                        padding: "10px 30px",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                    }}
                >
                    <Box sx={{ cursor: "pointer" }} onClick={handleOpenAddModal}>
                        <AddIcon />
                    </Box>
                    <DownloadIcon />
                </Box>
                <Grid container spacing={2}>
                    {devices?.map((device, i) => (
                        <DeviceCard
                            key={i}
                            device={device}
                            handleDeleteDevice={handleDeleteDevice}
                            handleOpenEditModal={handleOpenEditModal}
                        />
                    ))}
                </Grid>
            </Box>
            {modalType === "edit" && (
                <Modal onClose={handleCloseModal}>
                    <EditDevice onClose={handleCloseModal} device={selectedDevice} />
                </Modal>
            )}
            {modalType === "add" && (
                <Modal onClose={handleCloseModal}>
                    <AddDevice onClose={handleCloseModal} />
                </Modal>
            )}
        </Fragment>
    );
};

export default Devices;
