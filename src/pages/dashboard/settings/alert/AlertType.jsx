import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import EditIcon from '../../../../assets/svgs/settings/EditIcon'
import Modal from "../../../../components/modal/Modal";
import EditAlert from "./components/EditAlert";

const rows = [
  {
    id: 1,
    alertType: "SD Card removal",
    notificationType: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Enabled",
    actions: "",
  },
  {
    id: 2,
    alertType: "SD Card removal",
    notificationType: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Enabled",
    actions: "",
  },
  {
    id: 3,
    alertType: "SD Card removal",
    notificationType: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Enabled",
    actions: "",
  },
  {
    id: 4,
    alertType: "SD Card removal",
    notificationType: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Enabled",
    actions: "",
  },
  {
    id: 5,
    alertType: "SD Card removal",
    notificationType: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Enabled",
    actions: "",
  },
];

const AlertType = () => {
  const [modalType, setModalType] = useState(null);
  
  const handleOpenEditModal = () => {
    setModalType('edit');
    }
    
  const handleCloseModal = () => {
    setModalType(null);
    }
      
  const columns = [
    { field: "alertType", headerName: "ALERT TYPE", headerAlign: 'center', align: 'center', width: 250 },
    { 
      field: "severity", 
      headerName: "SEVERITY", 
      width: 150,
      headerAlign: 'center', 
      align: 'center',
      renderCell: (params) => (
        <Box sx={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
          margin: 'auto'
        }}>
          <Box sx={{
            background: '#ff6554',
            borderRadius: '8px',
            color: '#fff',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}>
            {params.value}
          </Box>
        </Box>
      )
    },
    { field: "notificationType", headerName: "NOTIFICATION TYPE", headerAlign: 'center', align: 'center', width: 250 },
    { 
      field: "status", 
      headerName: "STATUS", 
      width: 250, 
      headerAlign: 'center', 
      align: 'center',
      renderCell: (params) => (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          height: '100%'
        }}>
          <Typography>
            {params.value}
            </Typography>
            <FormControlLabel 
              control={
                <Switch
                  checked={params.value === 'Enabled'}
                  onChange={(e) => {
                    const newValue = e.target.checked ? 'Enabled' : 'Disabled';
                  const updatedRows = rows.map(row => row.id === params.id ? { ...row, status: newValue } : row);
                  params.api.updateRows([{ id: params.id, status: newValue }]);
                  }}
                  />
              }
              label=""
            />
        </Box>
      )
    },
    { 
      field: "actions", 
      headerName: "ACTIONS", 
      width: 250,
      headerAlign: 'center', 
      align: 'center',
      renderCell: () => (
        <Box 
          onClick={handleOpenEditModal}
          sx={{ 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            height: '100%'
          }}>
          <EditIcon />
        </Box>
      )
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
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px",
          }}
        >
          <DownloadIcon />
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          headerClassName={(params) => {
            return 'MuiDataGrid-colCell-center';
          }}
          cellClassName={(params) => {
            return 'MuiDataGrid-cell-center';
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
      {modalType === 'edit' && (
        <Modal onClose={handleCloseModal}>
          <EditAlert onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default AlertType;
