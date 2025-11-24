"use client";

import React, { useEffect, useState } from "react";
import { ChartData, SimulationData } from "../types/simulation";
import { Card, CircularProgress } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";

interface Props {
  data: SimulationData;
}

type Interval = "daily" | "weekly" | "monthly" | "yearly";

const generateDateRange = (
  start: Date,
  end: Date,
  interval: Interval
): Date[] => {
  const startDate = start;
  const endDate = end;
  const result: Date[] = [];

  const addInterval = (d: Date) => {
    const newDate = new Date(d);
    switch (interval) {
      case "daily":
        newDate.setDate(d.getDate() + 1);
        break;
      case "weekly":
        newDate.setDate(d.getDate() + 7);
        break;
      case "monthly":
        newDate.setMonth(d.getMonth() + 1);
        break;
      case "yearly":
        newDate.setFullYear(d.getFullYear() + 1);
        break;
    }
    return newDate;
  };

  let current = startDate;

  while (current <= endDate) {
    result.push(current);
    current = addInterval(current);
  }

  return result;
};

const calculateChartData = (
  simulationData: SimulationData,
  interval: Interval = "daily"
): ChartData => {
  const firstTransactionDate = new Date(simulationData.transactions[0].date);
  const firstDepotTransactionDate = new Date(
    simulationData.depotTransactions[0].date
  );
  const startDate =
    firstTransactionDate < firstDepotTransactionDate
      ? firstTransactionDate
      : firstDepotTransactionDate;
  const endDate = new Date(simulationData.currentDate);

  const dates = generateDateRange(startDate, endDate, interval);
  const values: number[] = [];

  let balance = 0;
  let transactionIndex = 0;

  dates.forEach((d) => {
    const transactions = simulationData.transactions;
    while (
      transactionIndex < transactions.length &&
      new Date(simulationData.transactions[transactionIndex].date) <= d
    ) {
      balance += simulationData.transactions[transactionIndex].amount;
      transactionIndex++;
      console.log(balance, transactionIndex);
    }
    values.push(balance);
  });

  return { dates: dates.map((d) => d.toLocaleDateString("DE-de")), values };
};

const GraphSection: React.FC<Props> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    setChartData(calculateChartData(data, "daily"));
  }, [data]);

  return (
    <Card>
      {!chartData ? (
        <CircularProgress />
      ) : (
        <LineChart
          xAxis={[
            {
              data: chartData.dates,
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: chartData.values,
              curve: "linear",
              showMark: false,
              valueFormatter: (value) => `${value} €`,
            },
          ]}
          width={300}
          height={300}
        />
      )}
    </Card>
  );
};

export default GraphSection;
