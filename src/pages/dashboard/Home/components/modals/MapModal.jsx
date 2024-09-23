/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import TruckIcon from "../../../../../assets/images/truck.png";

const truckIcon = new L.Icon({
  iconUrl: TruckIcon,
  iconSize: [45, 45],
});

// Component to handle map animation when the modal opens
const FlyToMarker = ({ position }) => {
  const map = useMap(); // Get access to the map instance

  useEffect(() => {
    if (map && position) {
      map.flyTo(position, 13, {
        duration: 2, // Duration of animation in seconds
      });
    }
  }, [map, position]);

  return null;
};

const MapModal = ({ onClose, truck }) => {
  const [truckPosition] = useState([truck?.latitude, truck?.longitude]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "rgba(17, 17, 17, 1)",
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
            fontWeight: 600,
          }}
        >
          <Box sx={{ cursor: "pointer", height: "25px" }} onClick={onClose}>
            <BackIcon />
          </Box>
          Alert location
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
          <CloseIcon onClick={onClose} />
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: { xs: "300px", md: "500px" } }}>
        <MapContainer
          center={[25.276987, 55.296249]}
          zoom={1}
          style={{ width: "100%", height: "100%", borderRadius: "24px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <FlyToMarker position={truckPosition} />

          <Marker position={truckPosition} icon={truckIcon}>
            <Popup>
              Truck is here: <pre>{JSON.stringify(truckPosition)}</pre>
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </>
  );
};

export default MapModal;
