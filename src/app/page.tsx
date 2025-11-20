import { Card, CircularProgress, Container } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
        <CircularProgress />
      </Card>
    </Container>
  );
}
