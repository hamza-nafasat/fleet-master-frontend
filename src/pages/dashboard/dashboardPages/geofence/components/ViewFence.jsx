/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import DetailIcon from "../../../../../assets/svgs/geofence/DetailIcon";
import { calculatePolygonArea } from "../../../../../utils/features";
import truckicon from "../../../../../assets/images/truck.png";

const ViewFence = ({ onClose, editModal, fence }) => {
  const [drawnLayers, setDrawnLayers] = useState([]);
  const [truckPositions, setTruckPositions] = useState([]);

  const truckIcon = L.icon({
    iconUrl: truckicon,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

  useEffect(() => {
    if (fence?.area?.coordinates) {
      const layer = L.polygon(fence?.area.coordinates);
      setDrawnLayers([{ ...fence?.area, coordinates: fence?.area.coordinates, layer }]);
    } else {
      setDrawnLayers([]);
    }
  }, [fence?.area]);

  useEffect(() => {
    setTruckPositions([]);
    if (fence?.trucks) {
      fence.trucks.forEach((truck) => {
        setTruckPositions((prev) => {
          const truckExists = prev.some((existingTruck) => existingTruck.id === truck._id);
          if (!truckExists) {
            return [
              ...prev,
              {
                id: truck._id,
                name: truck.truckName,
                position: [truck.latitude, truck.longitude],
              },
            ];
          }
          return prev;
        });
      });
    }
  }, [fence?.trucks]);

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
      {drawnLayers?.map((layerData) => (
        <Polygon key={layerData?.id} positions={layerData?.coordinates}>
          <Popup className="geofencePopup">
            <ModalView
              fence={fence}
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
      ))}

      {truckPositions?.map((truck) => (
        <Marker key={truck?.id} position={truck?.position} icon={truckIcon}>
          <Popup>
            {truck.name} is here: <pre>{JSON.stringify(truck.position, null, 2)}</pre>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ViewFence;

const ModalView = ({ fence, name, status, alert, startTime, endTime, area, editModal, onClose }) => {
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
            onClick={() => editModal(fence)}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
