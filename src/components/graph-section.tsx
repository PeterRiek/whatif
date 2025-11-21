"use client";

import React from "react";
import { SimulationData } from "../types/simulation";
import { Card } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";

interface Props {
  data: SimulationData;
}

const GraphSection: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <LineChart
        xAxis={[
          {
            data: [
              "Jan. 2025",
              "Feb. 2025",
              "Mar. 2025",
              "Apr. 2025",
              "May. 2025",
            ],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [10, 25, 15, 90, 50],
            curve: "linear",
            showMark: false,
            valueFormatter: (value) => `${value} €`
          },
        ]}
        width={300}
        height={300}
      />
    </Card>
  );
};

export default GraphSection;
