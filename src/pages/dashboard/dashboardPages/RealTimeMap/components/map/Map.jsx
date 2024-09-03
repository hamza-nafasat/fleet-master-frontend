/* eslint-disable react/prop-types */
import { Box, Divider, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import TruckIcon from "../../../../../../assets/images/truck.png";

const truckIcon = new L.Icon({
  iconUrl: TruckIcon,
  iconSize: [45, 45],
});

const Map = () => {
  const { trucks } = useSelector((state) => state.truck);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[25.276987, 55.296249]}
        zoom={2}
        attributionControl={false}
        style={{ width: "100%", height: "100%", borderRadius: "24px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {trucks.map((truck, index) => (
          <Marker key={index} position={[truck.latitude, truck.longitude]} icon={truckIcon}>
            <Popup>
              <TruckPopup truck={truck} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;

export const TruckPopup = ({ truck }) => {
  console.log("truck", truck);
  const mapDeviceId = truck?.devices?.find((device) => device.type == "gps")._id || "Not Available";
  console.log("map device id", mapDeviceId);
  return (
    <Box sx={{ width: "240px" }}>
      <Typography
        sx={{
          background: "rgba(0, 107, 206, 1)",
          py: 1,
          textAlign: "center",
          borderRadius: "12px 12px 0 0",
          color: "#fff",
        }}
      >
        {truck.truckName}
      </Typography>
      <Box
        sx={{
          background: "rgba(245, 247, 251, 1)",
          py: 2,
          px: 1,
          borderRadius: "0 0 12px 12px",
        }}
      >
        <Box>
          <PopupList title="Plate Number" value={truck?.plateNumber} />
          <PopupList size={"10px"} title="Device ID" value={mapDeviceId} />
          <PopupList
            title="Driver"
            value={truck?.assignedTo?.firstName + " " + truck?.assignedTo?.lastName}
          />
          <PopupList title="Latitude" value={truck?.latitude} />
          <PopupList title="Longitude" value={truck?.latitude} />
        </Box>
        <Divider />

        <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "#000", pt: 1 }}>
          {` Last Update: ${truck?.updatedAt?.split("T")[0]?.split("-").reverse().join("-")}${"  "}
          ${truck.updatedAt?.split("T")[1].split(".")[0]}`}
        </Typography>
      </Box>
    </Box>
  );
};

const PopupList = ({ title, value, size = "12px" }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", mb: 1 }}>
      <Typography sx={{ fontSize: "12px", color: "#000" }}>{title}:</Typography>
      <Typography sx={{ fontSize: size, color: "rgba(17, 17, 17, 0.6)" }}>{value}</Typography>
    </Box>
  );
};
