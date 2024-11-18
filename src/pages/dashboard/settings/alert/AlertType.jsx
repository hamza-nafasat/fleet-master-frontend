import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Fragment, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddIcon from "../../../../assets/svgs/settings/AddIcon";
import EditIcon from "../../../../assets/svgs/settings/EditIcon";
import HighIcon from "../../../../assets/svgs/settings/HighIcon";
import HighSpeedIcon from "../../../../assets/svgs/settings/HighSpeedIcon";
import InfenceIcon from "../../../../assets/svgs/settings/InfenceIcon";
import LowIcon from "../../../../assets/svgs/settings/LowIcon";
import MediumIcon from "../../../../assets/svgs/settings/MediumIcon";
import OutfenceIcon from "../../../../assets/svgs/settings/OutfenceIcon";
import Modal from "../../../../components/modal/Modal";
import {
  deleteAlertAction,
  getAllAlertsActions,
} from "../../../../redux/actions/alert.actions";
import {
  clearAlertError,
  clearAlertMessage,
} from "../../../../redux/slices/alert.slice";
import AddAlert from "./components/AddAlert";
import EditAlert from "./components/EditAlert";
import NoData from "../../../../components/noData/NoData";

const AlertType = () => {
  const dispatch = useDispatch();
  const { alerts, message, error } = useSelector((state) => state.alert);
  const [modalType, setModalType] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleOpenEditModal = (row) => {
    setSelectedAlert(row);
    setModalType("edit");
  };
  const handleOpenAddModal = () => setModalType("add");
  const handleCloseModal = () => {
    setModalType(null);
  };
  // delete alert function
  const deleteAlertHandler = async (id) => {
    confirmAlert({
      title: "Confirm delete Alert",
      message: "Are you sure you want to delete this alert?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (!id)
              return toast.info("Alert Id not found", { autoClose: 2000 });
            await dispatch(deleteAlertAction(id));
            await dispatch(getAllAlertsActions());
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

  useEffect(() => {
    dispatch(getAllAlertsActions());
  }, [dispatch]);

  useEffect(() => {
    if (alerts) setRows(alerts);
  }, [alerts]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearAlertMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAlertError());
    }
  }, [alerts, dispatch, error, message]);

  const columns = [
    {
      field: "type",
      headerName: "ALERT TYPE",
      width: 250,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "100%",
          }}
        >
          {params.value === "speed" ? (
            <HighSpeedIcon />
          ) : params.value === "infence" ? (
            <InfenceIcon />
          ) : (
            <OutfenceIcon />
          )}
          <Typography
            sx={{
              color: "rgba(0, 74, 142, 1)",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "500",
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "severity",
      headerName: "SEVERITY",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              p: 1,
              borderRadius: "8px",
              height: "35px",
              width: "110px",
              background:
                params.value === "high"
                  ? "rgba(255, 101, 84, 0.2)"
                  : params.value === "medium"
                    ? "rgba(248, 152, 34, 0.2)"
                    : "rgba(58, 163, 87, 0.2)",
            }}
          >
            {params.value === "high" ? (
              <HighIcon />
            ) : params.value === "medium" ? (
              <MediumIcon />
            ) : (
              <LowIcon />
            )}
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: "600",
                color:
                  params.value === "high"
                    ? "rgba(255, 70, 70, 1)"
                    : params.value === "medium"
                      ? "rgba(248, 152, 34, 1)"
                      : "rgba(58, 163, 87, 1)",
              }}
            >
              {params.value?.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "platform",
      headerName: "NOTIFICATION TYPE",
      width: 250,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#000",
            fontSize: { xs: "14px", sm: "16px" },
          }}
        >
          <Box
            sx={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: `2px solid ${params.value === "platform" ? "rgba(248, 152, 34, 1)" : "rgba(0, 103, 194, 1)"}`,
            }}
          ></Box>
          {params.value == "platform" ? "On Platform" : "On Email"}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 250,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            height: "100%",
          }}
        >
          <Typography
            sx={{ color: "#000", fontSize: { xs: "14px", sm: "16px" } }}
          >
            {params.value}
          </Typography>
          <FormControlLabel
            control={<Switch readOnly checked={params.value === "enable"} />}
            label=""
          />
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 250,
      renderCell: (params) => (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            height: "100%",
          }}
        >
          <EditIcon onClick={() => handleOpenEditModal(params?.row)} />

          <button
            style={{
              background: "transparent",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => deleteAlertHandler(params?.row?._id)}
          >
            <DeleteForeverIcon
              style={{ fontSize: "28px", color: "rgba(255, 70, 70, 1)" }}
            />
          </button>
        </Box>
      ),
    },
  ];
  return (
    <Fragment>
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
            padding: "10px 30px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Box sx={{ cursor: "pointer" }} onClick={handleOpenAddModal}>
            <AddIcon />
          </Box>
        </Box>
        {alerts.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5, 10, 20]}
            headerClassName={() => {
              return "MuiDataGrid-colCell-center";
            }}
            cellClassName={() => {
              return "MuiDataGrid-cell-center";
            }}
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
        ) : (
          <NoData />
        )}
      </Box>
      {modalType === "edit" && (
        <Modal onClose={handleCloseModal}>
          <EditAlert alert={selectedAlert} onClose={handleCloseModal} />
        </Modal>
      )}
      {modalType === "add" && (
        <Modal onClose={handleCloseModal}>
          <AddAlert onClose={handleCloseModal} />
        </Modal>
      )}
    </Fragment>
  );
};

export default AlertType;
