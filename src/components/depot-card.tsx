import React from "react";
import { SimulationDepotTransaction } from "../types/simulation";
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

interface Props {
  depotTransaction: SimulationDepotTransaction;
}

const DepotCard: React.FC<Props> = ({ depotTransaction }) => {
  const { date, symbol, shares, pricePerShare, type } = depotTransaction;
  const totalValue = (shares * pricePerShare).toLocaleString("de-DE");

  // Simple avatar: first letter(s) of symbol
  const avatarLetter = symbol.slice(0, 2).toUpperCase();

  return (
    <Card sx={{ p: 1 }}>
      <CardContent sx={{ p: "8px !important" }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Avatar */}
          <Avatar sx={{ width: 40, height: 40 }}>{avatarLetter}</Avatar>

          {/* Symbol + Type */}
          <Stack flex={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              {symbol} — {type.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {date.toLocaleDateString("de-DE")}
            </Typography>
          </Stack>

          {/* Amount (total value) */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color={type === "buy" ? "error.main" : "success.main"} // buying is spending (red), selling earns (green)
          >
            {totalValue} €
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DepotCard;
