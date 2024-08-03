/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { FeatureGroup, MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useDispatch, useSelector } from "react-redux";
import TruckIcon from "../../../../../assets/images/truck.png";
import {
    addTruckAndAreaInGeofenceAction,
    getSingleGeofenceAction,
} from "../../../../../redux/actions/geofence.action";
import { getAllTrucksAction } from "../../../../../redux/actions/truck.actions";
import TruckModal from "./TruckModal";

const truckIcon = new L.Icon({
    iconUrl: TruckIcon,
    iconSize: [45, 45],
});

const EditMap = ({ gettedTrucks, area, setArea, geofenceId }) => {
    const [truckPositions, setTruckPositions] = useState([]);
    const [drawnLayers, setDrawnLayers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [addModalLoading, setAddModalLoading] = useState(false);
    const dispatch = useDispatch();

    const { trucks } = useSelector((state) => state.truck);

    const handleCloseModal = () => setShowModal(false);

    // When a shape is drawn
    const handleCreated = (e) => {
        const layer = e.layer;
        const id = Date.now();
        const latLngs = layer?.getLatLngs();
        if (latLngs && latLngs[0]) {
            const coordinates = latLngs[0].map((latLng) => [latLng.lat, latLng.lng]);
            setDrawnLayers([...drawnLayers, { id, coordinates, layer }]);
            setArea({ id, coordinates });
        } else {
            console.error("Failed to retrieve coordinates from the created layer");
        }
    };
    const openAddTruckModal = async () => {
        await dispatch(getAllTrucksAction());
        setShowModal(true);
    };

    const handleSelectTruck = async (truckIds) => {
        setAddModalLoading(true);
        await dispatch(addTruckAndAreaInGeofenceAction(geofenceId, truckIds, area));
        await dispatch(getSingleGeofenceAction(geofenceId));

        // socket.emit("WANT_TRACKING_DATA", truck._id);
        setShowModal(false);
        setAddModalLoading(false);
        // onClose();
    };

    useEffect(() => {
        if (area?.coordinates) {
            const layer = L.polygon(area.coordinates);
            setDrawnLayers([{ ...area, coordinates: area.coordinates, layer }]);
        } else {
            setDrawnLayers([]);
        }
    }, [area]);
    // Change the position of the truck when data is received from the socket
    useEffect(() => {
        setTruckPositions([]);
        if (gettedTrucks) {
            gettedTrucks.forEach((truck) => {
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
    }, [gettedTrucks]);

    return (
        <React.Fragment>
            <MapContainer
                center={[25.276987, 55.296249]}
                zoom={6}
                style={{ height: "400px", width: "100%", zIndex: 0, borderRadius: "20px" }}
                attributionControl={false}
            >
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={handleCreated}
                        draw={{
                            polygon: true,
                            rectangle: false,
                            circle: false,
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
                {drawnLayers?.map((layerData) => (
                    <Polygon key={layerData?.id} positions={layerData?.coordinates}>
                        <Popup>Polygon ID: {layerData?.id}</Popup>
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
            <TruckModal
                show={showModal}
                handleClose={handleCloseModal}
                trucks={trucks}
                addModalLoading={addModalLoading}
                gettedTrucks={gettedTrucks}
                handleSelect={handleSelectTruck}
            />
            <Button
                onClick={openAddTruckModal}
                variant="contained"
                sx={{ width: "100%", alignSelf: "end", margin: "10px" }}
            >
                Add Trucks
            </Button>
        </React.Fragment>
    );
};

export default EditMap;
