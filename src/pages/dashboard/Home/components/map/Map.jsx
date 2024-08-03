import React, { useEffect, useState } from "react";
import L from "leaflet";
import TruckIcon from "../../../../../assets/images/truck.png";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrucksAction } from "../../../../../redux/actions/truck.actions";
import TruckModal from "./TruckModal"; // Adjust the import path as needed
import { socket } from "../../../../../constants/constants";

const truckIcon = new L.Icon({
    iconUrl: TruckIcon,
    iconSize: [45, 45],
});

const Map = () => {
    const [truckPositions, setTruckPositions] = useState([]);
    const [drawnLayers, setDrawnLayers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inPolygonTrucks, setInPolygonTrucks] = useState([]);
    const [trucksForPolygon, setTrucksForPolygon] = useState();
    const [currentPolygon, setCurrentPolygon] = useState(null);
    const dispatch = useDispatch();

    const { trucks } = useSelector((state) => state.truck);
    const { devicesData } = useSelector((state) => state.device);

    // Run this when the user draws a shape
    useEffect(() => {
        if (currentPolygon) {
            dispatch(getAllTrucksAction());
            setShowModal(true);
        }
    }, [currentPolygon, dispatch]);

    // Change the position of the truck when data is received from the socket
    useEffect(() => {
        if (devicesData) {
            const latitude = devicesData?.latitude;
            const longitude = devicesData?.longitude;
            const truckId = devicesData?.truckId;
            setTruckPositions((prev) => {
                return prev.map((truck) => {
                    if (truck.id === truckId) {
                        return {
                            ...truck,
                            position: [latitude, longitude],
                        };
                    }
                    return truck;
                });
            });
        }
    }, [devicesData, currentPolygon]);

    // When a shape is drawn
    const _created = (e) => {
        const layer = e.layer;
        const id = Date.now();
        setCurrentPolygon({ id, layer });
        setDrawnLayers([...drawnLayers, { id, layer }]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSelectTruck = (truck) => {
        setInPolygonTrucks((pre) => [...pre, truck]);
        console.log("Selected truck:", truck);
        const bounds = currentPolygon.layer.getBounds();
        const center = bounds.getCenter();
        setTruckPositions((prevPositions) => [
            ...prevPositions,
            {
                id: currentPolygon.id,
                name: truck.truckName,
                position: [center.lat, center.lng],
            },
        ]);
        // send truck id in server with socket
        socket.emit("WANT_TRACKING_DATA", truck._id);
        setShowModal(false);
    };

    // use effect for filtering trucks
    useEffect(() => {
        if (trucks && trucks.length > 0) {
            const newTrucks = trucks.filter((truck) => truck?.devices?.length > 0);
            const selectedTrucksArrayIds = new Set(inPolygonTrucks.map((item) => item._id));
            const filteredArray = newTrucks.filter((item) => !selectedTrucksArrayIds.has(item._id));
            setTrucksForPolygon(filteredArray);
        }
    }, [inPolygonTrucks, trucks]);

    return (
        <React.Fragment>
            <MapContainer
                center={[25.276987, 55.296249]}
                zoom={13}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
            >
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={_created}
                        draw={{
                            polygon: true,
                            rectangle: false,
                            circle: true,
                            polyline: false,
                            marker: false,
                            circlemarker: false,
                        }}
                    />
                </FeatureGroup>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {truckPositions.map((truck) => (
                    <Marker key={truck.id} position={truck.position} icon={truckIcon}>
                        <Popup>
                            {truck.name} is here: <pre>{JSON.stringify(truck.position, null, 2)}</pre>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <TruckModal
                show={showModal}
                handleClose={handleCloseModal}
                trucks={trucksForPolygon}
                handleSelect={handleSelectTruck}
            />
        </React.Fragment>
    );
};

export default Map;
