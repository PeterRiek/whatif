export type SimulationTransaction = {
  date: string;
  name: string;
  amount: number;
  imageUrl: string;
};

export type SimulationDepotTransaction = {
  date: string;
  symbol: string;
  shares: number;
  pricePerShare: number;
  type: "buy" | "sell";
};

export type SimulationData = {
  currentDate: string;
  transactions: SimulationTransaction[];
  depotTransactions: SimulationDepotTransaction[];
};

export type ChartData = {
  dates: string[];
  values: number[];
}