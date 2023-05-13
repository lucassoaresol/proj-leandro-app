import { PersonAdd, AddBusiness, Class, HowToReg } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { CreateUser, CreateDepart, CreatePosition } from "./create";
import { useModalContext } from "../../shared/contexts";
import { AcceptUser } from "./AcceptUser";
import { BasePage } from "../../shared/components";

export const User = () => {
  const {
    handleOpenDepart,
    handleOpenPosition,
    handleOpenUser,
    handleOpenAcceptUser,
  } = useModalContext();
  return (
    <>
      <BasePage>
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
          <CardContent
            onClick={handleOpenAcceptUser}
            sx={{ display: "flex", gap: 2, cursor: "pointer" }}
          >
            <HowToReg />
            <Typography>Aceitar Usuário</Typography>
          </CardContent>
        </Card>
      </BasePage>
      <CreateDepart />
      <CreatePosition />
      <CreateUser />
      <AcceptUser />
    </>
  );
};
