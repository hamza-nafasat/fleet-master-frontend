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
  { type: "infence" },
  { type: "outfence" },
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

  // Function to add a new accordion
  const handleAddAccordion = () => {
    setAccordionList((prevList) => [
      ...prevList,
      { id: prevList.length + 1 }, // Add a new accordion with a unique ID
    ]);
  };

  // Mock save action
  const handleSave = () => {
    // if (!formData.alertType || !formData.severityType || !formData.platform) {
    //   alert("All fields are required");
    //   return;
    // }
    // console.log("Saved Form Data:", formData);
  };

  const handleRemoveAccordion = (id) => {
    setAccordionList((prevList) =>
      prevList.filter((accordion) => accordion.id !== id)
    );
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
          <Grid item xs={12}>
            <TextField
              name="alertName"
              type="text"
              fullWidth
              label="Alert Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Grid>

          {/* Accordion Component */}
          <Grid item xs={12}>
            {accordionList.map((accordion) => (
              <Accordion
                key={accordion.id}
                onRemove={handleRemoveAccordion}
                id={accordion.id}
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

export default RuleEngine;

const Accordion = ({ id, onRemove }) => {
  const [inputEmail, setInputEmail] = useState(false);
  const [formData, setFormData] = useState({
    alertType: "",
    severityType: "",
    email: "",
    platform: "",
  });

  // Handle changes for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handle checkbox toggling for email and platform
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      platform: checked ? name : "",
    }));
    if (name == "email") {
      setInputEmail(true);
    } else {
      setInputEmail(false);
    }
  };
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
              {alertType.map((type, i) => (
                <MenuItem key={i} value={type.type}>
                  {type.type?.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
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

          {/* Conditional Fields Based on Alert Type */}
          {formData.alertType === "idle-engine" && (
            <Grid item xs={12}>
              <TextField
                name="idleTime"
                fullWidth
                type="time"
                onChange={handleChange}
                value={formData.idleTime || ""}
                label="Idle Engine Time"
              />
            </Grid>
          )}
          {formData.alertType === "tire-pressure" && (
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
          <Box sx={{ ml: "auto" }}>
            <Button variant="contained" onClick={() => onRemove(id)}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </AccordionDetails>
    </MuiAccordion>
  );
};
