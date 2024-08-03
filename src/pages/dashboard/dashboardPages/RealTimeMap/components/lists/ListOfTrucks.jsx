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
import React, { useEffect, useState } from "react";
import AlertIcon from "../../../../../../assets/svgs/map/AlertIcon";
import RingIcon from "../../../../../../assets/svgs/map/RingIcon";
import SearchIcon from "../../../../../../assets/svgs/map/SearchIcon";
import LocationIcon from "../../../../../../assets/svgs/home/LocationIcon";
import PlayIcon from "../../../../../../assets/svgs/home/PlayIcon";
import VideoRecordIcon from "../../../../../../assets/svgs/home/VideoRecordIcon";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrucksAction } from "../../../../../../redux/actions/truck.actions";

const ListOfTrucks = () => {
  const dispatch = useDispatch();
  const [searchTruck, setSearchTruck] = useState("");
  const { trucks } = useSelector((state) => state.truck);

  const filteredTrucks = trucks?.filter((truck) =>
    String(truck.fleetNumber)
      ?.toLowerCase()
      .includes(searchTruck.toLowerCase())
  );

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
          fontWeight: 600,
          color: "#000",
        }}
      >
        LIST OF TRUCKS
      </Typography>
      <NotificationLists />
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
            <HeadTableCell>Fleet Number</HeadTableCell>
            <HeadTableCell>Status</HeadTableCell>
            <HeadTableCell>Action</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTrucks?.map((truck, i) => (
            <TableRow key={i}>
              <BodyTableCell>{truck?.fleetNumber}</BodyTableCell>
              <BodyTableCell>
                <Typography
                  sx={{
                    width: "16px",
                    height: "16px",
                    background:
                      truck.status === "connected"
                        ? "rgba(58, 163, 87, 1)"
                        : "rgba(255, 101, 84, 1)",
                    borderRadius: "50%",
                  }}
                ></Typography>
              </BodyTableCell>
              <BodyTableCell>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <LocationIcon />
                  <VideoRecordIcon />
                  <PlayIcon />
                </Box>
              </BodyTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

const NotificationLists = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        my: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box
          sx={{
            width: "24px",
            height: "24px",
            background: "rgba(58, 163, 87, 1)",
            borderRadius: "50%",
          }}
        ></Box>
        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
          2
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box
          sx={{
            width: "24px",
            height: "24px",
            background: "rgba(255, 101, 84, 1)",
            borderRadius: "50%",
          }}
        ></Box>
        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
          0
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box
          sx={{
            width: "24px",
            height: "24px",
            background: "rgba(150, 150, 150, 1)",
            borderRadius: "50%",
          }}
        ></Box>
        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
          10
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box
          sx={{
            width: "24px",
            height: "24px",
            background: "rgba(237, 236, 11, 1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AlertIcon />
        </Box>
        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
          2
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box
          sx={{
            width: "24px",
            height: "24px",
            background: "rgba(255, 100, 84, 1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RingIcon />
        </Box>
        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 600 }}>
          2
        </Typography>
      </Box>
    </Box>
  );
};
