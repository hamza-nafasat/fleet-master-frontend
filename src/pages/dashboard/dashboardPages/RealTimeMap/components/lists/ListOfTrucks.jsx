import {
  Box,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationIcon from "../../../../../../assets/svgs/home/LocationIcon";
import PlayIcon from "../../../../../../assets/svgs/home/PlayIcon";
import VideoRecordIcon from "../../../../../../assets/svgs/home/VideoRecordIcon";
import SearchIcon from "../../../../../../assets/svgs/map/SearchIcon";
import Modal from "../../../../../../components/modal/Modal";
import { getAllTrucksAction } from "../../../../../../redux/actions/truck.actions";
import MapModal from "../../../../Home/components/modals/MapModal";
import SdCardModal from "../../../../report/video/components/sdCardRemoval/SdCardModal";

const ListOfTrucks = () => {
  const dispatch = useDispatch();
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [searchTruck, setSearchTruck] = useState("");
  const { trucks } = useSelector((state) => state.truck);

  const [liveUrl, setLiveUrl] = useState(null);

  const filteredTrucks = trucks?.filter((truck) =>
    String(truck.truckName)?.toLowerCase().includes(searchTruck.toLowerCase())
  );
  // map modal open and close handle
  const handleOpenMapModal = (truck) => {
    setSelectedTruck(truck);
    setOpenMapModal(true);
  };
  const handleCloseMapModal = () => setOpenMapModal(false);

  // video modal open and close handler
  const handleOpenVideoModal = (url) => {
    setLiveUrl(url);
    setOpenVideoModal(true);
  };
  const handleCloseVideoModal = () => setOpenVideoModal(false);

  useEffect(() => {
    dispatch(getAllTrucksAction());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        sx={{
          fontSize: {
            xs: "18px",
            md: "24px",
          },
          mb: 2,
          fontWeight: 600,
          color: "#000",
        }}
      >
        LIST OF TRUCKS
      </Typography>
      {/* <NotificationLists /> */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search"
        onChange={(e) => setSearchTruck(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            borderRadius: "8px",
          },
        }}
      />
      {/* table */}
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <HeadTableCell>Truck Name</HeadTableCell>
            <HeadTableCell>Status</HeadTableCell>
            <HeadTableCell>Action</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTrucks?.map((truck, i) => {
            const liveStreamUrl = truck?.devices?.find((device) => device.type == "video")?.url;
            return (
              <TableRow key={i}>
                <BodyTableCell>{truck?.truckName}</BodyTableCell>
                <BodyTableCell>
                  <Typography
                    sx={{
                      width: "16px",
                      height: "16px",
                      background:
                        truck.status === "connected" ? "rgba(58, 163, 87, 1)" : "rgba(255, 101, 84, 1)",
                      borderRadius: "50%",
                    }}
                  ></Typography>
                </BodyTableCell>
                <BodyTableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <LocationIcon onClick={() => handleOpenMapModal(truck)} />
                    <VideoRecordIcon />
                    {liveStreamUrl && <PlayIcon onClick={() => handleOpenVideoModal(liveStreamUrl)} />}
                  </Box>
                </BodyTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {openVideoModal && (
        <Modal zIndex={999} onClose={handleCloseVideoModal}>
          <SdCardModal liveUrl={liveUrl} onClose={handleCloseVideoModal} />
        </Modal>
      )}
      {openMapModal && (
        <Modal zIndex={999} onClose={handleCloseMapModal}>
          <MapModal onClose={handleCloseMapModal} truck={selectedTruck} />
        </Modal>
      )}
    </Box>
  );
};

export default ListOfTrucks;

const HeadTableCell = styled(TableCell)({
  fontSize: "16px",
  fontWeight: 600,
  borderBottom: "1px solid rgba(17, 17, 17, 0.1)",
  color: "rgba(17, 17, 17, 1)",
  textTransform: "uppercase",
  padding: "0 0 16px 0",
});

const BodyTableCell = styled(TableCell)({
  padding: "7px 5px",
  borderBottom: "0",
});

// const NotificationLists = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: "1rem",
//         my: 2,
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         <Box
//           sx={{
//             width: "24px",
//             height: "24px",
//             background: "rgba(58, 163, 87, 1)",
//             borderRadius: "50%",
//           }}
//         ></Box>
//         <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
//           2
//         </Typography>
//       </Box>
//       <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         <Box
//           sx={{
//             width: "24px",
//             height: "24px",
//             background: "rgba(255, 101, 84, 1)",
//             borderRadius: "50%",
//           }}
//         ></Box>
//         <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
//           0
//         </Typography>
//       </Box>
//       <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         <Box
//           sx={{
//             width: "24px",
//             height: "24px",
//             background: "rgba(150, 150, 150, 1)",
//             borderRadius: "50%",
//           }}
//         ></Box>
//         <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
//           10
//         </Typography>
//       </Box>
//       <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         <Box
//           sx={{
//             width: "24px",
//             height: "24px",
//             background: "rgba(237, 236, 11, 1)",
//             borderRadius: "50%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <AlertIcon />
//         </Box>
//         <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
//           2
//         </Typography>
//       </Box>
//       <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//         <Box
//           sx={{
//             width: "24px",
//             height: "24px",
//             background: "rgba(255, 100, 84, 1)",
//             borderRadius: "50%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <RingIcon />
//         </Box>
//         <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
//           2
//         </Typography>
//       </Box>
//     </Box>
//   );
// };
