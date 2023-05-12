import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  PasswordRepeatElement,
  AutocompleteElement,
} from "react-hook-form-mui";
import { userCreateSchema } from "../../shared/schemas";
import { useUserContext } from "../../shared/contexts";

export const Register = () => {
  const {
    create,
    departments,
    loadingDepartments,
    loadingPositions,
    positions,
  } = useUserContext();

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
          onSuccess={create}
          resolver={zodResolver(userCreateSchema)}
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
            <TextFieldElement
              name="username"
              label="Username"
              required
              fullWidth
            />
            <PasswordElement name="password" label="Senha" required fullWidth />
            <PasswordRepeatElement
              passwordFieldName="password"
              name="repeat_password"
              label="Confirmar Senha"
              required
              fullWidth
            />
            <div style={{ width: "100%" }}>
              <AutocompleteElement
                name="department"
                label="Departamento"
                loading={loadingDepartments}
                options={departments ? departments : []}
                required
              />
            </div>
            <div style={{ width: "100%" }}>
              <AutocompleteElement
                name="position"
                label="Cargo"
                loading={loadingPositions}
                options={positions ? positions : []}
                required
              />
            </div>
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </Box>
        </FormContainer>
      </Box>
    </Container>
  );
};
