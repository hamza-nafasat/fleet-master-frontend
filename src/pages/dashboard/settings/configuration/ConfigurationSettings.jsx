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
import { getMyProfileAction, updateMyProfileAction } from "../../../../redux/actions/user.actions";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";

const ConfigurationSettings = () => {
  const dispatch = useDispatch();
  const [dataBase, setDataBase] = useState({
    isCustomDb: false,
    customDbName: "",
    customDbHost: "",
    customDbUsername: "",
    customDbPassword: "",
    customDbPort: "",
  });
  const { user } = useSelector((state) => state.user);
  const [selectedDatabase, setSelectedDatabase] = useState("remote-database");
  const [modal, setModal] = useState(false);
  const [newDatabase, setNewDatabase] = useState(null);
  const [intervalValue, setIntervalValue] = useState("30");
  const [isLoading, setIsLoading] = useState(false);

  // console.log("selected database", selectedDatabase);
  const closeModalHandler = () => setModal(false);
  const openModalHandler = () => {
    setModal("confirm-database");
  };
  const instructionsModalHandler = () => setModal("instruction-modal");

  const confirmDatabaseChange = () => {
    if (newDatabase) setSelectedDatabase(newDatabase);
    setModal(false);
    if (newDatabase === "remote-database") instructionsModalHandler();
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
      const dbData = {
        customDbName: dataBase.customDbName,
        customDbHost: dataBase.customDbHost,
        customDbUsername: dataBase.customDbUsername,
        customDbPassword: dataBase.customDbPassword,
        customDbPort: dataBase.customDbPort,
      };
      if (selectedDatabase === "local-database") {
        dbData.isCustomDb = "no";
      } else {
        dbData.isCustomDb = "yes";
      }
      if (selectedDatabase === "remote-database") {
        if (
          !dataBase.customDbName ||
          !dataBase.customDbHost ||
          !dataBase.customDbUsername ||
          !dataBase.customDbPassword ||
          !dataBase.customDbPort
        ) {
          return toast.error("Please fill all the fields in local database section otherwise it will not work");
        }
      }
      formData.append("interval", intervalValue);
      formData.append("customDb", JSON.stringify(dbData));
      await dispatch(updateMyProfileAction(formData));
      await dispatch(getMyProfileAction());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setIntervalValue(user.interval);
      setSelectedDatabase(user?.isCustomDb ? "remote-database" : "local-database");
      setDataBase({
        isCustomDb: user?.isCustomDb === "yes" ? true : false,
        customDbName: user?.customDbName,
        customDbHost: user?.customDbHost,
        customDbUsername: user?.customDbUsername,
        customDbPassword: user?.customDbPassword,
        customDbPort: user?.customDbPort,
      });
      console.log("user", user);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user?.isCustomDbConnected && user?.isCustomDb) {
      setModal("instruction-modal");
    }
  }, [user]);

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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            >
              <FormControl>
                <RadioGroup row name="database-type-radios" value={selectedDatabase} onChange={selectedDatabaseHandler}>
                  <FormControlLabel value="local-database" control={<Radio />} label="Local Database" />
                  <FormControlLabel value="remote-database" control={<Radio />} label="Remote Database" />
                </RadioGroup>
              </FormControl>
              {selectedDatabase === "remote-database" && (
                <Box sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  {user?.isCustomDbConnected ? (
                    <CiCircleCheck fontSize={20} color="green" />
                  ) : (
                    <RxCrossCircled fontSize={18} color="red" />
                  )}
                  <Typography color={user?.isCustomDbConnected ? "green" : "red"}>
                    {user?.isCustomDbConnected ? "Connected" : "Connection failed"}
                  </Typography>
                </Box>
              )}
            </Box>

            {selectedDatabase === "remote-database" && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Host Name"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Enter host name"
                      value={dataBase.customDbHost}
                      onChange={(e) =>
                        setDataBase({
                          ...dataBase,
                          customDbHost: e.target.value,
                        })
                      }
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Port Number"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Enter port number"
                      value={dataBase.customDbPort}
                      onChange={(e) =>
                        setDataBase({
                          ...dataBase,
                          customDbPort: e.target.value,
                        })
                      }
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Database Name"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Enter database name"
                      value={dataBase.customDbName}
                      onChange={(e) =>
                        setDataBase({
                          ...dataBase,
                          customDbName: e.target.value,
                        })
                      }
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Enter username"
                      value={dataBase.customDbUsername}
                      onChange={(e) =>
                        setDataBase({
                          ...dataBase,
                          customDbUsername: e.target.value,
                        })
                      }
                      variant="outlined"
                      sx={{ background: "transparent" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      // type="password"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Enter password"
                      value={dataBase.customDbPassword}
                      onChange={(e) =>
                        setDataBase({
                          ...dataBase,
                          customDbPassword: e.target.value,
                        })
                      }
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
      {modal === "instruction-modal" && (
        <Modal width={{ xs: "300px", md: "700px" }} onClose={closeModalHandler}>
          <InstructionModalContent onClose={closeModalHandler} />
        </Modal>
      )}
    </Box>
  );
};

export default ConfigurationSettings;

const InstructionModalContent = ({ onClose }) => {
  return (
    <div className="px-4 pl-7">
      <h6 className="text-base md:text-2xl font-semibold text-center">Instructions</h6>
      <ul className="mt-4 md:mt-6 flex flex-col gap-4 text-sm md:text-[15px] text-red-500">
        <li className="list-decimal">
          Double-check the database host, port, username, password, and database name for accuracy. Ensure there are no
          typos.
        </li>
        <li className="list-decimal">
          Confirm that the database server is running, and remote access is enabled for your IP address or the server
          you&#39;re connecting from.
        </li>
        <li className="list-decimal">
          Test Connection Locally: Use a database management tool (e.g., MySQL Workbench or phpMyAdmin) to verify the
          credentials are correct and can establish a successful connection.
        </li>
      </ul>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
            borderRadius: "16px",
            width: "157px",
            padding: "16px",
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

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
        {selectedDatabase === "remote-database" && "Local Database Storage Confirmation"}
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
        {selectedDatabase === "remote-database" && "Do you want   store your data in a local database?"}
        {selectedDatabase === "local-database" && "Do you want to store your data in a remote database?"}
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
