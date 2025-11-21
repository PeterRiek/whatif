import { Container, Typography } from "@mui/material";
import React from "react";
import DepotSection from "./depot-section";
import GraphSection from "./graph-section";
import TransactionSection from "./transaction-section";
import { SimulationData } from "../types/simulation";

interface Props {
  simulationData: SimulationData;
}

const Simulation: React.FC<Props> = ({ simulationData }) => {
  return (
    <Container>
      <Typography variant="h5">Graph</Typography>
      <GraphSection data={simulationData} />
      <Typography variant="h5">Depot</Typography>
      <DepotSection depotTransactions={simulationData.depotTransactions} />
      <Typography variant="h5">Transactions</Typography>
      <TransactionSection transactions={simulationData.transactions} />
    </Container>
  );
};

export default Simulation;
