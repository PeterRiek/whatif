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
      <Typography paddingTop={2} variant="h5">Kontostand Verlauf</Typography>
      <GraphSection data={simulationData} />
      <Typography paddingTop={2} variant="h5">Depot Aktivitäten</Typography>
      <DepotSection depotTransactions={simulationData.depotTransactions} />
      <Typography paddingTop={2} variant="h5">Transaktionen</Typography>
      <TransactionSection transactions={simulationData.transactions} />
    </Container>
  );
};

export default Simulation;
