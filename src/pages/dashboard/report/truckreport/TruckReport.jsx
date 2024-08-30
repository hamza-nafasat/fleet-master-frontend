import { Box, Button, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import { getSingleTruckReportsAction } from "../../../../redux/actions/admin.actions";
import jsPDF from "jspdf";
import "jspdf-autotable";

import logo from "../../../../assets/images/logo.png";
const columns = [
  { field: "plateNumber", headerName: "PLATE NUMBER", headerAlign: "center", align: "center", width: 100 },
  { field: "driverName", headerName: "DRIVER", headerAlign: "center", align: "center", width: 200 },
  { field: "deviceId", headerName: "DEVICE ID", headerAlign: "center", align: "center", width: 280 },
  {
    field: "speed",
    headerName: "SPEED",
    headerAlign: "center",
    align: "center",
    width: 90,
    renderCell: (params) => `${Math.round(params.value)} km/h`,
  },
  {
    field: "truckStatus",
    headerName: "STATUS",
    width: 140,
    renderCell: (params) => (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: params.value === "connected" ? "#3aa357" : "#e63946",
          }}
        ></Box>
        <Typography>{params.value}</Typography>
      </Box>
    ),
  },
  { field: "longitude", headerName: "LONGITUDE", width: 120 },
  { field: "latitude", headerName: "LATITUDE", width: 120 },
  {
    field: "createdAt",
    headerName: "DATE",
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      if (!params.value) return "";
      const date = new Date(params.value);
      const formattedDate = date.toLocaleDateString("en-GB");
      const formattedTime = date.toLocaleTimeString("en-GB", { hour12: false });
      return `${formattedDate} ${formattedTime}`;
    },
    width: 200,
  },
];

const TruckReport = () => {
  const dispatch = useDispatch();
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [plateNumbers, setPlateNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { trucks } = useSelector((state) => state.truck);
  const { singleTruckReport } = useSelector((state) => state.admin);

  const getReportsHandler = async () => {
    setIsLoading(true);
    await dispatch(getSingleTruckReportsAction(timeTo, timeFrom, plateNumber));
    setIsLoading(false);
  };

  // const downloadPDF = async (data) => {
  //   const doc = new jsPDF();
  //   let yOffset = 15;

  //   // Centered Text Function
  //   const centerText = (text, y, fontSize = 16, color = [0, 0, 0]) => {
  //     doc.setFontSize(fontSize);
  //     doc.setTextColor(...color);
  //     const textWidth = doc.getTextWidth(text);
  //     const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;
  //     doc.text(text, x, y);
  //   };

  //   // Add Date and Time in Upper Left Corner
  //   const addDateAndTime = () => {
  //     const now = new Date();
  //     const formattedDate = now.toLocaleDateString();
  //     const formattedTime = now.toLocaleTimeString();
  //     doc.setFontSize(8); // Smaller font size
  //     doc.setTextColor(150, 150, 150); // Light gray color for the date and time
  //     doc.text(`Generated on: ${formattedDate} ${formattedTime}`, 8, 5);
  //   };

  //   // Add Truck Data Table with Heading
  //   const addTruckTable = () => {
  //     const truckData = data.map((truck, index) => [
  //       index + 1,
  //       truck.plateNumber,
  //       truck.driverName,
  //       truck.truckStatus.toUpperCase(),
  //       truck.latitude.toFixed(4),
  //       truck.longitude.toFixed(4),
  //       truck.speed.toFixed(2),
  //       new Date(truck.createdAt).toLocaleString(),
  //     ]);

  //     // Add Table Heading
  //     centerText("Truck Report", yOffset, 18, [63, 81, 181]);
  //     yOffset += 10;

  //     // Add Truck Data Table
  //     doc.autoTable({
  //       head: [
  //         [
  //           "#",
  //           "Plate Number",
  //           "Driver Name",
  //           "Truck Status",
  //           "Latitude",
  //           "Longitude",
  //           "Speed",
  //           "Created At",
  //         ],
  //       ],
  //       body: truckData,
  //       startY: yOffset,
  //       styles: {
  //         halign: "center",
  //         valign: "middle",
  //         fontSize: 10,
  //         cellPadding: 4,
  //         lineColor: [200, 200, 200],
  //         lineWidth: 0.5,
  //       },
  //       headStyles: {
  //         fillColor: [33, 150, 243],
  //         textcolor: [255, 255, 255],
  //       },
  //       alternateRowStyles: {
  //         fillColor: [240, 240, 240],
  //       },
  //     });
  //   };

  //   addDateAndTime();
  //   addTruckTable();

  //   // Save the PDF
  //   doc.save("truck-report.pdf");
  // };

  const downloadPDF = async (data, userLogo = null) => {
    const doc = new jsPDF();
    let yOffset = 30;

    // Add Company Logo with Blue Background
    const addCompanyLogo = () => {
      const img = new Image();
      img.src = logo; // Replace with the path to your company logo
      doc.setFillColor(33, 150, 243); // Blue background color
      doc.rect(10, 5, 50, 20, "F"); // Position and size of the blue background rectangle
      doc.addImage(img, "PNG", 15, 8, 40, 15); // Position and size of the logo
    };

    // Add User Logo (if provided)
    const addUserLogo = () => {
      if (userLogo) {
        const img = new Image();
        img.src = userLogo;
        doc.addImage(img, "PNG", 170, 5, 30, 20); // Position and size of the user logo
      }
    };

    // Centered Text Function
    const centerText = (text, y, fontSize = 16, color = [0, 0, 0], bold = false) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      if (bold) {
        doc.setFont("helvetica", "bold");
      } else {
        doc.setFont("helvetica", "normal");
      }
      const textWidth = doc.getTextWidth(text);
      const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;
      doc.text(text, x, y);
    };

    // Add Date and Time in Upper Right Corner
    const addDateAndTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Generated on: ${formattedDate} ${formattedTime}`,
        doc.internal.pageSize.getWidth() - 60,
        25
      );
    };

    // Add Header
    const addHeader = () => {
      addCompanyLogo();
      addUserLogo();
      centerText("Truck Report", yOffset, 22, [33, 150, 243], true);
      yOffset += 10;
      centerText("Fleet Management", yOffset, 14, [63, 81, 181]);
      yOffset += 20;
    };

    // Add Truck Data Table with Heading
    const addTruckTable = () => {
      const truckData = data.map((truck, index) => [
        index + 1,
        truck.plateNumber,
        truck.driverName,
        truck.truckStatus.toUpperCase(),
        truck.latitude.toFixed(4),
        truck.longitude.toFixed(4),
        truck.speed.toFixed(2),
        new Date(truck.createdAt).toLocaleString(),
      ]);

      // Add Truck Data Table
      doc.autoTable({
        head: [
          [
            "#",
            "Plate Number",
            "Driver Name",
            "Truck Status",
            "Latitude",
            "Longitude",
            "Speed",
            "Created At",
          ],
        ],
        body: truckData,
        startY: yOffset,
        theme: "grid",
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 10,
          cellPadding: 4,
          lineColor: [200, 200, 200],
          lineWidth: 0.5,
        },
        headStyles: {
          fillColor: [63, 81, 181],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        tableLineColor: [200, 200, 200],
        tableLineWidth: 0.5,
      });
    };

    addHeader();
    addDateAndTime();
    addTruckTable();

    // Add Footer
    const addFooter = () => {
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        "Company Name | Company Address | Phone: (123) 456-7890",
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    };

    addFooter();

    // Save the PDF
    doc.save("truck-report.pdf");
  };

  useEffect(() => {
    dispatch(getSingleTruckReportsAction());
  }, [dispatch]);

  useEffect(() => {
    if (singleTruckReport) {
      const flattenedData = singleTruckReport.map((report) => ({
        ...report,
        plateNumber: report.truck?.plateNumber || "",
        driverName: `${report.truck?.assignedTo?.firstName} ${report.truck?.assignedTo?.lastName}` || "",
        deviceId: report.truck?.devices?.find((device) => device.type == "gps")?._id || "",
        truckStatus: report.truck?.status || "",
        fleetNumber: report.truck?.fleetnumber || "",
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      }));
      setFilteredRows(flattenedData);
    }
  }, [singleTruckReport]);

  useEffect(() => {
    if (trucks) setPlateNumbers(trucks.map((truck) => truck.plateNumber));
  }, [trucks]);

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
              color: "#11111199",
              fontSize: "16px",
            },
          }}
          label="To"
          type="datetime-local"
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
              color: "#11111199",
              fontSize: "16px",
            },
            "& .MuiFormLabel-root": {
              top: "-8px ",
            },
          }}
          select
          label="Truk Plate Number"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        >
          {plateNumbers?.map((plateNumber) => (
            <MenuItem key={plateNumber} value={plateNumber}>
              {plateNumber}
            </MenuItem>
          ))}
        </TextField>
        <Button
          disabled={isLoading}
          variant="contained"
          onClick={getReportsHandler}
          sx={{
            width: "100%",
            borderRadius: "8px",
            ":disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
        >
          {isLoading ? <CircularProgress sx={{ color: "#ffffff", mx: 2 }} size={24} /> : null}
          {isLoading ? "Loading..." : "Get Reports"}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <DownloadIcon onClick={() => downloadPDF(filteredRows)} />
      </Box>
      <DataGrid
        rows={filteredRows}
        getRowId={(row) => row._id}
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
