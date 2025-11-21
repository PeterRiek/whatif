import React from "react";
import { SimulationTransaction } from "../types/simulation";
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

interface Props {
  transaction: SimulationTransaction;
}

const TransactionCard: React.FC<Props> = ({ transaction }) => {
  return (
    <>
      <Card sx={{ p: 1 }}>
        <CardContent sx={{ p: "8px !important" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Icon */}
            <Avatar
              src={transaction.imageUrl}
              sx={{ "& img": { objectFit: "contain" } }}
            />
            {/* Name + Date */}
            <Stack flex={1}>
              <Typography variant="subtitle1" fontWeight={600}>
                {transaction.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {transaction.date}
              </Typography>
            </Stack>

            {/* Amount */}
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color={transaction.amount >= 0 ? "success.main" : "error.main"}
            >
              {transaction.amount}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionCard;
