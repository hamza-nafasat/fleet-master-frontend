import { Box, Divider, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import TruckIcon from "../../../../../../assets/images/truck.png";
import SosIcon from "../../../../../../assets/images/sos-icon.png";

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
          <Marker
            key={index}
            position={[truck.latitude, truck.longitude]}
            icon={truckIcon}
          >
            <Popup>
              {/* Truck is here: <pre>{JSON.stringify([truck.latitude, truck.longitude])}</pre> */}
              <TruckPopup />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;

const TruckPopup = ({ data }) => {
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
        1234atr
      </Typography>
      <Box
        sx={{
          background: "rgba(245, 247, 251, 1)",
          py: 2,
          px: 1,
          borderRadius: "0 0 12px 12px",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "0.5rem", mb: 1 }}
        >
          <Box
            sx={{
              width: "12px",
              height: "12px",
              background: "rgba(150, 150, 150, 1)",
              borderRadius: "50%",
            }}
          ></Box>
          <Typography sx={{ fontSize: "12px", color: "#000" }}>Idle</Typography>
        </Box>
        {truckData.map((data, i) => (
          <Box key={i}>
            <PopupList title="Plate Number" value={data.plateNumber} />
            <PopupList title="Device ID" value={data.deviceId} />
            <PopupList title="Driver" value={data.driver} />
            <PopupList title="Latitude" value={data.lat} />
            <PopupList title="Longitude" value={data.lng} />
          </Box>
        ))}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "0.5rem", mb: 1 }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(0, 107, 206, 1)",
              textDecoration: "underline",
            }}
          >
            SOS of Emergency
          </Typography>
          <img src={SosIcon} alt="image" />
        </Box>
        <Divider />
        <Typography sx={{ fontSize: "12px", fontWeight:500, color: "#000", pt:1 }}>
          Last Update On: 26-10-2023 2:28:45
        </Typography>
      </Box>
    </Box>
  );
};

const PopupList = ({ title, value }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", mb: 1 }}>
      <Typography sx={{ fontSize: "12px", color: "#000" }}>{title}:</Typography>
      <Typography sx={{ fontSize: "12px", color: "rgba(17, 17, 17, 0.6)" }}>
        {value}
      </Typography>
    </Box>
  );
};

var truckData = [
  {
    plateNumber: "1234atr",
    deviceId: "868711060015479",
    driver: "123456789",
    lat: "27.6242769",
    lng: "27.6242769",
  },
];
