import {
  PersonAdd,
  Class,
  HowToReg,
  PeopleAlt,
  AddTask,
} from "@mui/icons-material";
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
        <Link to="/user/create">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <PersonAdd />
            <Typography>Adicionar Usuário</Typography>
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
        <Link to="/user/accept">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <HowToReg />
            <Typography>Aceitar Usuário</Typography>
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
        <Link to="/user/list">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <PeopleAlt />
            <Typography>Listar Usuários</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
