export type SimulationTransaction = {
  date: Date;
  name: string;
  amount: number;
  imageUrl: string;
};

export type SimulationDepotTransaction = {
  date: Date;
  symbol: string;
  shares: number;
  pricePerShare?: number;
  type: "buy" | "sell";
};

export type SimulationData = {
  currentDate: Date;
  transactions: SimulationTransaction[];
  depotTransactions: SimulationDepotTransaction[];
};

export type ChartData = {
  dates: Date[];
  values: number[];
}