/* eslint-disable react/prop-types */
import { Box, Button, Typography, Checkbox, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "../../../../../components/modal/Modal";
import { socket } from "../../../../../constants/constants";

const TruckModal = ({ show, handleClose, trucks = [], handleSelect, gettedTrucks = [], addModalLoading }) => {
    const [selectedTrucks, setSelectedTrucks] = useState(gettedTrucks);

    const isTruckSelected = (truck) => {
        return selectedTrucks.some((selectedTruck) => selectedTruck._id === truck._id);
    };

    const handleCheckboxChange = (truck) => {
        setSelectedTrucks((prevSelectedTrucks) => {
            if (isTruckSelected(truck)) {
                return prevSelectedTrucks.filter((selectedTruck) => selectedTruck._id !== truck._id);
            } else {
                return [...prevSelectedTrucks, truck];
            }
        });
    };

    const handleAddTruck = () => {
        handleSelect(selectedTrucks.map((truck) => truck._id));
        socket.emit(
            "WANT_TRACKING_DATA",
            selectedTrucks.map((truck) => truck._id)
        );
        console.log("selected trucks", selectedTrucks);
    };

    useEffect(() => {
        if (gettedTrucks) setSelectedTrucks(gettedTrucks);
    }, [gettedTrucks]);

    if (!show) return null;

    return (
        <Modal onClose={handleClose}>
            <div>
                <h2>Select Trucks</h2>
                {trucks?.length > 0 ? (
                    <Box>
                        {trucks?.map((truck) => (
                            <Box
                                key={truck._id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <img width="30%" src={truck.image.url} alt={truck.truckName} />
                                    <Typography>{truck.truckName}</Typography>
                                </Box>
                                <Checkbox
                                    checked={isTruckSelected(truck)}
                                    onChange={() => handleCheckboxChange(truck)}
                                />
                            </Box>
                        ))}
                        <Stack width={"100%"}>
                            <Button
                                sx={{
                                    color: "white",
                                    marginTop: 2,
                                    alignSelf: "center",
                                    "&:disabled": {
                                        cursor: "not-allowed",
                                        opacity: "0.3",
                                    },
                                }}
                                variant="contained"
                                onClick={handleAddTruck}
                                disabled={addModalLoading}
                            >
                                {addModalLoading ? "Adding Trucks..." : "Add Trucks"}
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    <p>No trucks available</p>
                )}
            </div>
        </Modal>
    );
};

export default TruckModal;
