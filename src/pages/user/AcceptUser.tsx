import { Box, Button, Typography } from "@mui/material";
import { BasePage, BoxResp } from "../../shared/components";
import { useUserContext } from "../../shared/contexts";
import {
  CheckboxButtonGroup,
  FormContainer,
  useFormContext,
} from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptUserSchema } from "../../shared/schemas";

const HadleValues = () => {
  const { setValue } = useFormContext();
  const { acceptUserData } = useUserContext();
  if (acceptUserData?.length) {
    return (
      <Box display="flex" gap={2}>
        <Button
          onClick={() => {
            setValue(
              "users",
              acceptUserData.map((el: { id: number }) => el.id)
            );
          }}
        >
          Todos
        </Button>
        <Button
          onClick={() => {
            setValue("users", []);
          }}
        >
          Limpar
        </Button>
      </Box>
    );
  }
  return <></>;
};

interface iAcceptUserProps {
  back: string;
}

export const AcceptUser = ({ back }: iAcceptUserProps) => {
  const { acceptUserData, acceptUser } = useUserContext();

  return (
    <BasePage isProfile back={back}>
      {acceptUserData?.length ? (
        <FormContainer
          onSuccess={acceptUser}
          resolver={zodResolver(acceptUserSchema)}
        >
          <BoxResp>
            <HadleValues />
            <CheckboxButtonGroup
              label="Usuários"
              name="users"
              options={acceptUserData}
              required
            />
            <Button variant="contained" type="submit" fullWidth>
              Enviar
            </Button>
          </BoxResp>
        </FormContainer>
      ) : (
        <Typography>Nenhum usuário para aceitar no momento!</Typography>
      )}
    </BasePage>
  );
};
