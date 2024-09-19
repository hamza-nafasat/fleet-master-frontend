import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const ConfigurationSettings = () => {
  return (
    <Box
      sx={{
        background: "#F5F4F4",
        padding: "16px",
        borderRadius: "24px",
      }}
    >
      <Grid container>
        <Grid item xs={12} lg={8}>
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
                //   value={values.deviceType}
                //   onBlur={handleBlur}
                //   onChange={handleChange}
              >
                <MenuItem value="10-seconds">10 Seconds</MenuItem>
                <MenuItem value="20-seconds">20 Seconds</MenuItem>
                <MenuItem value="30-seconds">30 Seconds</MenuItem>
                <MenuItem value="40-seconds">40 Seconds</MenuItem>
                <MenuItem value="60-seconds">60 Seconds</MenuItem>
                <MenuItem value="80-seconds">1.2 minute</MenuItem>
                <MenuItem value="100-seconds">1.5 minute</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfigurationSettings;

const Heading = ({ heading }) => {
  return (
    <Typography
      sx={{
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
