/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../../../../components/modal/Modal";
import { updateMyProfileAction } from "../../../../redux/actions/user.actions";

const ConfigurationSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [selectedDatabase, setSelectedDatabase] = useState("remote-cloud-database");
  const [modal, setModal] = useState(false);
  const [newDatabase, setNewDatabase] = useState(null);
  const [intervalValue, setIntervalValue] = useState("30");
  const [isLoading, setIsLoading] = useState(false);

  // console.log("selected database", selectedDatabase);

  const closeModalHandler = () => setModal(false);
  const openModalHandler = () => {
    setModal("confirm-database");
  };

  const confirmDatabaseChange = () => {
    if (newDatabase) {
      setSelectedDatabase(newDatabase);
    }
    setModal(false);
  };

  const selectedDatabaseHandler = (e) => {
    const newDatabase = e.target.value;
    openModalHandler();
    setNewDatabase(newDatabase);
  };

  const saveConfigrationHandler = async () => {
    setIsLoading(true);
    try {
      if (!intervalValue) toast.error("Please select time interval");
      const formData = new FormData();
      formData.append("interval", intervalValue);
      await dispatch(updateMyProfileAction(formData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setIntervalValue(user.interval);
    }
  }, [dispatch, user]);

  return (
    <Box
      sx={{
        background: "#F5F4F4",
        padding: { xs: "20px 16px", md: "40px 30px" },
        borderRadius: "24px",
      }}
    >
      <Grid container>
        <Grid item xs={12} lg={10}>
          <Heading heading="Pull Request Intervals" />
          <Box sx={{ paddingLeft: { xs: "15px", md: "35px" }, mt: 2 }}>
            <Label label="Select Time Intervals" />
            <FormControl sx={{ width: "100%", mt: 1.4 }}>
              <InputLabel
                sx={{
                  backgroundColor: "whitesmoke",
                  width: "fit-content",
                  px: 1,
                }}
                id="deviceType-label"
              >
                Select Time Interval
              </InputLabel>
              <Select
                labelId="time-interval"
                id="timeInterval"
                name="timeInterval"
                placeholder="Select"
                value={intervalValue}
                onChange={(e) => setIntervalValue(e.target.value)}
              >
                <MenuItem value="10">10 Seconds</MenuItem>
                <MenuItem value="20">20 Seconds</MenuItem>
                <MenuItem value="30">30 Seconds</MenuItem>
                <MenuItem value="40">40 Seconds</MenuItem>
                <MenuItem value="60">60 Seconds</MenuItem>
                <MenuItem value="90">1.5 minute</MenuItem>
                <MenuItem value="120">2 minute</MenuItem>
                <MenuItem value="150">2.5 minute</MenuItem>
                <MenuItem value="180">3 minute</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Heading heading="Database Type" mt={2} />
          <Box sx={{ paddingLeft: { xs: "15px", md: "35px" }, mt: 2 }}>
            <FormControl>
              <RadioGroup
                row
                name="database-type-radios"
                value={selectedDatabase}
                onChange={selectedDatabaseHandler}
              >
                <FormControlLabel
                  value="remote-cloud-database"
                  control={<Radio />}
                  label="Remote Cloud Database"
                />
                <FormControlLabel value="local-database" control={<Radio />} label="Local Database" />
              </RadioGroup>
            </FormControl>
            {selectedDatabase === "remote-cloud-database" && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Database Name"
                  variant="outlined"
                  sx={{ mb: 2, background: "transparent" }}
                />
              </Box>
            )}
            {selectedDatabase === "local-database" && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Server Address"
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Port Number"
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Database Name"
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid xs={12} display="flex" justifyContent="flex-end" mt={3}>
          <Button
            onClick={saveConfigrationHandler}
            type="submit"
            sx={{
              color: "#fff",
              borderRadius: "16px",
              width: "157px",
              padding: "16px",
              "&:disabled": {
                opacity: "0.3",
                color: "white",
                cursor: "not-allowed",
              },
            }}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "SAVE"}
            SAVE
          </Button>
        </Grid>
      </Grid>
      {modal === "confirm-database" && (
        <Modal width={{ xs: "300px", md: "500px" }} onClose={closeModalHandler}>
          <DatabaseChangeModal
            onClose={closeModalHandler}
            changeDatabase={confirmDatabaseChange}
            selectedDatabase={selectedDatabase}
          />
        </Modal>
      )}
    </Box>
  );
};

export default ConfigurationSettings;

const Heading = ({ heading, mt }) => {
  return (
    <Typography
      sx={{
        mt: mt,
        color: "rgba(17, 17, 17, 1)",
        fontSize: { xs: "16px", md: "20px" },
        fontWeight: 600,
      }}
    >
      {heading}
    </Typography>
  );
};
const Label = ({ label }) => {
  return (
    <Typography
      sx={{
        color: "rgba(17, 17, 17, 1)",
        fontSize: { xs: "14px", md: "16px" },
        fontWeight: 600,
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>
  );
};

const DatabaseChangeModal = ({ onClose, changeDatabase, selectedDatabase }) => {
  return (
    <Box>
      <Typography sx={{ fontSize: { xs: "18px", md: "22px" }, fontWeight: 600 }}>
        {selectedDatabase === "remote-cloud-database" && "Local Database Storage Confirmation"}
        {selectedDatabase === "local-database" && "Remote Database Storage Confirmation"}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "14px", md: "16px" },
          fontWeight: 600,
          color: "rgba(17, 17, 17, 0.8)",
          mt: 1,
          mb: 4,
        }}
      >
        {selectedDatabase === "remote-cloud-database" &&
          "Do you want   store your data in a local database?"}
        {selectedDatabase === "local-database" &&
          "Do you want to store your data in a remote (cloud) database?"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="button"
          onClick={onClose}
          sx={{
            color: "rgba(125, 125, 125, 1)",
            borderRadius: "16px",
            width: "157px",
            padding: "16px",
            background: "rgba(216, 216, 216, 1)",
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={changeDatabase}
          sx={{
            color: "#fff",
            borderRadius: "16px",
            width: "157px",
            padding: "16px",
          }}
        >
          Change
        </Button>
      </Box>
    </Box>
  );
};
