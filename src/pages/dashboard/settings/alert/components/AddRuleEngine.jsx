/* eslint-disable react/prop-types */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Accordion as MuiAccordion,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import AddIcon from "../../../../../assets/svgs/settings/AddIcon";
import { createRuleEngineActions, getAllRuleEngineActions } from "../../../../../redux/actions/ruleEngine.actions";

const severityType = [{ type: "high" }, { type: "medium" }, { type: "low" }];

const AddRuleEngine = ({ onClose }) => {
  const { trucks } = useSelector((state) => state.truck);
  const dispatch = useDispatch();
  const [addLoading, setAddLoading] = useState(false);
  const [isAccordionComplete, setIsAccordionComplete] = useState(true);
  const [accordionList, setAccordionList] = useState([{ id: 1, type: "" }]);
  const [inputEmail, setInputEmail] = useState(false);
  const [formData, setFormData] = useState({
    alertName: "",
    severityType: "",
    email: "",
    platform: "",
    status: "",
    truck: "",
  });

  // Function to add a new accordion
  const handleAddAccordion = () => {
    setAccordionList((prevList) => [...prevList, { id: prevList.length + 1 }]);
  };

  // Function to remove an accordion
  const handleRemoveAccordion = (id) => {
    setAccordionList((prevList) => prevList.filter((accordion) => accordion.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
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
    const { alertName, email, severityType, platform, status, truck } = formData;
    if (!alertName || !severityType || !platform || !status || !truck?._id)
      return toast.error("All fields are required");
    if (platform === "email" && !email) return toast.error("Email is required");
    const alerts = accordionList.map((item) => {
      if (!item.sensor.uniqueId) return toast.error(`Select Sensor for ${item.type}`);
      const data = {};
      if (item?.type) data.type = item.type;
      if (item?.speed) data.speed = item.speed;
      if (item?.lessThen) data.lessThen = item.lessThen;
      if (item?.moreThen) data.moreThen = item.moreThen;
      if (item?.sensor) data.sensorUniqueId = item?.sensor?.uniqueId;
      if (data.type) return data;
    });
    if (!alerts[0]?.type) return toast.error("At least one alert type is required");
    // CHECK IS ALL FIELDS ARE COMPLETED OR NOT
    if (!isAccordionComplete) return setIsAccordionComplete(true);

    // hit the api
    // ------------
    try {
      setAddLoading(true);
      await dispatch(
        createRuleEngineActions({
          alerts: alerts,
          name: formData.alertName,
          severity: formData.severityType,
          platform: formData.platform,
          onMil: formData.email,
          truck: formData.truck._id,
          status: formData.status,
        })
      );
      await dispatch(getAllRuleEngineActions());
      setAddLoading(false);
    } catch (error) {
      setAddLoading(false);
      console.log("Error in creating rule engine", error);
    }
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
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <TextField
              name="truck"
              onChange={handleChange}
              select
              fullWidth
              label="Select Truck"
              value={formData.truck || ""}
            >
              {trucks.map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type.truckName?.toUpperCase()}
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
                  <Checkbox name="email" checked={formData?.platform === "email"} onChange={handleCheckboxChange} />
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
                truck={formData?.truck}
                onRemove={handleRemoveAccordion}
                handleChange={handleChange}
                accordionList={accordionList}
                setAccordionList={setAccordionList}
              />
            ))}
          </Grid>
          <Box sx={{ ml: "auto" }}>
            <IconButton onClick={handleAddAccordion} color="primary" aria-label="add accordion">
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
            disabled={addLoading}
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

const Accordion = ({ id, onRemove, accordionList, setAccordionList, truck }) => {
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
          <Grid item xs={12} lg={6}>
            <TextField
              name="sensor"
              onChange={handleChange}
              select
              fullWidth
              label="Select Sensor"
              value={formData?.sensor || ""}
            >
              {truck?.devices?.length ? (
                truck?.devices?.map((sensor, i) => (
                  <MenuItem key={i} value={sensor}>
                    {sensor?.name?.toUpperCase()}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={""}>{"No sensors available"}</MenuItem>
              )}
            </TextField>
          </Grid>
          {/* <MultiSelectParameters setSelectedParameters={setSelectedParameters} parameters={parameters} /> */}
          <Grid item xs={12} lg={6}>
            <TextField
              name="type"
              onChange={handleChange}
              select
              required
              fullWidth
              label="Alert Type"
              value={formData?.type || ""}
            >
              {formData?.sensor?.parameters?.map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type?.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lessThen"
              fullWidth
              label="Less Then"
              type="number"
              onChange={handleChange}
              value={formData?.lessThen || ""}
            />
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <TextField
              name="moreThen"
              fullWidth
              label="More Then"
              type="number"
              onChange={handleChange}
              value={formData?.moreThen || ""}
            />
          </Grid>
          {/* Additional Fields for Specific Alert Types */}
          {/* {(formData?.type === "tire-pressure" || formData?.type === "speed-alert") && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lessThen"
                  fullWidth
                  label="Less Then"
                  type="number"
                  onChange={handleChange}
                  value={formData?.lessThen || ""}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="moreThen"
                  fullWidth
                  label="More Then"
                  type="number"
                  onChange={handleChange}
                  value={formData?.moreThen || ""}
                />
              </Grid>
            </>
          )}
          {formData?.type === "idle-engine" && (
            <Grid item xs={12} sm={6}>
              <TextField
                name="moreThen"
                label="Time in Seconds"
                fullWidth
                type="number"
                onChange={handleChange}
                value={formData?.moreThen || ""}
              />
            </Grid>
          )} */}
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
