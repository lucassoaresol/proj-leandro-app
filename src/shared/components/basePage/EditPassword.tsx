import { Box, Button, Container, Paper } from "@mui/material";
import { useModalProfileContext, useUserContext } from "../../contexts";
import { ModalGeneral } from "../modal";
import { FormContainer, PasswordElement } from "react-hook-form-mui";
import { userPasswordSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditPassword = () => {
  const { openEditPassword, handleOpenEditPassword } = useModalProfileContext();
  const { userData, editPassword } = useUserContext();

  return (
    <ModalGeneral open={openEditPassword} handleClose={handleOpenEditPassword}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >
        <Box
          component={Paper}
          width="100vw"
          maxWidth={400}
          display="flex"
          justifyContent="center"
          padding={5}
        >
          <FormContainer
            onSuccess={(data) => {
              if (userData) editPassword(userData.id, data);
            }}
            resolver={zodResolver(userPasswordSchema)}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <PasswordElement
                name="old_password"
                label="Senha Atual"
                required
                fullWidth
              />
              <PasswordElement
                name="password"
                label="Nova Senha"
                required
                fullWidth
              />
              <PasswordElement
                name="repeat_password"
                label="Confirmar Nova Senha"
                required
                fullWidth
              />
              <Button variant="contained" type="submit" fullWidth>
                Enviar
              </Button>
            </Box>
          </FormContainer>
        </Box>
      </Container>
    </ModalGeneral>
  );
};
