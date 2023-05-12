import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { People, Description } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const DashboardAdmin = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", paddingTop: 30 }}
    >
      <Box
        component={Paper}
        width="100vw"
        maxWidth={600}
        display="flex"
        justifyContent="center"
        padding={2}
        gap={2}
      >
        <Card
          sx={{
            width: "100%",
            height: 80,
            maxWidth: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/user">
            <CardContent sx={{ display: "flex", gap: 2 }}>
              <People />
              <Typography>Gestão de Usuários</Typography>
            </CardContent>
          </Link>
        </Card>
        <Card
          sx={{
            width: "100%",
            maxWidth: 250,
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent sx={{ display: "flex", gap: 2, cursor: "pointer" }}>
            <Description />
            <Typography>Gestão de Planos</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
