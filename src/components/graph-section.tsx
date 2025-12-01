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

const calculateChartData = async (
  simulationData: SimulationData,
  interval: Interval = "daily"
): Promise<ChartData> => {
  const { transactions, depotTransactions, currentDate } = simulationData;

  // --- HANDLE CASE: no data at all ---
  if (transactions.length === 0 && depotTransactions.length === 0) {
    return { dates: [], values: [] };
  }

  // --- HANDLE CASE: transactions empty → only depot transactions used ---
  // --- HANDLE CASE: depotTransactions empty → only transactions used ---
  const firstTransactionDate = transactions.length > 0 ? transactions[0].date : null;
  const firstDepotTransactionDate =
    depotTransactions.length > 0 ? depotTransactions[0].date : null;

  // Determine start date safely
  let startDate: Date;
  if (firstTransactionDate && firstDepotTransactionDate) {
    startDate =
      firstTransactionDate < firstDepotTransactionDate
        ? firstTransactionDate
        : firstDepotTransactionDate;
  } else {
    startDate = firstTransactionDate || firstDepotTransactionDate || currentDate;
  }

  const endDate = currentDate;
  const dates = generateDateRange(startDate, endDate, interval);

  // ------- TRANSACTIONS BALANCE -------
  const values: number[] = [];
  let balance = 0;
  let transactionIndex = 0;

  dates.forEach((d) => {
    while (
      transactionIndex < transactions.length &&
      transactions[transactionIndex].date <= d
    ) {
      balance += transactions[transactionIndex].amount;
      transactionIndex++;
    }
    values.push(balance);
  });

  // ------- DEPOT BALANCES -------
  if (depotTransactions.length === 0) {
    return {
      dates,
      values, // only cash balance
    };
  }

  const stockValues: Record<string, Record<string, number>> = {};
  simulationData.depotTransactions.forEach((t) => (stockValues[t.symbol] = {}));

  const symbols = Object.keys(stockValues);

  for (const symbol of symbols) {
    const start = startDate.toLocaleDateString("en-CA");
    const end = endDate.toLocaleDateString("en-CA");
    const url = `https://api.ahqu.de:2096/api/stock/${symbol}?start=${start}&end=${end}&interval=1wk`;

    const response = await fetch(url);
    stockValues[symbol] = await response.json();
  }

  const stockShares: Record<string, number> = {};
  const lastStockPrice: Record<string, number> = {};

  const depotValues: number[] = [];
  let depotTransactionIndex = 0;
  let depotBalance = 0;

  dates.forEach((d) => {
    while (
      depotTransactionIndex < depotTransactions.length &&
      depotTransactions[depotTransactionIndex].date <= d
    ) {
      const dep = depotTransactions[depotTransactionIndex];
      const mul = dep.type === "buy" ? 1 : -1;

      stockShares[dep.symbol] = (stockShares[dep.symbol] || 0) + dep.shares * mul;

      depotTransactionIndex++;
    }

    const symbols = Object.keys(stockShares);
    depotBalance =
      symbols.length === 0
        ? 0
        : symbols.reduce((acc, s) => {
            const q = stockShares[s];
            const price = stockValues[s][d.toLocaleDateString("en-CA")];

            if (price) {
              lastStockPrice[s] = price;
            }

            return acc + q * (lastStockPrice[s] || 0);
          }, 0);

    depotValues.push(depotBalance);
  });

  return {
    dates,
    values: values.map((v, i) => v + depotValues[i]),
  };
};

const GraphSection: React.FC<Props> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (!data) return;
    console.log("graph working with", data);
    const init = async () => {
      setChartData(await calculateChartData(data, "weekly"));
    };
    init();
  }, [data]);

  return (
    <Card>
      {!chartData ? (
        <CircularProgress />
      ) : (
        <LineChart
          xAxis={[
            {
              data: chartData.dates.map((d) => d.toLocaleDateString("de-DE")),
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
