import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { useAuthContext, useUserContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iRole, iUser } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { BasePage } from "../../shared/components";

interface iCardFrequencyProps {
  user: iUser;
  theme: Theme;
}

const rolePtBr = (role: iRole) => {
  switch (role) {
    case "Administrator":
      return "Administrador";

    case "Manager":
      return "Gerente de Planejamento";

    case "Common":
      return "Usuário Comum";
  }
};

const CardUser = ({ user, theme }: iCardFrequencyProps) => {
  const { userData } = useAuthContext();
  const { updateUserData, setUpdateUserData, updateAdminUser } =
    useUserContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setUpdateUserData(user);
    setOpen(!open);
  };
  const isUser = user.id === userData?.id;
  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: user.is_active
            ? theme.palette.success.main
            : theme.palette.error.main,
        }}
      >
        <CardContent
          onClick={
            isUser
              ? () => {
                  setOpen(false);
                  setUpdateUserData(undefined);
                }
              : handleClose
          }
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            cursor: isUser ? "unset" : "pointer",
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{user.username[0].toUpperCase()}</Avatar>
            <Box>
              <Typography
                fontSize={10}
                color={theme.palette.secondary.contrastText}
              >
                {user.username}
              </Typography>
              <Typography color={theme.palette.secondary.contrastText}>
                {user.first_name}
              </Typography>
            </Box>
            <Typography fontSize={8} color={theme.palette.grey[300]}>
              {rolePtBr(user.role)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {updateUserData && (
        <Dialog open={open} onClose={handleClose}>
          {updateUserData.is_active ? (
            <>
              <DialogTitle>Desativar Usuário</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Deseja continuar desativando o usúario{" "}
                  {updateUserData.username.toUpperCase()}?
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    onClick={() => {
                      updateAdminUser(updateUserData.id, { is_active: false });
                      setOpen(!open);
                    }}
                  >
                    Continuar
                  </Button>
                </DialogActions>
              </DialogContent>
            </>
          ) : (
            <>
              <DialogTitle>Ativar Usuário</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Deseja continuar ativando o usúario{" "}
                  {updateUserData.username.toUpperCase()}?
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    onClick={() => {
                      updateAdminUser(updateUserData.id, { is_active: true });
                      setOpen(!open);
                    }}
                  >
                    Continuar
                  </Button>
                </DialogActions>
              </DialogContent>
            </>
          )}
        </Dialog>
      )}
    </>
  );
};

interface iListUserProps {
  back: string;
}

export const ListUser = ({ back }: iListUserProps) => {
  const theme = useTheme();
  const { setLoading } = useAuthContext();
  const { updateUserData } = useUserContext();
  const [listUserData, setListUserData] = useState<iUser[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<{ results: iUser[] }>("users/")
      .then((res) => {
        setListUserData(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [updateUserData]);
  return (
    <BasePage isProfile back={back}>
      {listUserData && (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
          {listUserData.map((user) => (
            <CardUser key={user.id} user={user} theme={theme} />
          ))}
        </Box>
      )}
    </BasePage>
  );
};
