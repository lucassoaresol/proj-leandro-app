import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { ModalGeneral } from "../../../shared/components";
import { useUserContext } from "../../../shared/contexts";
import { createPositionSchema } from "../../../shared/schemas";

export const CreatePosition = () => {
  const { createPosition, handleOpenPosition, openPosition } = useUserContext();
  return (
    <ModalGeneral open={openPosition} handleClose={handleOpenPosition}>
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
            onSuccess={createPosition}
            resolver={zodResolver(createPositionSchema)}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <TextFieldElement
                name="name"
                label="Nome do Cargo"
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
