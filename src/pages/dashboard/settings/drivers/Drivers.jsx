import { Box, Grid } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import AddIcon from "../../../../assets/svgs/settings/AddIcon";
import Modal from "../../../../components/modal/Modal";
import { deleteDriverAction, getAllDriversAction } from "../../../../redux/actions/driver.actions";
import { clearDriverError, clearDriverMessage } from "../../../../redux/slices/driver.slice";
import AddDriver from "./components/AddDriver";
import CustomCard from "./components/CustomCard";
import EditDriver from "./components/EditDriver";

const Drivers = () => {
    const dispatch = useDispatch();
    const [modalType, setModalType] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const { message, error } = useSelector((state) => state.driver);

    const { drivers } = useSelector((state) => state.driver);

    const handleOpenAddDriverModal = () => {
        setModalType("add");
        setSelectedDriver(null);
    };

    const handleOpenEditModal = (driver) => {
        setModalType("edit");
        setSelectedDriver(driver);
    };

    const handleCloseModal = useCallback(() => {
        setModalType(null);
        setSelectedDriver(null);
    }, []);

    const handleDeleteDriver = (driverId) => {
        confirmAlert({
            title: "Confirm delete driver",
            message: "Are you sure you want to delete the driver?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await dispatch(deleteDriverAction(driverId));
                    },
                },
                {
                    label: "No",
                    onClick: () => {
                        toast.info("Delete action cancelled", { autoClose: 2000 });
                    },
                },
            ],
        });
    };

    // show success and error message
    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearDriverMessage());
            handleCloseModal();
        }
        if (error) {
            toast.error(error);
            dispatch(clearDriverError());
        }
        dispatch(getAllDriversAction());
    }, [message, error, dispatch, handleCloseModal]);

    return (
        <Fragment>
            <Box
                sx={{
                    background: "#F5F4F4",
                    padding: {
                        xs: "5px",
                        md: "10px",
                    },
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
                    <Box sx={{ cursor: "pointer" }} onClick={handleOpenAddDriverModal}>
                        <AddIcon />
                    </Box>
                    <DownloadIcon />
                </Box>
                <Grid container spacing={2}
                    style={{
                        marginTop: "50px",
                        display: "flex",
                        rowGap: "4rem",
                    }}
                >
                    {drivers?.map((driver, i) => (
                        <CustomCard
                            key={i}
                            driver={driver}
                            handleOpenEditModal={handleOpenEditModal}
                            onDelete={handleDeleteDriver}
                        />
                    ))}
                </Grid>
            </Box>
            {modalType === "edit" && (
                <Modal onClose={handleCloseModal}>
                    <EditDriver onClose={handleCloseModal} driver={selectedDriver} />
                </Modal>
            )}
            {modalType === "add" && (
                <Modal onClose={handleCloseModal}>
                    <AddDriver onClose={handleCloseModal} />
                </Modal>
            )}
        </Fragment>
    );
};

export default Drivers;
