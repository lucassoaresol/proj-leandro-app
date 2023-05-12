import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper } from "@mui/material";
import {
  AutocompleteElement,
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import { useUserContext } from "../../../shared/contexts";
import { ModalGeneral } from "../../../shared/components";
import { userAdminCreateSchema } from "../../../shared/schemas";

export const CreateUser = () => {
  const {
    createUser,
    departments,
    loadingDepartments,
    loadingPositions,
    positions,
    openUser,
    handleOpenUser,
  } = useUserContext();
  return (
    <ModalGeneral open={openUser} handleClose={handleOpenUser}>
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
            onSuccess={createUser}
            defaultValues={{ role: "Common" }}
            resolver={zodResolver(userAdminCreateSchema)}
          >
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
              <RadioButtonGroup
                label="Tipo do Usuário"
                name="role"
                options={[
                  {
                    id: "Administrator",
                    label: "Administrador",
                  },
                  {
                    id: "Manager",
                    label: "Gerente",
                  },
                  {
                    id: "Common",
                    label: "Comum",
                  },
                ]}
                row
                required
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
    </ModalGeneral>
  );
};
