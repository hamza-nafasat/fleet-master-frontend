/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

const ReportChart = ({ trucksData, driversData }) => {
  const [combinedData, setCombinedData] = React.useState([]);

  useEffect(() => {
    if (trucksData && driversData) {
      const data = [];
      for (let i = 0; i < driversData?.label?.length; i++) {
        let obj = { label: "", driverData: "", truckData: "" };
        obj.label = driversData?.label[i];
        obj.driverData = driversData?.data[i];
        obj.truckData = trucksData?.data[i];
        data.push(obj);
      }
      setCombinedData(data);
    }
  }, [trucksData, driversData]);

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: "16px",
            md: "24px",
          },
          fontWeight: "600",
          textTransform: "uppercase",
          padding: "1rem",
        }}
      >
        Reported Crashes on the Road
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={combinedData}
          margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
          stackOffset="expand"
        >
          <defs>
            {/* Gradient for Truck Data */}
            <linearGradient id="colorTruck" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f86f7" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#b3d4fc" stopOpacity={0.3} />
            </linearGradient>
            {/* Gradient for Driver Data */}
            <linearGradient id="colorDriver" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#b4f0d9" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#ccc" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={["auto", "auto"]}
            tickCount={7}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          {/* Truck Data Area */}
          <Area
            type="linear"
            dataKey="truckData"
            stroke="#4f86f7"
            strokeWidth={1}
            fillOpacity={1}
            fill="url(#colorTruck)"
            stackId="1"
          />
          {/* Driver Data Area */}
          <Area
            type="linear"
            dataKey="driverData"
            stroke="#00C49F"
            strokeWidth={1}
            fillOpacity={1}
            fill="url(#colorDriver)"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ReportChart;
