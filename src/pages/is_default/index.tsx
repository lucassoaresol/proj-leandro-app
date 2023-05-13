import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from "react-hook-form-mui";
import { userIsDefaultSchema } from "../../shared/schemas";
import { useUserContext } from "../../shared/contexts";
import { ValidatePhone, ValidateUsername } from "../../shared/components";

export const IsDefault = () => {
  const { isDefaultUser, userData } = useUserContext();

  return (
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
            if (userData) isDefaultUser(userData.id, data);
          }}
          resolver={zodResolver(userIsDefaultSchema)}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <TextFieldElement
              name="first_name"
              label="Nome"
              required
              fullWidth
            />
            <TextFieldElement
              name="last_name"
              label="Sobrenome"
              required
              fullWidth
            />
            <TextFieldElement name="email" label="Email" required fullWidth />
            <TextFieldElement
              name="phone"
              label="Telefone"
              required
              fullWidth
            />
            <ValidatePhone />
            <TextFieldElement
              name="username"
              label="Username"
              required
              fullWidth
            />
            <ValidateUsername />
            <PasswordElement name="password" label="Senha" required fullWidth />
            <PasswordElement
              name="repeat_password"
              label="Confirmar Senha"
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
  );
};
