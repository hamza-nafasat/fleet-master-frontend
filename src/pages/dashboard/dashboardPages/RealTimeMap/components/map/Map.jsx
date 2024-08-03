import { Box } from "@mui/material";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import TruckIcon from "../../../../../../assets/images/truck.png";
import { useSelector } from "react-redux";

const truckIcon = new L.Icon({
  iconUrl: TruckIcon,
  iconSize: [45, 45]
})

const Map = () => {
  const {trucks} = useSelector((state) => state.truck);

  return (
    <>
      <Box sx={{ width: '100%', height: '100%'}}>
        <MapContainer center={[25.276987, 55.296249]} zoom={2} style={{ width: '100%', height: '100%', borderRadius: '24px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {trucks.map((truck, index) => (
            <Marker position={[truck.latitude, truck.longitude]} icon={truckIcon}>
              <Popup>
                Truck is here: <pre>{JSON.stringify([truck.latitude, truck.longitude])}</pre>
              </Popup>
          </Marker>
          ))}
        </MapContainer>
      </Box>
    </>
  );
};

export default Map;
