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
        textAlign: "center",
        maxWidth: "600px",
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        Willkommen zu unserem ersten Prototypen
      </Typography>

      <Typography variant="body1">
        Dies ist ein früher Konzept-Entwurf unserer Idee: eine digitale
        Zwillingsversion einer Banking-App, mit der man persönliche
        Finanzen sicher und interaktiv erkunden kann.
      </Typography>

      <Typography variant="body1">
        Wichtig: Dies ist kein Live-System. Der sichtbare Assistent ist
        nicht mit einem echten KI-Backend verbunden. Die angezeigten
        Szenarien stammen jedoch tatsächlich aus Ausgaben eines KI-Agenten
        und werden hier in vereinfachter Form dargestellt.
      </Typography>

      <Typography variant="body1">
        Dieser Prototyp soll einen ersten Eindruck geben, wie ein
        KI-gestütztes, interaktives Lernerlebnis rund um Finanzen aussehen
        kann.
      </Typography>

      <Button href="/demo" variant="contained" size="large">
        Demo starten
      </Button>
    </Container>
  );
}
