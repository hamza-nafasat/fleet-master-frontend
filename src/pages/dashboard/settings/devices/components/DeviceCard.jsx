/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";

const DeviceCard = ({ device, handleDeleteDevice, handleOpenEditModal }) => {
  return (
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 1)",
          borderRadius: "12px",
          position: "relative",
          padding: {
            xs: "1rem",
            md: "2rem",
          },
        }}
      >
        {/* <Typography
          sx={{
            textAlign: "center",
            color: "rgba(70, 66, 85, 1)",
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          {device?.name}
        </Typography>
        <Tooltip title={device?.status == "online" ? "Online" : "Offline"}>
          <Box
            sx={{
              width: "15px",
              height: "15px",
              backgroundColor: device?.status == "online" ? "#00A389" : "#e90015",
              borderRadius: "100%",
              position: "absolute",
              border: "2px solid white",
              bottom: "-7px",
              left: "50%",
              transform: "translate(-50%, 0px)",
            }}
          ></Box>
        </Tooltip> */}

        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(70, 66, 85, 1)",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            {device?.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.2rem",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
          >
            <Tooltip title={device?.status == "online" ? "Online" : "Offline"}>
              <Box
                sx={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: device?.status == "online" ? "#00A389" : "#e90015",
                  borderRadius: "100%",
                  border: "2px solid white",
                }}
              ></Box>
            </Tooltip>
            <Typography
              sx={{
                textAlign: "center",
                color: "rgba(70, 66, 85, 1)",
                fontSize: "12px",
              }}
            >
              {device?.status == "online" ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "rgba(127, 127, 146, 1)",
                fontSize: "12px",
              }}
            >
              Assigned To
            </Typography>
            <Typography
              sx={{
                color: "rgba(0, 107, 206, 1)",
                fontSize: "16px",
              }}
            >
              {device?.assignedTo ? device?.assignedTo?.truckName : "Not Assigned"}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "rgba(127, 127, 146, 1)",
                fontSize: "12px",
              }}
            >
              Unique ID
            </Typography>
            <Typography
              sx={{
                color: "rgba(0, 107, 206, 1)",
                fontSize: "16px",
              }}
            >
              {device?.uniqueId}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "rgba(127, 127, 146, 1)",
                fontSize: "12px",
              }}
            >
              Device Type
            </Typography>
            <Typography
              sx={{
                color: "rgba(0, 107, 206, 1)",
                fontSize: "16px",
              }}
            >
              {device?.type}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "rgba(127, 127, 146, 1)",
                fontSize: "14px",
                textAlign: "end",
              }}
            >
              CreatedAt
            </Typography>
            <Typography
              sx={{
                color: "rgba(0, 107, 206, 1)",
                fontSize: "16px",
              }}
            >
              {device?.createdAt?.split("T")[0]?.split("-").reverse().join("/")}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "10px",
            mt: 2,
          }}
        >
          <Button
            onClick={() => handleOpenEditModal(device)}
            size="small"
            fullWidth
            sx={{
              background: "#006BCE33",
              minWidth: "127px",
              "&:hover": {
                background: "transparent",
              },
            }}
            startIcon={<EditIcon sx={{ color: "#006BCE" }} />}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteDevice(device?._id)}
            size="small"
            fullWidth
            color="error"
            sx={{
              background: "#FFCCC6",
              minWidth: "127px",
              "&:hover": {
                background: "transparent",
              },
            }}
            startIcon={<DeleteIcon sx={{ color: "#FF1900" }} />}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default DeviceCard;
