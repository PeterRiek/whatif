import React from "react";
import { SimulationTransaction } from "../types/simulation";
import TransactionCard from "./transaction-card";
import { Stack } from "@mui/material";

interface Props {
  transactions: SimulationTransaction[];
}

const TransactionSection: React.FC<Props> = ({ transactions }) => {
  return (
    <>
      <Stack spacing={1}>
        {transactions.map((transaction, index) => (
          <TransactionCard transaction={transaction} key={index} />
        ))}
      </Stack>
    </>
  );
};

export default TransactionSection;
