import React from "react";
import Chart from "react-apexcharts";

const AreaChart = () => {
  // Define the data before using it
  const seriesData = {
    prices: [10, 20, 15, 25, 22, 30, 35, 40, 20, 10, 15, 30, 60, 10, 5], // Replace with your price data
    counts: [0, 2, 4, 6, 8, 10, 12, 14], // X-axis counting values from 0 to 15 (for example)
  };

  // Define the chart options
  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1, // Set stroke width to 1
    },
    xaxis: {
      type: "numeric", // Set x-axis to numeric
      min: 0, // Minimum value on the x-axis
      max: 14, // Maximum value on the x-axis
      tickAmount: 13, // Ensure ticks between 0 to 15 are shown
      labels: {
        formatter: function (value) {
          return Math.floor(value); // Show only whole numbers
        },
      },
      //   title: {
      //     text: "Count", // Optional: Label for the x-axis
      //   },
    },
    yaxis: {
      opposite: false, // Position the y-axis on the left side
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  // Define the series data
  const series = [
    {
      data: seriesData.counts.map((count, index) => [
        count,
        seriesData.prices[index],
      ]), // Map counts to prices
    },
  ];

  return (
    <div id="chart" className="bg-white rounded-lg shadow-md p-3">
      <h3 className="font-[600] text-base  md:text-lg">USERS ACTIVITY</h3>
      <Chart options={options} series={series} type="area" height={310} />
    </div>
  );
};

export default AreaChart;
