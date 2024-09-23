/* eslint-disable react/prop-types */
import { Avatar, Box, Divider, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import TruckIcon from "../../../../../../assets/images/truck.png";
import LongTruckIcon from "../../../../../../assets/images/long-truck.png";

const truckIcon = new L.Icon({
  iconUrl: TruckIcon,
  iconSize: [45, 45],
});

const Map = ({ realTime = false }) => {
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
            <Popup>{realTime ? <AnotherTruckPopup truck={truck} /> : <TruckPopup truck={truck} />}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;

export const TruckPopup = ({ truck }) => {
  // console.log("truck", truck);
  const mapDeviceId = truck?.devices?.find((device) => device.type == "gps")._id || "Not Available";
  // console.log("map device id", mapDeviceId);
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

const AnotherTruckPopup = ({ truck }) => {
  return (
    <Box sx={{ width: { xs: "250px", sm: "350px" } }}>
      <Typography
        variant="h2"
        sx={{
          background: "rgba(0, 107, 206, 1)",
          textAlign: "center",
          py: 1,
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          borderRadius: "12px 12px 0 0",
        }}
      >
        {truck?.truckName}
      </Typography>
      <Box
        sx={{
          p: 2,
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", mb: 2 }}>
          <Box
            sx={{
              background: "rgba(182, 220, 255, 1)",
              width: "114px",
              height: "114px",
              borderRadius: "10px",
              border: "3px solid #fff",
            }}
          >
            <Avatar
              src={truck?.image?.url}
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "unset",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Box
                sx={{
                  background: truck?.status == "connected" ? "rgba(0, 255, 70, 1)" : "rgba(255, 0, 0, 1)",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                }}
              ></Box>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>{truck?.plateNumber}</Typography>
            </Box>
            <Typography
              sx={{ fontSize: "10px" }}
            >{`${truck?.truckName} ${truck?.plateNumber} ${truck?.fleetNumber}`}</Typography>
          </Box>
        </Box>
        {/* truck detail */}
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <TruckDetail>
            <TruckDetailList title="Plate Number" value={truck?.plateNumber} />
            <TruckDetailList title="FleetNumber" value={truck?.fleetNumber} />
            <TruckDetailList title="Status" value={truck?.status} />
            <Divider />
            <Typography
              sx={{
                color: "rgba(0, 107, 206, 1)",
                fontSize: "10px",
                pt: 1,
                textAlign: "center",
              }}
            >
              Created At: {truck?.createdAt?.split("T")[0]?.split("-").reverse().join("-")}
            </Typography>
          </TruckDetail>
          <TruckDetail>
            <TruckDetailList
              title="Driver"
              value={truck?.assignedTo?.firstName + " " + truck?.assignedTo?.lastName}
            />
            <TruckDetailList title="Latitude" value={truck?.latitude} />
            <TruckDetailList title="Longitude" value={truck?.longitude} />
            <Divider />
            <Typography
              sx={{
                color: "rgba(0, 107, 206, 1)",
                fontSize: "10px",
                pt: 1,
                textAlign: "center",
              }}
            >
              Updated At: {truck?.updatedAt?.split("T")[0]?.split("-").reverse().join("-")}
            </Typography>
          </TruckDetail>
        </Box>
      </Box>
    </Box>
  );
};

const TruckDetail = ({ children }) => {
  return (
    <Box
      sx={{
        background: "#fff",
        border: "1px solid rgba(190, 224, 255, 1)",
        borderRadius: "8px",
        padding: "16px 8px",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};

const TruckDetailList = ({ title, value }) => {
  return (
    <Box sx={{ my: 1 }}>
      <Typography sx={{ color: "#000", fontSize: "12px", lineHeight: "12px" }}>{title}</Typography>
      <Typography sx={{ color: "#11111199", fontSize: "10px" }}>{value}</Typography>
    </Box>
  );
};
