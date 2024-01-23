import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Product C1", 11],
  ["Product C1", 2],
  ["Product C1", 2],
  ["Product C1", 2],
  ["Product C1", 7], // CSS-style declaration
];

export const options = {
  title: "Daily Product Orders",
  pieHole: 0.4,
  is3D: false,
};

export default function Piechart() {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
