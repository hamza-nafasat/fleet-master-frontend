import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import EditIcon from "../../../../assets/svgs/settings/EditIcon";
import Modal from "../../../../components/modal/Modal";
import EditAlert from "./components/EditAlert";
import HighSpeedIcon from "../../../../assets/svgs/settings/HighSpeedIcon";
import InfenceIcon from "../../../../assets/svgs/settings/InfenceIcon";
import OutfenceIcon from "../../../../assets/svgs/settings/OutfenceIcon";
import HighIcon from "../../../../assets/svgs/settings/HighIcon";
import LowIcon from "../../../../assets/svgs/settings/LowIcon";
import MediumIcon from "../../../../assets/svgs/settings/MediumIcon";
import AddAlert from "./components/AddAlert";
import AddIcon from "../../../../assets/svgs/settings/AddIcon";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const rows = [
  {
    id: 1,
    alertType: "High Speed",
    notificationType: "On Email",
    date: "01/14/2024 - 02:31",
    severity: "High",
    status: "Enabled",
    actions: "",
  },
  {
    id: 2,
    alertType: "Out Fence",
    notificationType: "On Platform",
    date: "01/14/2024 - 02:31",
    severity: "Medium",
    status: "Enabled",
    actions: "",
  },
  {
    id: 3,
    alertType: "High Speed",
    notificationType: "On Email",
    date: "01/14/2024 - 02:31",
    severity: "High",
    status: "Enabled",
    actions: "",
  },
  {
    id: 4,
    alertType: "In Fence",
    notificationType: "On Platform",
    date: "01/14/2024 - 02:31",
    severity: "Low",
    status: "Enabled",
    actions: "",
  },
  {
    id: 5,
    alertType: "Out Fence",
    notificationType: "On Platform",
    date: "01/14/2024 - 02:31",
    severity: "Medium",
    status: "Enabled",
    actions: "",
  },
];

const AlertType = () => {
  const [modalType, setModalType] = useState(null);

  const handleOpenEditModal = () => setModalType("edit");
  const handleOpenAddModal = () => setModalType("add");
  const handleCloseModal = () => {
    setModalType(null);
  };

  const columns = [
    {
      field: "alertType",
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
          {params.value === "High Speed" ? (
            <HighSpeedIcon />
          ) : params.value === "In Fence" ? (
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
                params.value === "High"
                  ? "rgba(255, 101, 84, 0.2)"
                  : params.value === "Medium"
                    ? "rgba(248, 152, 34, 0.2)"
                    : "rgba(58, 163, 87, 0.2)",
            }}
          >
            {params.value === "High" ? (
              <HighIcon />
            ) : params.value === "Medium" ? (
              <MediumIcon />
            ) : (
              <LowIcon />
            )}
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: "600",
                color:
                  params.value === "High"
                    ? "rgba(255, 70, 70, 1)"
                    : params.value === "Medium"
                      ? "rgba(248, 152, 34, 1)"
                      : "rgba(58, 163, 87, 1)",
              }}
            >
              {params.value}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "notificationType",
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
              border: `2px solid ${params.value === "On Platform" ? "rgba(248, 152, 34, 1)" : "rgba(0, 103, 194, 1)"}`,
            }}
          ></Box>
          {params.value}
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
            control={
              <Switch
                checked={params.value === "Enabled"}
                onChange={(e) => {
                  const newValue = e.target.checked ? "Enabled" : "Disabled";
                  const updatedRows = rows.map((row) =>
                    row.id === params.id ? { ...row, status: newValue } : row
                  );
                  params.api.updateRows([{ id: params.id, status: newValue }]);
                }}
              />
            }
            label=""
          />
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 250,
      renderCell: () => (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            height: "100%",
          }}
        >
          <Box sx={{display: 'flex', aligItems: 'center', cursor: 'pointer'}} onClick={handleOpenEditModal}>
            <EditIcon />
          </Box>
          <Box sx={{display: 'flex', aligItems: 'center', cursor: 'pointer'}}>
            <DeleteForeverIcon
              style={{ fontSize: "28px", color: "rgba(255, 70, 70, 1)" }}
            />
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <>
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
          <DownloadIcon />
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          headerClassName={(params) => {
            return "MuiDataGrid-colCell-center";
          }}
          cellClassName={(params) => {
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
      </Box>
      {modalType === "edit" && (
        <Modal onClose={handleCloseModal}>
          <EditAlert onClose={handleCloseModal} />
        </Modal>
      )}
      {modalType === "add" && (
        <Modal onClose={handleCloseModal}>
          <AddAlert onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default AlertType;
