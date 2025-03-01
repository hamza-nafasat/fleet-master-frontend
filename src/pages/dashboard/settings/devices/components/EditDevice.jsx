/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import SaveIcon from "../../../../../assets/svgs/settings/SaveIcon";
import { useDispatch } from "react-redux";
import { updateDeviceAction } from "../../../../../redux/actions/device.actions";
import { toast } from "react-toastify";
import MultiSelectParameters from "./MultiSelectParameters";
import { alertsTypesAccordingDevice, devicesOptions } from "./options";

const EditDevice = ({ onClose, device }) => {
  const dispatch = useDispatch();
  const [parameters, setParameters] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState(
    device?.parameters?.map((p) => ({ parameter: p })) || []
  );
  const [deviceName, setDeviceName] = useState(device?.name);
  const [deviceType, setDeviceType] = useState(device?.type);
  const [deviceUrl, setDeviceUrl] = useState(device?.url);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveEditDevice = async () => {
    try {
      setIsLoading(true);
      const data = {};
      if (deviceName) data.name = deviceName;
      if (deviceType && deviceType != device?.type) data.type = deviceType;
      if (selectedParameters.length) data.parameters = selectedParameters?.map((parameter) => parameter.parameter);

      if (deviceType == "video" && deviceUrl && deviceUrl != device?.url) data.url = deviceUrl;
      else if (deviceType !== "video" && deviceUrl) data.url = "remove";

      if (!Object.keys(data).length) {
        setIsLoading(false);
        return toast.error("You have not made any changes");
      }
      await dispatch(updateDeviceAction(device?._id, data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const deviceOptions = alertsTypesAccordingDevice(deviceType);
    const deviceOptionsArr = deviceOptions?.map((p) => p.parameter);
    const selectedParameters = [];
    device?.parameters?.forEach((p) => {
      deviceOptionsArr.includes(p) && selectedParameters.push({ parameter: p });
    });
    setSelectedParameters(selectedParameters);
    setParameters(deviceOptions);
  }, [device?.parameters, deviceType]);
  return (
    <React.Fragment>
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
          EDIT DEVICE
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
          <CloseIcon onClick={onClose} />
        </Box>
      </Box>
      {/* Form  */}
      <Box
        sx={{
          marginTop: {
            xs: "1rem",
            lg: "2.5rem",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            marginBottom: "2rem",
          }}
        >
          General Info
        </Typography>
        <Grid container spacing="14">
          <Grid item xs="12" lg="6">
            <TextField
              fullWidth
              type="text"
              label="Device Name"
              maxLength="20"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </Grid>
          <Grid item xs="12" lg="6">
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  backgroundColor: "whitesmoke",
                  width: "fit-content",
                  px: 1,
                }}
                id="deviceType-label"
              >
                Device Type
              </InputLabel>
              <Select
                labelId="deviceType-label"
                id="deviceType"
                name="deviceType"
                value={devicesOptions?.find((option) => option?.value == deviceType)?.value || ""}
                onChange={(e) => setDeviceType(e.target.value)}
              >
                {devicesOptions?.map((option, i) => (
                  <MenuItem key={i} value={option?.value}>
                    {option?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <MultiSelectParameters
              selectedParameters={selectedParameters}
              setSelectedParameters={setSelectedParameters}
              parameters={parameters}
            />
          </Grid>

          {deviceType === "video" && (
            <Grid item xs="12" lg="6">
              <TextField
                fullWidth
                type="text"
                label="Url"
                maxLength="30"
                id="url"
                value={deviceUrl}
                onChange={(e) => setDeviceUrl(e.target.value)}
              />
            </Grid>
          )}
          <Grid item xs="12" mt={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                width: "255px",
                justifyContent: "center",
              }}
            >
              <CancelBtn onClick={onClose}>Cancel</CancelBtn>
              <Button
                onClick={handleSaveEditDevice}
                startIcon={<SaveIcon />}
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
                {isLoading ? "Saving..." : "Save Device"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default EditDevice;

const CancelBtn = styled("span")({
  fontsize: "16px",
  fontWeight: 600,
  color: "rgba(17, 17, 17, 1)",
  cursor: "pointer",
});
