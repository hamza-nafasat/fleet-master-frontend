/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Typography } from "@mui/material";
import DetailIcon from "../../../../../assets/svgs/geofence/DetailIcon";
import { useSelector } from "react-redux";
import { calculatePolygonArea } from "../../../../../utils/features";

const ViewFence = ({ onClose, editModal, fence }) => {
  const { geofence } = useSelector((state) => state.geofence);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  useEffect(() => {
    if (geofence?.area?.coordinates) {
      setPolygonCoordinates(geofence?.area?.coordinates || []);
    }
  }, [geofence, setPolygonCoordinates]);

  return (
    <MapContainer
      center={[25.276987, 55.296249]}
      zoom={6}
      style={{ height: "600px", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polygon positions={polygonCoordinates}>
        <Popup className="geofencePopup">
          <ModalView
            name={fence?.name}
            status={fence?.status}
            alert={fence?.alert}
            startTime={fence?.startDate?.split("T")[0]}
            endTime={fence?.endDate?.split("T")[0]}
            area={`${Math.round(calculatePolygonArea(fence?.area?.coordinates)) || 0} sq. km`}
            onClose={onClose}
            editModal={editModal}
          />
        </Popup>
      </Polygon>
    </MapContainer>
  );
};

export default ViewFence;

const ModalView = ({ name, status, alert, startTime, endTime, area, editModal, onClose }) => {
  return (
    <Box sx={{ borderRadius: "20px", width: "320px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          color: "#fff",
          fontSize: "18px",
          background: "rgba(1, 64, 125, 1)",
          padding: "16px 20px",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <DetailIcon />
        Details
      </Box>
      <Box sx={{ padding: "12px" }}>
        <Box>
          <Box
            sx={{
              background: "rgba(223, 239, 255, 0.5)",
              padding: "1rem",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                Geofence name
              </Typography>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                {name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                Status
              </Typography>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                {status}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                Alert
              </Typography>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                {alert}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                Start Time
              </Typography>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                {startTime}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                End Time
              </Typography>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                {endTime}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                Area
              </Typography>
              <Typography variant="h6" sx={{ color: "#000", fontSize: "14px", flexBasis: "50%" }}>
                {area}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px 20px",
          borderRadius: "0 0 10px 10px",
          background: "rgba(1, 64, 125, 1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button
            sx={{
              background: "transparent",
              fontSize: "16px",
              fontWeight: 600,
              color: "#fff",
              border: "1.8px solid #fff",
              borderRadius: "8px",
              width: "90px",
            }}
            onClick={onClose}
          >
            Back
          </Button>
          <Button
            sx={{
              background: "rgba(0, 107, 206, 1)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#fff",
              border: "1.8px solid rgba(0, 107, 206, 1)",
              borderRadius: "8px",
              width: "90px",
            }}
            onClick={editModal}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
