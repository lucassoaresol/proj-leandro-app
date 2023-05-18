import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { BasePage, BoxResp } from "../../../shared/components";
import { useUserContext } from "../../../shared/contexts";
import { createPositionSchema } from "../../../shared/schemas";

interface iCreatePositionProps {
  back: string;
}

export const CreatePosition = ({ back }: iCreatePositionProps) => {
  const { createPosition } = useUserContext();

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={createPosition}
        resolver={zodResolver(createPositionSchema)}
      >
        <BoxResp>
          <TextFieldElement
            name="name"
            label="Nome do Cargo"
            required
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
