import React from "react";
import { SimulationDepotTransaction } from "../types/simulation";
import { Card, Stack, Typography } from "@mui/material";
import DepotCard from "./depot-card";

interface Props {
  depotTransactions: SimulationDepotTransaction[];
}

const DepotSection: React.FC<Props> = ({ depotTransactions }) => {
  return (
    <>
      <Stack spacing={1}>
        {depotTransactions.length == 0 && (
          <Typography>Keine Depot Transaktionen getätigt.</Typography>
        )}
        {depotTransactions.map((depotTransaction, index) => (
          <DepotCard depotTransaction={depotTransaction} key={index} />
        ))}
      </Stack>
    </>
  );
};

export default DepotSection;
