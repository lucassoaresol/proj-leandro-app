import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from "react-hook-form-mui";
import { userFirstSchema } from "../../shared/schemas";
import { useAuthContext, useUserContext } from "../../shared/contexts";
import {
  BasePage,
  BoxResp,
  ValidatePhone,
  ValidateUsername,
} from "../../shared/components";

export const First = () => {
  const { userData } = useAuthContext();
  const { first } = useUserContext();

  return (
    <BasePage>
      <FormContainer
        onSuccess={(data) => {
          if (userData) first(userData.id, data);
        }}
        resolver={zodResolver(userFirstSchema)}
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
          <PasswordElement name="password" label="Senha" required fullWidth />
          <PasswordElement
            name="repeat_password"
            label="Confirmar Senha"
            required
            fullWidth
          />
          <ValidateUsername />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
