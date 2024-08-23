import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationIcon from "../../../../assets/svgs/home/LocationIcon";
import PlayIcon from "../../../../assets/svgs/home/PlayIcon";
import VideoRecordIcon from "../../../../assets/svgs/home/VideoRecordIcon";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrucksAction } from "../../../../redux/actions/truck.actions";
import Modal from "../../../../components/modal/Modal";
import MapModal from "./modals/MapModal";

const truckList = (number, status) => {
  return { number, status };
};

const rows = [
  truckList("#213652", "success"),
  truckList("#769768", "success"),
  truckList("#234234", "danger"),
  truckList("#234234", "success"),
  truckList("#234234", "success"),
  truckList("#769678", "success"),
  truckList("#890808", "danger"),
  truckList("#345344", "success"),
  truckList("#234244", "success"),
  truckList("#980890", "danger"),
];

const ListOfTrucks = () => {
  const [selectedTruck, setSelectedTruck] = useState("");
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const { trucks } = useSelector((state) => state.truck);
  console.log("all trucks in truck list", trucks);

  const handleOpenMapModal = (truck) => {
    setSelectedTruck(truck);
    setModalType("map");
  };
  const handleOpenVideoModal = () => {
    setModalType("videos");
  };
  const handleCloseModal = () => {
    setModalType(null);
  };

  useEffect(() => {
    dispatch(getAllTrucksAction());
  }, [dispatch]);

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: "16px",
            md: "24px",
          },
          fontWeight: "600",
          textTransform: "uppercase",
        }}
      >
        LISTS OF TRUCKS
      </Typography>
      {/* List of trucks */}
      <Box sx={{ mt: "24px" }}>
        <Table sx={{ borderRadius: "10px", overflow: "hidden" }}>
          <TableHead sx={{ background: "#006bce" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  borderBottom: "1px solid #fff",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Fleet Number
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  borderBottom: "1px solid #fff",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  borderBottom: "1px solid #fff",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#f5f4f4" }}>
            {trucks?.map((truck, i) => (
              <TableRow key={i} sx={{ borderBottom: "1px solid #ebebeb" }}>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    borderRight: "1px solid #ebebeb",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  {truck?.fleetNumber}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid #ebebeb",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  {trucks && (
                    <Box
                      sx={{
                        background:
                          truck?.status === "connected" ? "#3aa357" : "#ff0000",
                        width: "13px",
                        height: "13px",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></Box>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "9px",
                    }}
                  >
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleOpenMapModal(truck)}
                    >
                      <LocationIcon />
                    </Box>
                    <Box sx={{ cursor: "pointer" }}>
                      <VideoRecordIcon />
                    </Box>
                    <Box sx={{ cursor: "pointer" }}>
                      <PlayIcon />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {modalType === "map" && (
          <Modal onClose={handleCloseModal}>
            <MapModal onClose={handleCloseModal} truck={selectedTruck} />
          </Modal>
        )}
      </Box>
    </Box>
  );
};

export default ListOfTrucks;
