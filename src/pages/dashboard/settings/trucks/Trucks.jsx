import { Fragment, useCallback, useEffect, useState } from "react";
import TruckCard from "./components/TruckCard";
// import { trucks } from "../../../../data/data";
import { Box, Grid } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import AddIcon from "../../../../assets/svgs/settings/AddIcon";
import Modal from "../../../../components/modal/Modal";
import { deleteTruckAction, getAllTrucksAction } from "../../../../redux/actions/truck.actions";
import { clearTruckError, clearTruckMessage } from "../../../../redux/slices/truck.slice";
import AddTruck from "./components/AddTruck";
import EditTruck from "./components/EditTruck";

const Trucks = () => {
    const [modalType, setModalType] = useState(null);
    const [singleTruck, setSingleTruck] = useState("");
    const dispatch = useDispatch();
    const { trucks, message, error } = useSelector((state) => state.truck);

    console.log(trucks);

    const handleOpenAddUserModal = () => {
        setModalType("add");
    };

    const handleOpenEditModal = (truck) => {
        setModalType("edit");
        setSingleTruck(truck);
    };

    const handleCloseModal = useCallback(() => {
        setModalType(null);
    }, []);

    const deleteTruckHandler = async (id) => {
        confirmAlert({
            title: "Confirm delete Trucks",
            message: "Are you sure you want to delete the Truck?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        if (id) {
                            await dispatch(deleteTruckAction(id));
                            dispatch(getAllTrucksAction());
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => toast.info("Delete action cancelled", { autoClose: 2000 }),
                },
            ],
        });
    };

    useEffect(() => {
        dispatch(getAllTrucksAction());
    }, [dispatch]);

    // show success and error message
    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearTruckMessage());
            handleCloseModal();
        }
        if (error) {
            toast.error(error);
            dispatch(clearTruckError());
        }
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
                    <Box sx={{ cursor: "pointer" }} onClick={handleOpenAddUserModal}>
                        <AddIcon />
                    </Box>
                    <DownloadIcon />
                </Box>
                <Grid
                    container
                    spacing={2}
                    style={{
                        marginTop: "50px",
                        display: "flex",
                        rowGap: "3.4rem",
                    }}
                >
                    {trucks?.map((truck, i) => (
                        <TruckCard
                            key={i}
                            truck={truck}
                            deleteTruckHandler={deleteTruckHandler}
                            handleOpenEditModal={handleOpenEditModal}
                        />
                    ))}
                </Grid>
            </Box>
            {modalType && (
                <Modal onClose={handleCloseModal}>
                    {modalType === "edit" && (
                        <EditTruck singleTruck={singleTruck} onClose={handleCloseModal} />
                    )}
                    {modalType === "add" && <AddTruck onClose={handleCloseModal} />}
                </Modal>
            )}
        </Fragment>
    );
};

export default Trucks;
