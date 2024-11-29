/* eslint-disable react/prop-types */
import { useState } from "react";
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

const RuleEngine = ({ onClose }) => {
  const [accordionList, setAccordionList] = useState([{ id: 1 }]);
  const [name, setName] = useState("");
  const [selectedAlertTypes, setSelectedAlertTypes] = useState([]); // Track selected alert types globally
  const [formData, setFormData] = useState({
    alertName: "",
    severityType: "",
    email: "",
    platform: "",
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
    setSelectedAlertTypes(
      (prev) => prev.filter((item) => item.accordionId !== id) // Remove associated alert type from selectedAlertTypes
    );
  };

  // Update selected alert types
  const handleAlertTypeChange = (id, selectedType) => {
    setSelectedAlertTypes((prev) => {
      const filtered = prev.filter((item) => item.accordionId !== id);
      if (selectedType) {
        filtered.push({ accordionId: id, type: selectedType });
      }
      return filtered;
    });
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

  const handleSave = () => {
    // Mock save action (add actual save logic as required)
    console.log("=========Form Data========", formData);
  };

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

          {/* Email Input */}
          {inputEmail && (
            <Grid item xs={12}>
              <TextField
                type="email"
                name="email"
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
                    checked={formData.platform === "email"}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="platform"
                    checked={formData.platform === "platform"}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Platform"
              />
            </FormGroup>
          </Grid>

          {/* Accordion Component */}
          <Grid item xs={12}>
            {accordionList.map((accordion) => (
              <Accordion
                key={accordion.id}
                id={accordion.id}
                onRemove={handleRemoveAccordion}
                selectedAlertTypes={selectedAlertTypes}
                onAlertTypeChange={handleAlertTypeChange}
                handleChange={handleChange}
                formData={formData}
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

const Accordion = ({ id, onRemove, selectedAlertTypes, onAlertTypeChange }) => {
  const [formData, setFormData] = useState({
    alertType: "",
  });

  // Handle alert type change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "alertType") {
      onAlertTypeChange(id, value); // Notify parent about alert type change
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter alert types based on what's already selected
  const availableAlertTypes = alertType.filter(
    (type) =>
      !selectedAlertTypes.some(
        (selected) => selected.type === type.type && selected.accordionId !== id
      )
  );

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
              name="alertType"
              onChange={handleChange}
              select
              fullWidth
              label="Alert Type"
              value={formData.alertType}
            >
              {availableAlertTypes.map((type, i) => (
                <MenuItem key={i} value={type.type}>
                  {type.type?.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Additional Fields for Specific Alert Types */}
          {formData.alertType === "idle-engine" && (
            <Grid item xs={12} sm={6}>
              <TextField
                name="idleTime"
                fullWidth
                type="time"
                onChange={handleChange}
                value={formData.idleTime || ""}
              />
            </Grid>
          )}
          {formData.alertType === "tire-pressure" && (
            <Grid item xs={12} sm={6}>
              <TextField
                name="tirePressure"
                label="Tire Pressure"
                fullWidth
                type="number"
                onChange={handleChange}
                value={formData.tirePressure || ""}
              />
            </Grid>
          )}
          {formData.alertType === "speed-alert" && (
            <Grid item xs={12} sm={6}>
              <TextField
                name="speedLimit"
                label="Speed Limit"
                fullWidth
                type="number"
                onChange={handleChange}
                value={formData.speedLimit || ""}
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

export default RuleEngine;
