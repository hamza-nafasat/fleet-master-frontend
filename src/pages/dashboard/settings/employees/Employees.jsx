import { Fragment, useCallback, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import AddIcon from "../../../../assets/svgs/settings/AddIcon";
import EmployeeCard from "./components/EmployeeCard";
import Modal from "../../../../components/modal/Modal";
import EditUser from "./components/EditEmployee";
import AddUser from "./components/AddEmployee";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { clearEmployError, clearEmployMessage } from "../../../../redux/slices/employees.slice";
import { deleteEmployAction, getAllEmployeesAction } from "../../../../redux/actions/employees.action";
import { useDispatch, useSelector } from "react-redux";

const Employees = () => {
    const dispatch = useDispatch();
    const [modalType, setModalType] = useState(null);
    const [selectedEmploy, setSelectedEmploy] = useState(null);
    const { employees, message, error } = useSelector((state) => state.employ);

    const handleOpenAddUserModal = () => {
        setModalType("add");
        setSelectedEmploy(null);
    };

    const handleOpenEditModal = (employ) => {
        setModalType("edit");
        setSelectedEmploy(employ);
    };

    const handleCloseModal = useCallback(() => setModalType(null), []);

    const handleDeleteUser = (employId) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to delete this user?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => await dispatch(deleteEmployAction(employId)),
                    className: "confirm-alert-button",
                },
                {
                    label: "No",
                    onClick: () => toast.info("Delete action canceled"),
                    className: "confirm-alert-button",
                },
            ],
            className: "confirm-alert-container",
        });
    };

    // show success and error message
    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearEmployMessage());
            handleCloseModal();
        }
        if (error) {
            toast.error(error);
            dispatch(clearEmployError());
        }
        dispatch(getAllEmployeesAction());
    }, [message, error, dispatch, handleCloseModal]);

    return (
        <Fragment>
            <Box sx={{ background: "#F5F4F4", padding: { xs: "5px", md: "10px" }, borderRadius: "24px" }}>
                <Box sx={{ padding: "10px", display: "flex", justifyContent: "flex-end" }}>
                    <Box onClick={handleOpenAddUserModal} sx={{ cursor: "pointer" }}>
                        <AddIcon />
                    </Box>
                </Box>
                <Grid container spacing={2}
                    style={{
                        marginTop: "50px",
                        display: "flex",
                        rowGap: "4rem",
                    }}
                >
                    {employees?.map((employ, i) => (
                        <EmployeeCard
                            key={i}
                            employ={employ}
                            handleOpenEditModal={handleOpenEditModal}
                            handleDeleteUser={handleDeleteUser}
                        />
                    ))}
                </Grid>
            </Box>
            {modalType === "edit" && (
                <Modal onClose={handleCloseModal}>
                    <EditUser employ={selectedEmploy} onClose={handleCloseModal} />
                </Modal>
            )}
            {modalType === "add" && (
                <Modal onClose={handleCloseModal}>
                    <AddUser onClose={handleCloseModal} />
                </Modal>
            )}
        </Fragment>
    );
};

export default Employees;
