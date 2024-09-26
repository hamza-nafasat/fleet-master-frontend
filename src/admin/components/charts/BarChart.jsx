import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Dropdown from "../shared/Dropdown";

const BarChart = () => {
  // Chart options and data as state
  const [options] = useState({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    colors: ["#007AFF", "#A6D1FF", "#00E396"],
  });

  // Series data as state
  const [series] = useState([
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    // {
    //   name: 'Free Cash Flow',
    //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    // },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-[600] md:text-xl text-lg ">Revenue Overview</h3>
        <Dropdown
          color="#007AFF"
          options={[
            { option: "This week" },
            { option: "This month" },
            { option: "This year" },
          ]}
        />
      </div>
      <div id="chart" className="bg-white shadow-md p-3 rounded-lg">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default BarChart;
