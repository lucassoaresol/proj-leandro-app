import { Card, CardContent, Typography } from "@mui/material";
import { People, Description } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { BasePage } from "../../shared/components";

export const DashboardAdmin = () => {
  return (
    <BasePage isProfile>
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
        <Link to="/scheme">
          <CardContent sx={{ display: "flex", gap: 2, cursor: "pointer" }}>
            <Description />
            <Typography>Gestão de Planos</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
