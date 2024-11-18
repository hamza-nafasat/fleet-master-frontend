import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";

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

const DeviceReport = () => {
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
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
          gap: {
            xs: "1.5rem",
            md: "30px",
          },
          padding: "20px 20px 40px 20px",
          background: "#ffffff",
          borderRadius: "24px 24px 0 0",
          borderBottom: "1px solid #11111133",
        }}
      >
        <TextField
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              borderColor: "#11111133",
              borderRadius: "8px",
            },
            "& .MuiInputBase-input": {
              padding: "0 10px",
              height: "40px",
              color: "#11111199",
              fontSize: "16px",
            },
          }}
          label="From"
          type="datetime-local"
        //   value={timeFrom}
        //   onChange={(e) => setTimeFrom(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              borderColor: "#11111133",
              borderRadius: "8px",
            },
            "& .MuiInputBase-input": {
              padding: "0 10px",
              height: "40px",
              color: "#11111199",
              fontSize: "16px",
            },
          }}
          label="To"
          type="datetime-local"
        //   value={timeTo}
        //   onChange={(e) => setTimeTo(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              borderColor: "#11111133",
              borderRadius: "8px",
            },
            "& .MuiSelect-select": {
              padding: "8px 10px",
              color: "#11111199",
              fontSize: "16px",
            },
            "& .MuiFormLabel-root": {
              top: "-8px ",
            },
          }}
          select
          label="Device Name"
        //   value={plateNumber}
        //   onChange={(e) => setPlateNumber(e.target.value)}
        >
            <MenuItem value='Device name'>
              Device name
            </MenuItem>
        </TextField>
        <Button
        //   disabled={isLoading}
          variant="contained"
        //   onClick={getReportsHandler}
          sx={{
            width: "100%",
            borderRadius: "8px",
            ":disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
        >
          {/* {isLoading ? <CircularProgress sx={{ color: "#ffffff", mx: 2 }} size={24} /> : null} */}
          {/* {isLoading ? "Loading..." : "Get Reports"} */}
          Get Reports
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button sx={{ color: "#fff", padding: "8px 12px" }}>
            Export PDF
          </Button>
          <Button sx={{ color: "#fff", padding: "8px 12px" }}>
            Export CSV
          </Button>
        </Box>
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

export default DeviceReport;