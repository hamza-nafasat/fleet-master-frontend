/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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

const ReportChart = ({ crashReport }) => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    if (crashReport) {
      const data = [];
      for (let i = 0; i < crashReport?.label?.length; i++) {
        let obj = { label: "", crashReport: "" };
        obj.label = crashReport?.label[i];
        obj.crashReport = crashReport?.data[i];
        data.push(obj);
      }
      setCombinedData(data);
    }
  }, [crashReport]);

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
            {/* Gradient for Crash report */}
            <linearGradient id="colorTruck" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f86f7" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#b3d4fc" stopOpacity={0.3} />
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
          {/* Truck crashReport */}
          <Area
            type="linear"
            dataKey="crashReport"
            stroke="#4f86f7"
            strokeWidth={1}
            fillOpacity={1}
            strokeDasharray="5 5"
            fill="url(#colorTruck)"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ReportChart;
