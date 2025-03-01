/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AddLinkIcon from "@mui/icons-material/AddLink";
import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar, Box, Grid, Tooltip, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import profilePic from "../../../../../assets/images/settings/vehicle-pic.png";
import Modal from "../../../../../components/modal/Modal";
import {
  deleteTruckAction,
  detachDeviceFromTruckAction,
  getAllTrucksAction,
  getSingleTruckAction,
} from "../../../../../redux/actions/truck.actions";
import { clearTruckError, clearTruckMessage } from "../../../../../redux/slices/truck.slice";
import AttacheModal from "./AttacheModal";
import EditIcon from "../../../../../assets/svgs/settings/EditIcon";
import DeleteIcon from "../../../../../assets/svgs/settings/DeleteIcon";
import DeleteDeviceIcon from "../../../../../assets/svgs/settings/DeleteDeviceIcon";
import LocationIcon from "../../../../../assets/svgs/home/LocationIcon";
import PlayIcon from "../../../../../assets/svgs/home/PlayIcon";
import Profile from "../../../../../assets/images/asif.png";
import EditTruck from "./EditTruck";
import DetachIcon from "../../../../../assets/svgs/settings/DetachIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SdCardModal from "../../../report/video/components/sdCardRemoval/SdCardModal";
import MapModal from "../../../Home/components/modals/MapModal";

const TruckDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const truckId = params?.truckId;
  const { truck, message, error } = useSelector((state) => state.truck);
  const [modalType, setModalType] = useState(null);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [truckForAttach, setTruckForAttach] = useState(null);
  const [liveUrl, setLiveUrl] = useState(null);

  console.log("truck", truck);

  const handleOpenAttachModal = (truckId) => {
    setTruckForAttach(truckId);
    setModalType("attach");
  };
  const handleEditTruckModal = () => setModalType("edit-truck");

  const handleCloseModal = () => {
    setModalType(null);
  };

  const deleteTruckHandler = (truckId) => {
    confirmAlert({
      title: "Confirm delete Trucks",
      message: "Are you sure you want to delete the Truck?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (truckId) {
              await dispatch(deleteTruckAction(truckId));
              await dispatch(getAllTrucksAction());
              return navigate("/dashboard/trucks");
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Delete action cancelled", { autoClose: 2000 }),
        },
      ],
    });
  };

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
    if (message) {
      toast.success(message);
      dispatch(clearTruckMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearTruckError());
    }
  }, [dispatch, message, error]);
  useEffect(() => {
    if (truckId) dispatch(getSingleTruckAction(truckId));
  }, [dispatch, truckId]);
  return (
    <React.Fragment>
      <TruckContainer container sx={{ padding: { xs: "16px", md: "24px" } }}>
        <Grid xs={12} display="flex" justifyContent="space-between" mb={3}>
          <Link to="/dashboard/trucks">
            <ArrowBackIcon sx={{ color: "rgba(70, 66, 85, 1)", fontSize: "24px" }} />
          </Link>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ cursor: "pointer" }} onClick={handleEditTruckModal}>
              <EditIcon />
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => deleteTruckHandler(truck?._id)}>
              <DeleteDeviceIcon />
            </div>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
            borderRadius: "10px",
            padding: { xs: "10px", sm: "16px" },
          }}
          mb={3}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} display="flex" justifyContent="space-between" gap={1}>
              <SingleTruckDetail
                handleOpenMapModal={handleOpenMapModal}
                handleOpenVideoModal={handleOpenVideoModal}
                truck={truck}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {truck?.assignedTo ? (
                <UserProfile driver={truck?.assignedTo} />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    background: "rgba(238, 247, 255, 1)",
                    borderRadius: "10px",
                    padding: { xs: "8px", sm: "16px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "rgba(0, 68, 131, 1)" }}>No Driver Assigned</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
            borderRadius: "10px",
            padding: { xs: "10px", sm: "16px" },
          }}
        >
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography
              sx={{
                color: "rgba(0, 68, 131, 1)",
                fontWeight: 600,
                fontSize: { xs: "16px", sm: "22px" },
              }}
            >
              Devices
            </Typography>
            <Box sx={{ cursor: "pointer" }} onClick={() => handleOpenAttachModal(truck?._id)}>
              <Tooltip title="Attach Device">
                <AddLinkIcon style={{ color: "#006bce", width: "40px", height: "40px" }} />
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} mt={1}>
              {truck?.devices?.map((device) => (
                <DeviceCard key={device._id} device={device} truck={truck} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </TruckContainer>
      {modalType === "attach" && (
        <Modal onClose={handleCloseModal}>
          <AttacheModal onClose={handleCloseModal} truckId={truckForAttach} />
        </Modal>
      )}
      {modalType === "edit-truck" && (
        <Modal onClose={handleCloseModal}>
          <EditTruck singleTruck={truck} onClose={handleCloseModal} />
        </Modal>
      )}
      {openVideoModal && (
        <Modal zIndex={9999} onClose={handleCloseVideoModal}>
          <SdCardModal liveUrl={liveUrl} onClose={handleCloseVideoModal} />
        </Modal>
      )}
      {openMapModal && (
        <Modal zIndex={9999} onClose={handleCloseMapModal}>
          <MapModal onClose={handleCloseMapModal} truck={selectedTruck} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default TruckDetail;

const DeviceCard = ({ device, truck }) => {
  const dispatch = useDispatch();

  const detachDeviceHandler = (truckId, deviceId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to detach device?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if (!deviceId) return toast.info("Device not found", { autoClose: 2000 });
            if (!truckId) return toast.info("Truck not found", { autoClose: 2000 });
            //console.log("device id", deviceId, "truck id", truckId);
            await dispatch(detachDeviceFromTruckAction(truckId, deviceId));
            await dispatch(getSingleTruckAction(truckId));
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Delete action cancelled"),
        },
      ],
    });
  };

  return (
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          background: "rgba(238, 247, 255, 1)",
          borderLeft: device.type == "video" ? "5px solid rgba(255, 71, 71, 1)" : "5px solid lime",
          borderRadius: "0px, 14px, 14px, 0px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
          padding: "16px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <Box>
            <Typography sx={{ color: "rgba(0, 107, 206, 1)" }}>
              {device?.uniqueId?.slice(0, 8) + "..." + device?.uniqueId?.slice(-5)}
            </Typography>
            <Typography
              sx={{
                color: "rgba(70, 66, 85, 1)",
                fontWeight: 500,
                fontSize: "16px",
              }}
            >
              {device?.name}
            </Typography>
          </Box>
          <Tooltip title="Detach Device">
            <Box
              onClick={() => detachDeviceHandler(truck?._id, device._id)}
              sx={{ cursor: "pointer", width: "20px", height: "20px" }}
            >
              <DetachIcon />
            </Box>
          </Tooltip>
        </Box>
        <Grid container spacing={1} mt={2}>
          {device.type == "video" ? (
            <Grid item xs={6} md={10}>
              <Typography sx={{ color: "rgba(127,127,146,1)", fontSize: "12px" }}>URL</Typography>
              <Typography
                sx={{
                  color: "rgba(0, 107, 206, 1)",
                  fontSize: "13px",
                }}
              >
                {device?.url}
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={6} md={10}>
              <Typography sx={{ color: "rgba(127,127,146,1)", fontSize: "12px" }}>createdAt</Typography>
              <Typography sx={{ color: "rgba(0, 107, 206, 1)", fontSize: "14px" }}>
                {device?.createdAt?.split("T")[0]}
              </Typography>
            </Grid>
          )}
          <Grid item xs={6} md={2} display="flex" flexDirection="column" alignItems="flex-end">
            <Typography sx={{ color: "rgba(127,127,146,1)", fontSize: "12px" }}>Type</Typography>
            <Typography sx={{ color: "rgba(0, 107, 206, 1)", fontSize: "14px" }}>{device?.type}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

const SingleTruckDetail = ({ handleOpenMapModal, handleOpenVideoModal, truck }) => {
  const url = truck?.devices?.find((device) => device.type == "video" && device.url)?.url;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: "rgba(0,68,131)",
              fontWeight: 600,
              fontSize: { xs: "18px", sm: "24px", md: "26px" },
            }}
          >
            {truck?.truckName}
          </Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <div style={{ cursor: "pointer" }} onClick={() => handleOpenMapModal(truck)}>
              <LocationIcon />
            </div>
            {url && (
              <div style={{ cursor: "pointer" }} onClick={() => handleOpenVideoModal(url)}>
                <PlayIcon />
              </div>
            )}
          </Box>
        </Box>
        <TruckDataList title="Plate Number" value={truck?.plateNumber} />
        <TruckDataList title="Fleet Number" value={truck?.fleetNumber} />
        <TruckDataList title="Status" value={truck?.status} />
        <TruckDataList title="Last Update" value={truck?.updatedAt?.split("T")[0].split("-").reverse().join("-")} />
        <TruckDataList title="Created At" value={truck?.createdAt?.split("T")[0].split("-").reverse().join("-")} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            background: "rgba(237, 237, 237, 1)",
            borderRadius: "10px",
            padding: "16px",
            display: "grid",
            placeItems: "center",
            height: "100%",
          }}
        >
          <img
            src={truck?.image?.url}
            alt="truck image"
            style={{
              objectFit: "contain",
              width: "200px",
              height: "200px",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const TruckDataList = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        py: 1,
        borderBottom: "0.4px solid rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography
        sx={{
          color: "rgba(70, 66, 85, 1)",
          fontWeight: 500,
          fontSize: { xs: "14px", sm: "16px" },
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: value === "Connected" ? "rgba(47, 239, 64, 1)" : "rgba(0, 107, 206, 1)",
          fontWeight: 500,
          fontSize: { xs: "14px", sm: "16px" },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const UserProfile = ({ driver }) => {
  return (
    <Box
      sx={{
        height: "100%",
        background: "rgba(238, 247, 255, 1)",
        borderRadius: "10px",
        padding: { xs: "8px", sm: "16px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Avatar
          src={driver?.image?.url}
          sx={{
            width: "102px",
            height: "102px",
            border: "2px solid rgba(0, 107, 206, 1)",
          }}
        />
        <Typography
          sx={{
            color: "rgba(0, 107, 206, 1)",
            fontWeight: 600,
            fontSize: { xs: "16px", md: "20px" },
          }}
        >
          {driver?.firstName} {driver?.lastName}
        </Typography>
      </Box>
      {/* <UserList title="Email" value={driver?.email} /> */}
      <UserList title="Mobile Number" value={driver?.phoneNumber} />
      <UserList title="License Expiry " value={driver?.licenseExpiry?.split("T")[0].split("-").reverse().join("-")} />
      <UserList title="Last Update" value={driver?.updatedAt?.split("T")[0].split("-").reverse().join("-")} />
      <UserList title="Created At" value={driver?.createdAt?.split("T")[0].split("-").reverse().join("-")} />
    </Box>
  );
};

const UserList = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        mt: 1,
      }}
    >
      <Typography
        sx={{
          color: "rgba(70, 66, 85, 1)",
          fontWeight: 500,
          fontSize: { xs: "14px", sm: "16px" },
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "rgba(0, 107, 206, 1)",
          fontSize: "14px",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const TruckContainer = styled(Grid)({
  background: "#F5F4F4",
  borderRadius: "24px",
  // height: "100%",
  marginTop: "-4rem",
});
