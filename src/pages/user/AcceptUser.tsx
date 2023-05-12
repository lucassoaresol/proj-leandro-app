import { Box, Button, Container, Paper } from "@mui/material";
import { ModalGeneral } from "../../shared/components";
import { useUserContext } from "../../shared/contexts";
import { CheckboxButtonGroup, FormContainer } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDepartSchema } from "../../shared/schemas";
import { useEffect, useState } from "react";

export const AcceptUser = () => {
  const { acceptUserData, createDepart, handleOpenAcceptUser, openAcceptUser } =
    useUserContext();
  const [value, setValue] = useState<number[]>();

  useEffect(() => {
    console.log(value);
  }, [value]);

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
          {acceptUserData && (
            <FormContainer
              defaultValues={{ users: value }}
              onSuccess={(data) => {
                console.log(data);
              }}
              // resolver={zodResolver(createDepartSchema)}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <Button
                  onClick={() => {
                    setValue(acceptUserData.map((el) => el.id));
                  }}
                >
                  Todos
                </Button>
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
          )}
        </Box>
      </Container>
    </ModalGeneral>
  );
};
