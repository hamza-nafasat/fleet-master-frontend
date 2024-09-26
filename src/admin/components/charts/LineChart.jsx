import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ data }) => {
  const [trend, setTrend] = useState("");
  const [difference, setDifference] = useState(0);
  const [lineColor, setLineColor] = useState("#18BC9C"); // Default color

  useEffect(() => {
    if (data && data.length > 1) {
      const lastValue = data[data.length - 1]; // Last value in the dataset
      const secondLastValue = data[data.length - 2]; // Second last value in the dataset
      const diff = lastValue - secondLastValue; // Calculate the difference
      setDifference(Math.abs(diff)); // Absolute difference

      // Determine the trend (rising or descending) and update the line color
      if (lastValue > secondLastValue) {
        setTrend("rising");
        setLineColor("#18BC9C"); // Green for rising trend
      } else if (lastValue < secondLastValue) {
        setTrend("descending");
        setLineColor("#F94949"); // Red for descending trend
      } else {
        setTrend("no change");
        setLineColor("#777"); // Neutral color for no change
      }
    }
  }, [data]);

  // Chart options
  const options = {
    chart: {
      height: 60, // Small chart height
      width: 100, // Fixed width for a small chart
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
      sparkline: { enabled: true }, // Minimal chart design
    },
    stroke: {
      curve: "straight",
      width: 2,
      colors: [lineColor], // Dynamic line color based on trend
    },
    markers: { size: 0 },
    tooltip: { enabled: false },
    grid: { show: false },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { show: false } },
  };

  const series = [
    {
      name: "Data",
      data: data || [], // Use passed data
    },
  ];

  return (
    <div style={{ maxWidth: "120px", margin: "auto" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={60}
      />
      <div>
        <p style={{ fontSize: "12px", textAlign: "center", color: lineColor }}>
          {/* Show trend and difference */}
          {trend === "rising" && `Rising by ${difference}`}
          {trend === "descending" && `Falling by ${difference}`}
          {trend === "no change" && "No Change"}
        </p>
      </div>
    </div>
  );
};

export default LineChart;
