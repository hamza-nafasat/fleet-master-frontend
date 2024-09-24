/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import { socket, socketEvent } from "../../../../../constants/constants";
import {
  getSingleGeofenceAction,
  updateGeofenceAction,
} from "../../../../../redux/actions/geofence.action";
import EditMap from "./EditMap";
import TruckList from "./TruckList";
import { isTruckInPolygon } from "../../../../../utils/isTruckInPolygon";

const EditFence = ({ onClose, editSelectedRow }) => {
  const dispatch = useDispatch();
  const { geofence } = useSelector((state) => state.geofence);
  const [area, setArea] = useState(geofence?.area || {});
  const [name, setName] = useState(geofence?.name || "");
  const [alert, setAlert] = useState(geofence?.alert || "");
  const [status, setStatus] = useState(geofence?.status || "");
  const [startDate, setStartDate] = useState(
    geofence?.startDate?.split("T")[0] || ""
  );
  const [endDate, setEndDate] = useState(
    geofence?.endDate?.split("T")[0] || ""
  );
  const [trucks, setTrucks] = useState(geofence?.trucks || []);
  const [updateGeofenceLoading, setUpdateGeofenceLoading] = useState(false);

  // update geofence logic here
  const updateGeofenceHandler = async () => {
    setUpdateGeofenceLoading(true);
    const geofenceData = {
      name,
      alert,
      status,
      startDate,
      endDate,
      area,
    };
    await dispatch(updateGeofenceAction(geofence?._id, geofenceData));
    await dispatch(getSingleGeofenceAction(editSelectedRow?._id));
    setUpdateGeofenceLoading(false);
  };

  // get single geofence data on component load
  useEffect(() => {
    dispatch(getSingleGeofenceAction(editSelectedRow?._id));
  }, [dispatch, editSelectedRow?._id]);

  // useEffect for socket event
  useEffect(() => {
    socket.on(socketEvent.GEOFENCE_TRUCKS_DATA, (data) => {
      // console.log(data);
      dispatch(getSingleGeofenceAction(editSelectedRow?._id));
    });
  }, [dispatch, editSelectedRow?._id]);

  // if truck is out of fence
  useEffect(() => {
    if (trucks && area) {
      trucks.forEach((truck) => {
        const { truckName, latitude, longitude } = truck;
        const isInside = isTruckInPolygon(
          [latitude, longitude],
          area?.coordinates
        );
        if (!isInside && alert === "outfence") {
          //  console.log(`Truck ${truckName} is out of the polygon.`);
        } else if (isInside && alert === "infence") {
          // console.log(`Truck ${truckName} is inside the polygon`);
        }
      });
    }
  }, [trucks, area, alert]);

  useEffect(() => {
    if (geofence) {
      setName(geofence?.name);
      setAlert(geofence?.alert);
      setStatus(geofence?.status);
      setStartDate(geofence?.startDate.split("T")[0]);
      setEndDate(geofence?.endDate.split("T")[0]);
      setTrucks(geofence?.trucks || []);
      setArea(geofence?.area || {});
    }
  }, [editSelectedRow, dispatch, geofence]);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "rgba(17, 17, 17, 1)",
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
            fontWeight: 600,
          }}
        >
          <Box sx={{ cursor: "pointer", height: "25px" }} onClick={onClose}>
            <BackIcon />
          </Box>
          EDIT FENCE
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
          <CloseIcon onClick={onClose} />
        </Box>
      </Box>
      <Typography
        variant="h3"
        sx={{ color: "#000", fontSize: "20px", fontWeight: 700 }}
      >
        Info
      </Typography>
      <Grid container spacing="14" mt={1}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="text"
            label="Geofence Name"
            name="geofenceName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="select-status">Select Status</InputLabel>
            <Select
              labelId="select-status"
              label="Select Status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ width: "100%" }}
            >
              <MenuItem value={"inactive"}>Inactive</MenuItem>
              <MenuItem value={"active"}>Active</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="select-fence">Select Fence</InputLabel>
            <Select
              labelId="select-fence"
              label="Select Fence"
              name="alert"
              value={alert}
              onChange={(e) => setAlert(e.target.value)}
              sx={{ width: "100%" }}
            >
              <MenuItem value={"infence"}>In-Fence</MenuItem>
              <MenuItem value={"outfence"}>Out-Fence</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs="12" lg="4">
          <TextField
            type="date"
            label="startDate"
            maxLength="30"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            name="startDate"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs="12" lg="4">
          <TextField
            type="date"
            label="endDate"
            maxLength="30"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            name="endDate"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      {/* Map */}
      <Typography
        mt={2}
        variant="h3"
        sx={{ color: "#000", fontSize: "20px", fontWeight: 700 }}
      >
        Location
      </Typography>
      <Box mt={2} sx={{ width: "100%", height: "400px" }}>
        <EditMap
          gettedTrucks={trucks}
          area={area}
          setArea={setArea}
          geofenceId={geofence?._id}
        />
      </Box>
      {/* List */}
      <Typography
        mt={6}
        variant="h3"
        sx={{ color: "#000", fontSize: "20px", fontWeight: 700 }}
      ></Typography>
      <Button
        onClick={updateGeofenceHandler}
        sx={{
          margin: '8px 0',
          width: "100%",
          color: "#fff",
          height: "100%",
          "&:disabled": { color: "white", cursor: "not-allowed" },
        }}
        disabled={updateGeofenceLoading}
      >
        {updateGeofenceLoading && (
          <CircularProgress sx={{ mx: "10px", color: "white" }} size={25} />
        )}
        Update Geofence
      </Button>
      <Typography
        mt={2}
        variant="h3"
        sx={{ color: "#000", fontSize: "20px", fontWeight: 700 }}
      >
        Truck List
      </Typography>
      {/* truck list component  */}
      <Grid container mt={2}>
        <Grid items xs={12} md={12}>
          <TruckList geofenceId={geofence?._id} trucks={trucks} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditFence;
