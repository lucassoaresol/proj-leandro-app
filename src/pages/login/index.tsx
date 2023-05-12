import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Box, Button, Container, Paper } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from "react-hook-form-mui";
import { loginSchema } from "../../shared/schemas";
import { useAuthContext } from "../../shared/contexts";

export const Login = () => {
  const { login } = useAuthContext();
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", paddingTop: 30 }}
    >
      <Box
        component={Paper}
        width="100vw"
        maxWidth={400}
        display="flex"
        justifyContent="center"
        padding={8}
      >
        <FormContainer onSuccess={login} resolver={zodResolver(loginSchema)}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <TextFieldElement
              name="username"
              label="Username"
              required
              fullWidth
            />
            <PasswordElement name="password" label="Senha" required fullWidth />
            <Button variant="contained" type="submit" fullWidth>
              Entrar
            </Button>
            <Link to="/register" style={{ width: "100%" }}>
              <Button variant="contained" fullWidth>
                Cadastrar
              </Button>
            </Link>
          </Box>
        </FormContainer>
      </Box>
    </Container>
  );
};
