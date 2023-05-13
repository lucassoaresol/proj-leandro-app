import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { ModalGeneral } from "../../shared/components";
import { useModalContext, useUserContext } from "../../shared/contexts";
import {
  CheckboxButtonGroup,
  FormContainer,
  useFormContext,
} from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptUserSchema } from "../../shared/schemas";

const HadleValues = () => {
  const { setValue } = useFormContext();
  const { acceptUserData } = useUserContext();
  if (acceptUserData?.length) {
    return (
      <Box display="flex" gap={2}>
        <Button
          onClick={() => {
            setValue(
              "users",
              acceptUserData.map((el: { id: number }) => el.id)
            );
          }}
        >
          Todos
        </Button>
        <Button
          onClick={() => {
            setValue("users", []);
          }}
        >
          Limpar
        </Button>
      </Box>
    );
  }
  return <></>;
};

export const AcceptUser = () => {
  const { acceptUserData, acceptUser } = useUserContext();
  const { handleOpenAcceptUser, openAcceptUser } = useModalContext();

  return (
    <ModalGeneral open={openAcceptUser} handleClose={handleOpenAcceptUser}>
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
          {acceptUserData?.length ? (
            <FormContainer
              onSuccess={acceptUser}
              resolver={zodResolver(acceptUserSchema)}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <HadleValues />
                <CheckboxButtonGroup
                  label="Usuários"
                  name="users"
                  options={acceptUserData}
                  required
                />
                <Button variant="contained" type="submit" fullWidth>
                  Enviar
                </Button>
              </Box>
            </FormContainer>
          ) : (
            <Typography>Nenhum usuário para aceitar no momento!</Typography>
          )}
        </Box>
      </Container>
    </ModalGeneral>
  );
};
