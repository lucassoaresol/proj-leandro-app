import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  useFieldArray,
  useFormContext,
} from "react-hook-form-mui";
import { createCriterionSchema } from "../../../shared/schemas";
import { useSchemeContext } from "../../../shared/contexts";
import { BasePage, BoxResp } from "../../../shared/components";
import { Add, Remove } from "@mui/icons-material";

const CategoryOptions = () => {
  const theme = useTheme();
  const { control, formState } = useFormContext();
  const { errors } = formState;
  let errOptions = undefined;
  const err: any = errors;

  if (err) {
    if (err.category) {
      if (err.category.options) {
        errOptions = err.category.options.message;
      }
    }
  }

  const options = useFieldArray({ control, name: "category.options" });

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      width="100%"
      gap={1.7}
    >
      <Typography fontSize={15}>Opções</Typography>
      <Box display="flex" gap={0.7} position="absolute" top={-5} right={2}>
        <IconButton onClick={() => options.remove(-1)} size="small">
          <Remove />
        </IconButton>
        <IconButton onClick={() => options.append({})} size="small">
          <Add />
        </IconButton>
      </Box>
      {options.fields.map((item, index) => {
        return (
          <Box gap={1.2} key={item.id} display="flex" flexDirection="column">
            <TextFieldElement
              label="Nome"
              name={"category.options." + index + ".name"}
              required
            />
            <TextFieldElement
              label="Valor"
              type="number"
              name={"category.options." + index + ".value"}
              required
            />
          </Box>
        );
      })}
      {errOptions && (
        <Box position="relative" mb={2}>
          <Typography
            position="absolute"
            left={16}
            fontSize={12}
            color={theme.palette.error.main}
          >
            {errOptions}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

interface iCreateCriterionProps {
  back: string;
}

export const CreateCriterion = ({ back }: iCreateCriterionProps) => {
  const { createCriterion } = useSchemeContext();

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        defaultValues={{ category: { options: [{}] } }}
        onSuccess={createCriterion}
        resolver={zodResolver(createCriterionSchema)}
      >
        <BoxResp>
          <TextFieldElement
            name="description"
            label="Descrição do Critério"
            required
            fullWidth
          />
          <Box display="flex" flexDirection="column" gap={1.5}>
            <TextFieldElement
              name="category.name"
              label="Nome da Categoria"
              required
              fullWidth
            />
            <CategoryOptions />
          </Box>
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
