import { Class, AddTask } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";

export const Scheme = () => {
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
        <Link to="/scheme/create/criterion">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <AddTask />
            <Typography>Adicionar Critério</Typography>
          </CardContent>
        </Link>
      </Card>
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
        <Link to="/scheme/create">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Class />
            <Typography>Iniciar Plano</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
