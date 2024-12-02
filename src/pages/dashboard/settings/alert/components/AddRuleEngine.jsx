/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "../../../../../assets/svgs/settings/AddIcon";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createRuleEngineActions } from "../../../../../redux/actions/ruleEngine.actions";
import {
  clearRuleEngineError,
  clearRuleEngineMessage,
} from "../../../../../redux/slices/ruleEngine.slice";

const alertType = [
  { type: "speed-alert" },
  { type: "sudden-stop" },
  { type: "two-detection" },
  { type: "tire-pressure" },
  { type: "sensor-offline" },
  { type: "idle-engine" },
  { type: "damage-alert" },
];
const severityType = [{ type: "high" }, { type: "medium" }, { type: "low" }];

const AddRuleEngine = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isAccordionComplete, setIsAccordionComplete] = useState(true);
  const [accordionList, setAccordionList] = useState([{ id: 1, type: "" }]);
  const { message, error } = useSelector((state) => state.ruleEngine);
  const [formData, setFormData] = useState({
    alertName: "",
    severityType: "",
    email: "",
    platform: "",
    status: "",
  });
  const [inputEmail, setInputEmail] = useState(false);

  // Function to add a new accordion
  const handleAddAccordion = () => {
    setAccordionList((prevList) => [
      ...prevList,
      { id: prevList.length + 1 }, // Add a new accordion with a unique ID
    ]);
  };

  // Function to remove an accordion
  const handleRemoveAccordion = (id) => {
    setAccordionList((prevList) =>
      prevList.filter((accordion) => accordion.id !== id)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      platform: checked ? name : "",
    }));
    if (name === "email") {
      setInputEmail(true);
    } else {
      setInputEmail(false);
    }
  };

  const handleSave = async () => {
    const { alertName, email, severityType, platform, status } = formData;
    if (!alertName || !severityType || !platform || !status)
      return toast.error("All fields are required");
    if (platform === "email" && !email) return toast.error("Email is required");
    const alerts = accordionList.map((item) => {
      const data = {};
      if (item?.type) data.type = item.type;
      if (item?.speed) data.speed = item.speed;
      if (item?.tirePressure) data.tirePressure = item.tirePressure;
      if (item?.idleEngineTime) data.idleEngineTime = item.idleEngineTime;
      if (data.type === "speed" && !data.speed) {
        setIsAccordionComplete(false);
        return toast.error("Speed Limit is required for Speed Alert");
      }
      if (data.type === "tire-pressure" && !data.tirePressure) {
        setIsAccordionComplete(false);
        return toast.error(
          "Tire Pressure Limit is required for Tire Pressure Alert"
        );
      }
      if (data.type === "idle-engine" && !data.idleEngineTime) {
        setIsAccordionComplete(false);
        return toast.error(
          "Idle Engine Time Limit is required for Idle Engine Alert"
        );
      }
      if (data.type) return data;
    });
    if (!alerts[0]?.type)
      return toast.error("At least one alert type is required");
    // CHECK IS ALL FIELDS ARE COMPLETED OR NOT
    if (!isAccordionComplete) return setIsAccordionComplete(true);

    // hit the api
    // ------------

    try {
      await dispatch(
        createRuleEngineActions({
          alert: alerts,
          name: formData.alertName,
          severity: formData.severityType,
          platform: formData.platform,
          onMil: formData.email,
          status: formData.status,
        })
      );
    } catch (error) {
      console.log("Error in creating rule engine", error);
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearRuleEngineMessage());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(clearRuleEngineError());
    }
  }, [message, error, dispatch, onClose]);
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">RULE ENGINE</Typography>
        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
          <CloseIcon />
        </Box>
      </Box>

      {/* Form */}
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* Alert Name Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="alertName"
              type="text"
              required
              fullWidth
              label="Alert Name"
              onChange={handleChange}
              value={formData.alertName || ""}
            />
          </Grid>
          {/* Severity Type Dropdown */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="severityType"
              onChange={handleChange}
              select
              required
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
          <Grid item xs={12} sm={6}>
            <TextField
              name="status"
              onChange={handleChange}
              select
              required
              fullWidth
              label="Status"
              value={formData.status}
            >
              {["enable", "disable"].map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type?.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Email Input */}
          {inputEmail && (
            <Grid item xs={12}>
              <TextField
                type="email"
                name="email"
                required
                onChange={handleChange}
                fullWidth
                label="Email"
                value={formData.email || ""}
              />
            </Grid>
          )}

          {/* Notification Type */}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
              NOTIFICATION TYPE*
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="email"
                    checked={formData?.platform === "email"}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="platform"
                    checked={formData?.platform === "platform"}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Platform"
              />
            </FormGroup>
          </Grid>

          {/* Accordion Component */}
          <Grid item xs={12}>
            {accordionList?.map((accordion) => (
              <Accordion
                key={accordion?.id}
                id={accordion?.id}
                onRemove={handleRemoveAccordion}
                handleChange={handleChange}
                accordionList={accordionList}
                setAccordionList={setAccordionList}
              />
            ))}
          </Grid>
          <Box sx={{ ml: "auto" }}>
            <IconButton
              onClick={handleAddAccordion}
              color="primary"
              aria-label="add accordion"
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Save and Cancel Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "1rem",
          }}
        >
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
            onClick={handleSave}
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
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const Accordion = ({ id, onRemove, accordionList, setAccordionList }) => {
  const [formData, setFormData] = useState({});

  // Handle alert type change
  const handleChange = (e) => {
    setAccordionList((prevList) =>
      prevList.map((accordion) => {
        if (accordion.id === id) {
          return {
            ...accordion,
            [e.target.name]: e.target.value,
          };
        }
        return accordion;
      })
    );
  };

  // Filter alert types based on what's already selected
  const availableAlertTypes = alertType.filter((type) => {
    const allSelectedAlertTypes = accordionList?.map(
      (accordion) => accordion.alert
    );
    return !allSelectedAlertTypes.includes(type?.type);
  });

  useEffect(() => {
    setFormData(accordionList.find((accordion) => accordion?.id === id) || {});
  }, [id, accordionList]);

  return (
    <MuiAccordion sx={{ margin: "10px 0" }}>
      {/* Accordion Summary */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ fontWeight: "600", fontSize: "15px" }}>
          Alert Configuration
        </Typography>
      </AccordionSummary>

      {/* Accordion Details */}
      <AccordionDetails>
        <Grid container spacing={2}>
          {/* Alert Type Dropdown */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="type"
              onChange={handleChange}
              select
              required
              fullWidth
              label="Alert Type"
              value={formData?.type || ""}
            >
              {availableAlertTypes.map((type, i) => (
                <MenuItem key={i} value={type.type}>
                  {type?.type?.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Additional Fields for Specific Alert Types */}
          {formData?.type === "idle-engine" && (
            <Grid item xs={12} sm={6}>
              <TextField
                name="idleEngineTime"
                fullWidth
                required
                type="time"
                onChange={handleChange}
                value={formData?.idleEngineTime || ""}
              />
            </Grid>
          )}
          {formData?.type === "tire-pressure" && (
            <Grid item xs={12} sm={6}>
              <TextField
                name="tirePressure"
                label="Tire Pressure"
                fullWidth
                required
                type="number"
                onChange={handleChange}
                value={formData?.tirePressure || ""}
              />
            </Grid>
          )}
          {formData?.type === "speed-alert" && (
            <Grid item xs={12} sm={6}>
              <TextField
                name="speed"
                label="Speed Limit"
                fullWidth
                required
                type="number"
                onChange={handleChange}
                value={formData?.speed || ""}
              />
            </Grid>
          )}
        </Grid>
        <Box sx={{ ml: "auto", mt: 2 }}>
          <Button variant="contained" onClick={() => onRemove(id)}>
            Cancel
          </Button>
        </Box>
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default AddRuleEngine;
