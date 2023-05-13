import { Box, Button, Container, Paper } from "@mui/material";
import { useModalProfileContext, useUserContext } from "../../contexts";
import { ModalGeneral } from "../modal";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { ValidatePhone, ValidateUsername } from "../validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "../../schemas";

export const EditProfile = () => {
  const { openEditProfile, handleOpenEditProfile } = useModalProfileContext();
  const { userData, updateUser } = useUserContext();
  return (
    <ModalGeneral open={openEditProfile} handleClose={handleOpenEditProfile}>
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
            defaultValues={{
              first_name: userData ? userData.first_name : "",
              last_name: userData ? userData.last_name : "",
              email: userData ? userData.email : "",
              phone: userData ? userData.phone : "",
              username: userData ? userData.username : "",
            }}
            onSuccess={(data) => {
              if (userData) updateUser(userData.id, data);
            }}
            resolver={zodResolver(userUpdateSchema)}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              width="100vw"
              maxWidth={350}
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
              <ValidateUsername isProfile />
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
