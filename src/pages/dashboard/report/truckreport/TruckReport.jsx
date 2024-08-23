import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";

const rows = [
  {
    id: 1,
    date: "2024-05-22",
    timeFrom: "08:00",
    timeTo: "17:00",
    fleetNumber: "3324",
    plateNumber: "3843h",
    driver: "John Doe",
    deviceId: "665847057603",
    speed: "60",
    status: "Connected",
    longitude: "47.6649618",
    latitude: "24.2330492",
  },
  {
    id: 2,
    date: "2024-05-22",
    timeFrom: "08:00",
    timeTo: "17:00",
    fleetNumber: "3455",
    plateNumber: "3843h",
    driver: "John Doe",
    deviceId: "665847057603",
    speed: "60",
    status: "Connected",
    longitude: "47.6649618",
    latitude: "24.2330492",
  },
  {
    id: 3,
    date: "2024-05-22",
    timeFrom: "08:00",
    timeTo: "17:00",
    fleetNumber: "5756",
    plateNumber: "3843h",
    driver: "John Doe",
    deviceId: "665847057603",
    speed: "60",
    status: "Connected",
    longitude: "47.6649618",
    latitude: "24.2330492",
  },
  {
    id: 4,
    date: "2024-05-22",
    timeFrom: "08:00",
    timeTo: "17:00",
    fleetNumber: "8777",
    plateNumber: "3843h",
    driver: "John Doe",
    deviceId: "665847057603",
    speed: "60",
    status: "Connected",
    longitude: "47.6649618",
    latitude: "24.2330492",
  },
  {
    id: 9,
    date: "2024-05-22",
    timeFrom: "08:00",
    timeTo: "17:00",
    fleetNumber: "2364",
    plateNumber: "3843h",
    driver: "John Doe",
    deviceId: "665847057603",
    speed: "60",
    status: "Disconnected",
    longitude: "47.6649618",
    latitude: "24.2330492",
  },
  {
    id: 2,
    date: "2024-05-22",
    timeFrom: "08:00",
    timeTo: "17:00",
    fleetNumber: "9807",
    plateNumber: "3843h",
    driver: "John Doe",
    deviceId: "665847057603",
    speed: "60",
    status: "Disconnected",
    longitude: "47.6649618",
    latitude: "24.2330492",
  },
];

const columns = [
  { field: "date", headerName: "DATE/TIME", headerAlign: 'center', align: 'center', width: 150 },
  { field: "fleetNumber", headerName: "FLEET NUMBER", headerAlign: 'center', align: 'center', width: 130 },
  { field: "plateNumber", headerName: "PLATE NUMBER", headerAlign: 'center', align: 'center', width: 150 },
  { field: "driver", headerName: "DRIVER", headerAlign: 'center', align: 'center', width: 120 },
  { field: "deviceId", headerName: "DEVICE ID", headerAlign: 'center', align: 'center', width: 150 },
  { field: "speed", headerName: "SPEED", headerAlign: 'center', align: 'center', width: 90 },
  { 
    field: "status", 
    headerName: "STATUS", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
       }}>
        <Box sx={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: params.value === 'Connected' ? '#3aa357' : '#e63946',
        }}>
        </Box>
        <Typography>
            {params.value}
        </Typography>
      </Box>
    )
  },
  { field: "longitude", headerName: "LONGITUDE", width: 150 },
  { field: "latitude", headerName: "LATITUDE", width: 130 },
];

const TruckReport = () => {
  const [date, setDate] = useState(null);
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [fleetNumber, setFleetNumber] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleFilter = () => {
    const filtered = rows.filter((row) => {
      const matchesDate = date
        ? row.date === date.toISOString().split("T")[0]
        : true;
      const matchesTimeFrom = timeFrom ? row.timeFrom >= timeFrom : true;
      const matchesTimeTo = timeTo ? row.timeTo <= timeTo : true;
      const matchesFleetNumber = fleetNumber
        ? row.fleetNumber === fleetNumber
        : true;
      return (
        matchesDate && matchesTimeFrom && matchesTimeTo && matchesFleetNumber
      );
    });
    setFilteredRows(filtered);
  };

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
            xs: 'wrap',
            md: 'nowrap'
          },
          gap: {
            xs: '1.5rem',
            md: "30px"
          },
          padding: "20px 20px 40px 20px",
          background: "#ffffff",
          borderRadius: "24px 24px 0 0",
          borderBottom: "1px solid #11111133",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                borderColor: "#11111133",
                borderRadius: "8px",
              },
              "& .MuiInputBase-input": {
                padding: "0 10px",
                height: "40px",
                color: '#11111199',
                fontSize: '16px'
              },
              "& .MuiFormLabel-root": {
                top: "-8px ",
              },
            }}
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
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
              color: '#11111199',
              fontSize: '16px'
            },
          }}
          label="Time From"
          type="time"
          value={timeFrom}
          onChange={(e) => setTimeFrom(e.target.value)}
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
              color: '#11111199',
              fontSize: '16px'
            },
          }}
          label="Time To"
          type="time"
          value={timeTo}
          onChange={(e) => setTimeTo(e.target.value)}
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
              color: '#11111199',
              fontSize: '16px'
            },
            "& .MuiFormLabel-root": {
              top: "-8px ",
            },
          }}
          select
          label="Fleet Number"
          value={fleetNumber}
          onChange={(e) => setFleetNumber(e.target.value)}
        >
          {Array.from(new Set(rows.map((row) => row.fleetNumber))).map(
            (fleetNumber) => (
              <MenuItem key={fleetNumber} value={fleetNumber}>
                {fleetNumber}
              </MenuItem>
            )
          )}
        </TextField>
        <Button
          variant="contained"
          onClick={handleFilter}
          sx={{ width: "100%", borderRadius: "8px" }}
        >
          Show Report
        </Button>
      </Box>
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
        rows={filteredRows}
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

export default TruckReport;
