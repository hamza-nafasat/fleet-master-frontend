import { Box } from "@mui/material";
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
        style={{ width: "100%", height: "100%", borderRadius: "24px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {trucks.map((truck, index) => (
          <Marker key={index} position={[truck.latitude, truck.longitude]} icon={truckIcon}>
            <Popup>
              Truck is here: <pre>{JSON.stringify([truck.latitude, truck.longitude])}</pre>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;
