import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
} from "react-hook-form-mui";
import { loginSchema } from "../../shared/schemas";
import { useAuthContext } from "../../shared/contexts";
import { BasePage, BoxResp } from "../../shared/components";

export const Login = () => {
  const { login } = useAuthContext();
  return (
    <BasePage>
      <FormContainer onSuccess={login} resolver={zodResolver(loginSchema)}>
        <BoxResp>
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
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
