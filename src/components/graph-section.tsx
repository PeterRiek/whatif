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
  const firstTransactionDate = simulationData.transactions[0].date;
  const firstDepotTransactionDate = simulationData.depotTransactions[0].date;
  const startDate =
    firstTransactionDate < firstDepotTransactionDate
      ? firstTransactionDate
      : firstDepotTransactionDate;
  const endDate = simulationData.currentDate;

  const dates = generateDateRange(startDate, endDate, interval);

  const values: number[] = [];
  let balance = 0;
  let transactionIndex = 0;

  dates.forEach((d) => {
    const transactions = simulationData.transactions;
    while (
      transactionIndex < transactions.length &&
      simulationData.transactions[transactionIndex].date <= d
    ) {
      balance += simulationData.transactions[transactionIndex].amount;
      transactionIndex++;
    }
    values.push(balance);
  });

  const stockValues: Record<string, Record<string, number>> = {};

  simulationData.depotTransactions.forEach((t) => (stockValues[t.symbol] = {}));
  const symbols: string[] = Object.keys(stockValues) as string[];
  for (const symbol of symbols) {
    const start = startDate.toLocaleDateString("en-CA");
    const end = endDate.toLocaleDateString("en-CA");
    // const response = await fetch(
    //   `/api/stock/${symbol}?start=${start}&end=${end}&interval=1d`
    // );
    // const url = `/api/stock/${symbol}?start=${start}&end=${end}&interval=1d`;
    const url = `https://api.ahqu.de:2096/api/stock/${symbol}?start=${start}&end=${end}&interval=${"1d"}`;
    const response = await fetch(url);

    const json = await response.json();

    stockValues[symbol] = json;
  }
  const stockShares: Record<string, number> = {};
  const lastStockPrice: Record<string, number> = {};

  const depotValues: number[] = [];
  let depotTransactionIndex = 0;
  let depotBalance = 0;

  dates.forEach((d) => {
    const depotTransactions = simulationData.depotTransactions;
    console.log(
      d.toLocaleDateString("de-DE"),
      depotTransactionIndex,
      depotTransactions.length,
      depotTransactions[depotTransactionIndex]
    );
    while (
      depotTransactionIndex < depotTransactions.length &&
      depotTransactions[depotTransactionIndex].date <= d
    ) {
      const depotTransaction = depotTransactions[depotTransactionIndex];
      const mul = depotTransaction.type == "buy" ? 1 : -1;
      if (!(depotTransaction.symbol in stockShares))
        stockShares[depotTransaction.symbol] = 0;
      stockShares[depotTransaction.symbol] += depotTransaction.shares * mul;
      depotTransactionIndex++;
    }
    const stocks: string[] = Object.keys(stockShares) as string[];
    depotBalance =
      stocks.length == 0
        ? 0
        : stocks
            .map((s) => {
              const q = stockShares[s];
              const v = stockValues[s][d.toLocaleDateString("en-CA")] as number;
              if (v) lastStockPrice[s] = v;
              else if (!Object.keys(lastStockPrice).includes(s)) return 0;
              console.log("q,v", q, lastStockPrice[s]);
              return q * lastStockPrice[s];
            })
            .reduce((a, b) => a + b);
    depotValues.push(depotBalance);
  });

  return { dates: dates, values: values.map((x, i) => x + depotValues[i]) };
};

const GraphSection: React.FC<Props> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const init = async () => {
      setChartData(await calculateChartData(data, "daily"));
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
