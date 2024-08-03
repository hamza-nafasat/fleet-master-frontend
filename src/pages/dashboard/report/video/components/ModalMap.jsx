import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import TruckIcon from "../../../../../assets/images/truck.png";

const truckIcon = new L.Icon({
  iconUrl: TruckIcon,
  iconSize: [45, 45]
})

const ModalMap = ({ onClose }) => {
  const [truckPosition, setTruckPosition] = useState([24.7136, 46.6753]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTruckPosition(prevPosition => [prevPosition[0] + 0.001, prevPosition[1] + 0.001]);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

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
      <Box sx={{ width: '100%', height: {xs: '300px', md: '500px'} }}>
        <MapContainer center={[25.276987, 55.296249]} zoom={13} style={{ width: '100%', height: '100%', borderRadius: '24px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
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

export default ModalMap;
