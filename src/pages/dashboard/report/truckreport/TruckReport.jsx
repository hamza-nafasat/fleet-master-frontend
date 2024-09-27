import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import { getSingleTruckReportsAction } from "../../../../redux/actions/admin.actions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { IoCloudUploadOutline } from "react-icons/io5";
import logo from "../../../../assets/images/logo.png";
import CameraIcon from "../../../../assets/svgs/modal/CameraIcon";
import NoData from "../../../../components/noData/NoData";

const columns = [
  {
    field: "plateNumber",
    headerName: "PLATE NUMBER",
    headerAlign: "center",
    align: "center",
    width: 100,
  },
  {
    field: "driverName",
    headerName: "DRIVER",
    headerAlign: "center",
    align: "center",
    width: 200,
  },
  {
    field: "deviceId",
    headerName: "DEVICE ID",
    headerAlign: "center",
    align: "center",
    width: 280,
  },
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
  const [profile, setProfile] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { trucks } = useSelector((state) => state.truck);
  const { singleTruckReport } = useSelector((state) => state.admin);

  const getReportsHandler = async () => {
    setIsLoading(true);
    await dispatch(getSingleTruckReportsAction(timeTo, timeFrom, plateNumber));
    setIsLoading(false);
  };

  const handleImageSrc = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // download pdf
  const downloadPDF = async () => {
    const doc = new jsPDF();
    let yOffset = 30;

    // Function to add company logo
    const addCompanyLogo = async (userLogo) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = userLogo || logo;

        img.onload = () => {
          const logoX = (doc.internal.pageSize.getWidth() - 30) / 2; // Center logo
          doc.setFillColor(33, 150, 243);
          // doc.rect(logoX,5,40, 35, "F");
          doc.addImage(img, "PNG", logoX + 5, 8, 30, 30); // Logo positioning
          resolve();
        };

        img.onerror = () => {
          console.error("Failed to load logo image.");
          reject(new Error("Image loading failed"));
        };
      });
    };

    // Center text function
    const centerText = (text, y, fontSize, color, bold = false) => {
      doc.setFontSize(fontSize);
      if (Array.isArray(color) && color.length === 3) {
        doc.setTextColor(color[0], color[1], color[2]);
      } else {
        console.error("Invalid color format", color);
      }
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(text, doc.internal.pageSize.getWidth() / 2, y, {
        align: "center",
      });
    };

    // Add Date in top left corner
    const date = new Date();
    const formattedDate = date.toLocaleString();
    doc.setFontSize(9);
    doc.text(`Date: ${formattedDate}`, 10, 10);
    yOffset += 15; // Adjust yOffset for logo

    // Add Header
    await addCompanyLogo(profile); // Add the logo
    // yOffset += 10; // Adjust yOffset for logo
    doc.setFontSize(15);
    doc.setFont("helvetica", "normal");
    doc.text("Fleet Master Truck Report", (doc.internal.pageSize.getWidth() - 50) / 2, yOffset); // Left align
    yOffset += 10;

    const tableColumn = [
      "Plate Number",
      "Driver",
      "Device ID",
      "Speed",
      "Status",
      "Longitude",
      "Latitude",
      "Date",
    ];

    const tableRows = filteredRows.map((row) => [
      row.plateNumber,
      row.driverName,
      row.deviceId,
      `${Math.round(row.speed)} km/h`,
      row.truckStatus,
      row.longitude,
      row.latitude,
      new Date(row.createdAt).toLocaleString(),
    ]);

    const remainingPageHeight = doc.internal.pageSize.height - yOffset - 20; // Space left on the page

    if (remainingPageHeight < 40) {
      doc.addPage();
      yOffset = 10;
    }

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: yOffset,
      theme: "grid",
      styles: { cellPadding: 2 },
      headStyles: { fillColor: [52, 152, 219] },
      bodyStyles: { valign: "middle" },
      columnStyles: { 0: { halign: "center" } },
      pageBreak: "auto",
    });

    yOffset = doc.lastAutoTable.finalY + 10; // Update position after table

    // Add Footer
    const footerText = "Generated by Fleet Management System";
    doc.text(footerText, 10, doc.internal.pageSize.height - 10);

    // Save the PDF
    doc.save("truck-report.pdf");
    handleClose();
  };

  // download csv
  const exportToExcel = async () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(singleTruckReport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
      // Buffer for Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const eData = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(eData);
      link.download = "members.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
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
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button onClick={handleOpen} sx={{ color: "#fff", padding: "8px 12px" }}>
            Export PDF
          </Button>
          <Button onClick={exportToExcel} sx={{ color: "#fff", padding: "8px 12px" }}>
            Export CSV
          </Button>
        </Box>
      </Box>
      {singleTruckReport.length > 0 ? (
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
      ) : (
        <NoData />
      )}
      <Modal open={open} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }}>
        <Box
          sx={{
            padding: "20px",
            background: "#fff",
            width: { xs: "300px", md: "500px" },
            height: "auto",
            borderRadius: "12px",
          }}
        >
          <ModalContent
            onChange={handleImageSrc}
            profile={profile}
            generatePdf={() => downloadPDF(filteredRows)}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default TruckReport;

const ModalContent = ({ onChange, profile, generatePdf }) => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "255px",
          border: "1px solid #0000004f",
          borderRadius: "12px",
          mb: 2,
        }}
      >
        {profile ? (
          <Image src={profile} alt="image"></Image>
        ) : (
          <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
            <IoCloudUploadOutline fontSize={40} color="#006bce" />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <ChangeButton startIcon={<CameraIcon />}>
          Upload Photos
          <FileInput type="file" onChange={onChange} />
        </ChangeButton>
        <Button
          sx={{
            color: "#fff",
            borderRadius: "16px",
            flex: 1,
            padding: "16px",
          }}
          onClick={generatePdf}
        >
          Generate PDF
        </Button>
      </Box>
    </Box>
  );
};

const Image = styled("img")({
  maxWidth: "100%",
  width: "100%",
  height: "255px",
  "@media (max-width:768px)": {
    width: "100%",
  },
  borderRadius: "12px",
  objectFit: "cover",
});

const ChangeButton = styled(Button)({
  border: "1px solid rgba(0, 107, 206, 1)",
  borderRadius: "14px",
  position: "relative",
  background: "transparent",
  padding: "0.8rem",
  flex: 1,
  "@media (max-width:768px)": {
    width: "100%",
  },
  "&:hover": {
    background: "transparent",
  },
});

const FileInput = styled("input")({
  position: "absolute",
  inset: 0,
  opacity: "0",
  cursor: "pointer",
});
