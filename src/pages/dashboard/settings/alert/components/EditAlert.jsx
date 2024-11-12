/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import { getAllAlertsActions, updateAlertAction } from "../../../../../redux/actions/alert.actions";

const alertType = [
  { type: "infence" },
  { type: "outfence" },
  { type: "speed" },
  { type: "sensor-damage" },
  { type: "sudden-stop" },
  { type: "two-detection" },
  { type: "tire-pressure" },
  { type: "sensor-offline" },
  { type: "crash-detection" 
];
const severityType = [{ type: "high" }, { type: "medium" }, { type: "low" }];
const status = [{ type: "enable" }, { type: "disable" }];

const EditAlert = ({ alert, onClose }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.alert);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    alertType: alert.type,
    severityType: alert.severity,
    platform: alert.platform,
    status: alert.status,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      await dispatch(
        updateAlertAction({
          alertId: alert._id,
          platform: formData.platform,
          severity: formData.severityType,
          type: formData.alertType,
          status: formData.status,
        })
      );
      await dispatch(getAllAlertsActions());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message) onClose();
  }, [message, onClose]);

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
          ADD ALERT
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
          <CloseIcon />
        </Box>
      </Box>
      {/* Form  */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          marginTop: {
            xs: "1rem",
            lg: "2.5rem",
          },
        }}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                name="alertType"
                onChange={handleChange}
                select
                fullWidth
                label="Alert Type"
                value={formData.alertType}
              >
                {alertType.map((type, i) => (
                  <MenuItem key={i} value={type.type}>
                    {type.type?.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="severityType"
                onChange={handleChange}
                select
                fullWidth
                label="Severity Type"
                value={formData.severityType}
              >
                {severityType.map((type, i) => (
                  <MenuItem key={i} value={type.type}>
                    {type.type?.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="status"
                onChange={handleChange}
                select
                fullWidth
                label="Status"
                value={formData.status}
              >
                {status.map((s, i) => (
                  <MenuItem key={i} value={s.type}>
                    {s.type?.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
              mt={3}
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(17, 17, 17, 1)",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                NOTIFICATION TYPE*
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  sx={{ color: "rgba(17, 17, 17, 1)", fontWeight: 600 }}
                  control={
                    <Checkbox
                      checked={formData.platform === "email"}
                      value={"email"}
                      onChange={handleChange}
                      name="platform"
                    />
                  }
                  label="email"
                />
                <FormControlLabel
                  sx={{ color: "rgba(17, 17, 17, 1)", fontWeight: 600 }}
                  control={
                    <Checkbox
                      value={"platform"}
                      checked={formData.platform === "platform"}
                      onChange={handleChange}
                      name="platform"
                    />
                  }
                  label="platform"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: "1rem",
              justifyContent: "flex-end",
              flexGrow: 1,
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  color: "#fff",
                  borderRadius: "16px",
                  width: "137px",
                  padding: "16px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={isLoading}
                onClick={handleUpdate}
                sx={{
                  color: "#fff",
                  borderRadius: "16px",
                  width: "137px",
                  padding: "16px",
                  ":disabled": {
                    opacity: 0.5,
                    cursor: "not-allowed",
                  },
                }}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default EditAlert;
