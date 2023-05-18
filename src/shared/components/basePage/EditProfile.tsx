import {
  useAuthContext,
  useModalContext,
  useUserContext,
} from "../../contexts";
import { ModalGeneral } from "../modal";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { ValidatePhone, ValidateUsername } from "../validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "../../schemas";
import { BoxResp } from "../boxResp";

export const EditProfile = () => {
  const { openEditProfile, handleOpenEditProfile } = useModalContext();
  const { userData } = useAuthContext();
  const { updateUser } = useUserContext();
  return (
    <ModalGeneral open={openEditProfile} handleClose={handleOpenEditProfile}>
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
        <BoxResp>
          <TextFieldElement name="first_name" label="Nome" required fullWidth />
          <TextFieldElement
            name="last_name"
            label="Sobrenome"
            required
            fullWidth
          />
          <TextFieldElement name="email" label="Email" required fullWidth />
          <TextFieldElement name="phone" label="Telefone" required fullWidth />
          <ValidatePhone />
          <TextFieldElement
            name="username"
            label="Username"
            required
            fullWidth
          />
          <ValidateUsername isProfile />
        </BoxResp>
      </FormContainer>
    </ModalGeneral>
  );
};
