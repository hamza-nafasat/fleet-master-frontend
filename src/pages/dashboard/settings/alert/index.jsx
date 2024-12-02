import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AlertType from "./AlertType";
import RuleEngines from "./RuleEngines";

const AllAlerts = () => {
  const [value, setValue] = useState("Alerts");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "24px 24px 0 0",
        marginTop: "-3.5rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Alerts" value="Alerts" />
        <Tab label="Rule Engine" value="RuleEngine" />
      </Tabs>

      <Box sx={{ padding: "16px", marginTop: "30px" }}>
        {value === "Alerts" && <AlertType />}
        {value === "RuleEngine" && <RuleEngines />}
      </Box>
    </Box>
  );
};

export default AllAlerts;
