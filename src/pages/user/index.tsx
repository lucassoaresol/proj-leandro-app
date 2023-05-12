import {
  Description,
  PersonAdd,
  AddBusiness,
  Class,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { CreateUser, CreateDepart, CreatePosition } from "./create";
import { useUserContext } from "../../shared/contexts";

export const User = () => {
  const { handleOpenDepart, handleOpenPosition, handleOpenUser } =
    useUserContext();
  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "center", paddingTop: 30 }}
      >
        <Box
          component={Paper}
          width="100vw"
          maxWidth={600}
          display="flex"
          flexWrap="wrap"
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
            <CardContent
              onClick={handleOpenDepart}
              sx={{ display: "flex", gap: 2, cursor: "pointer" }}
            >
              <AddBusiness />
              <Typography>Adicionar Departamento</Typography>
            </CardContent>
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
            <CardContent
              onClick={handleOpenPosition}
              sx={{ display: "flex", gap: 2, cursor: "pointer" }}
            >
              <Class />
              <Typography>Adicionar Cargo</Typography>
            </CardContent>
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
            <CardContent
              onClick={handleOpenUser}
              sx={{ display: "flex", gap: 2, cursor: "pointer" }}
            >
              <PersonAdd />
              <Typography>Adicionar Usuário</Typography>
            </CardContent>
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
      <CreateDepart />
      <CreatePosition />
      <CreateUser />
    </>
  );
};
