import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from "../../../../assets/svgs/geofence/DeleteIcon";
import EditIcon from "../../../../assets/svgs/geofence/EditIcon";
import ViewIcon from "../../../../assets/svgs/geofence/ViewIcon";
import AddIcon from "../../../../assets/svgs/settings/AddIcon";
import Modal from "../../../../components/modal/Modal";
import { deleteGeofenceAction, getAllGeofenceAction } from "../../../../redux/actions/geofence.action";
import { clearGeofenceError, clearGeofenceMessage } from "../../../../redux/slices/geofence.slice";
import AddFence from "./components/AddFence";
import EditFence from "./components/EditFence";
import ViewFence from "./components/ViewFence";

const GeoFence = () => {
  const dispatch = useDispatch();
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editSelectedRow, setEditSelectedRow] = useState();
  const [selectedFence, setSelectedFence] = useState(null);
  const { message, error, geofences } = useSelector((state) => state.geofence);

  const handleAddModal = () => {
    setModalType("add");
  };
  const handleViewModal = (row) => {
    // console.log("viewed row", row);
    setSelectedFence(row);
    setModalType("view");
  };
  const handleEditModal = (row) => {
    setEditSelectedRow(row);
    setModalType("edit");
  };
  const handleDeleteModal = async (row) => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this Geofence?",
      closeOnClickOutside: false,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setIsDelLoading(true);
            await dispatch(deleteGeofenceAction(row._id));
            await dispatch(getAllGeofenceAction());
            setIsDelLoading(false);
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Delete action cancelled", { autoClose: 2000 }),
        },
      ],
    });
  };
  const handleCloseModal = () => {
    setModalType(null);
  };
  const columns = [
    {
      field: "name",
      headerName: "GEOFENCE NAME",
      headerAlign: "center",
      align: "center",
      width: 230,
    },
    {
      field: "status",
      headerName: "STATUS",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "alert",
      headerName: "ALERT",
      headerAlign: "center",
      align: "center",
      width: 130,
    },
    {
      field: "startDate",
      headerName: "START TIME",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (params) => `${new Date(params.value).toLocaleString()}`,
    },
    {
      field: "endDate",
      headerName: "END TIME",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (params) => `${new Date(params.value).toLocaleString()}`,
    },
    {
      field: "operation",
      headerName: "OPERATION",
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "7px",
          }}
        >
          <Box sx={{ cursor: "pointer" }} onClick={() => handleViewModal(params.row)}>
            <ViewIcon />
          </Box>
          <Box sx={{ cursor: "pointer" }} onClick={() => handleEditModal(params.row)}>
            <EditIcon />
          </Box>
          <Box
            sx={{
              cursor: isDelLoading ? "not-allowed" : "pointer",
            }}
            onClick={() => handleDeleteModal(params.row)}
          >
            <DeleteIcon />
          </Box>
        </Box>
      ),
    },
  ];

  // useEffect for showing message and error
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearGeofenceMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearGeofenceError());
    }
  }, [error, message, dispatch]);

  // useEffect for getting geofences
  useEffect(() => {
    dispatch(getAllGeofenceAction());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "24px 24px 0 0",
        marginTop: "-3.5rem",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <Box sx={{ cursor: "pointer" }} onClick={handleAddModal}>
          <AddIcon />
        </Box>
      </Box>
      <DataGrid
        rows={geofences}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        sx={{
          "& .MuiDataGrid-row.even-row": {
            backgroundColor: "#fafafa",
          },
          "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle": {
            fontSize: {
              xs: "14px",
              md: "16px",
            },
            fontWeight: 600,
            color: "#111111",
          },
          "& .MuiDataGrid-row .MuiDataGrid-cell": {
            fontSize: {
              xs: "14px",
              md: "16px",
            },
            background: "#fafafa",
            fontWeight: 400,
            color: "rgba(17, 17, 17, 0.6)",
          },
          "& .MuiDataGrid-root": {
            borderTopLeftRadius: "24px !important",
            borderTopRightRadius: "24px !important",
            border: "0 !important",
            overflow: "hidden",
            width: "100%",
          },
          "& .MuiDataGrid-main": {
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            width: "100%",
            padding: "0 10px",
          },
          "& .MuiDataGrid-overlay": {
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          "& .MuiDataGrid-scrollbar": {
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#00193333",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#006bce",
              borderRadius: "10px",
            },
          },
        }}
      />
      {modalType === "add" && (
        <Modal onClose={handleCloseModal}>
          <AddFence onClose={handleCloseModal} />
        </Modal>
      )}
      {modalType === "view" && (
        <Modal onClose={handleCloseModal}>
          <ViewFence fence={selectedFence} onClose={handleCloseModal} editModal={handleEditModal} />
        </Modal>
      )}
      {modalType === "edit" && (
        <Modal onClose={handleCloseModal}>
          <EditFence editSelectedRow={editSelectedRow} onClose={handleCloseModal} />
        </Modal>
      )}
    </Box>
  );
};

export default GeoFence;
