import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import LocationIcon from "../../../../assets/svgs/home/LocationIcon";
import VideoRecordIcon from "../../../../assets/svgs/home/VideoRecordIcon";
import PlayIcon from "../../../../assets/svgs/home/PlayIcon";

const rows = [
  {
    id: 1,
    event: "01/14/2024 - 02:31",
    fleetNumber: "500049",
    plateNumber: "6752RBB",
    driverName: "Alice Smith",
    actions: "Unacknowledged",
  },
];

const columns = [
  { field: "event", headerName: "EVENT DATE/TIME", headerAlign: 'center', align: 'center', width: 230 },
  { field: "fleetNumber", headerName: "FLEET NUMBER", headerAlign: 'center', align: 'center', width: 230 },
  { field: "plateNumber", headerName: "PLATE NUMBER", headerAlign: 'center', align: 'center', width: 230 },
  { field: "driverName", headerName: "DRIVER NAME", headerAlign: 'center', align: 'center', width: 230 },
  { field: "actions", headerName: "ACTIONS", headerAlign: 'center', align: 'center', width: 230 },
];

const SOS = () => {
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
        <DownloadIcon />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
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
    </Box>
  );
};

export default SOS;
