import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { createDepartSchema } from "../../../shared/schemas";
import { useModalContext, useUserContext } from "../../../shared/contexts";
import { ModalGeneral } from "../../../shared/components";

export const CreateDepart = () => {
  const { createDepart } = useUserContext();
  const { handleOpenDepart, openDepart } = useModalContext();
  return (
    <ModalGeneral open={openDepart} handleClose={handleOpenDepart}>
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
            onSuccess={createDepart}
            resolver={zodResolver(createDepartSchema)}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <TextFieldElement
                name="name"
                label="Nome do Departamento"
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
