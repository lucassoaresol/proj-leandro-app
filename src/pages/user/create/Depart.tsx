import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { createDepartSchema } from "../../../shared/schemas";
import { useUserContext } from "../../../shared/contexts";
import { BasePage, BoxResp } from "../../../shared/components";

interface iCreateDepartProps {
  back: string;
}

export const CreateDepart = ({ back }: iCreateDepartProps) => {
  const { createDepart } = useUserContext();

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={createDepart}
        resolver={zodResolver(createDepartSchema)}
      >
        <BoxResp>
          <TextFieldElement
            name="name"
            label="Nome do Departamento"
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
