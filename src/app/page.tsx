import {
  Button,
  Container,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 4,
      }}
    >
      <Typography variant="h5">Press Button to launch demo</Typography>
      <Button href="/demo" variant="contained" size="large">
        Demo
      </Button>
    </Container>
  );
}
