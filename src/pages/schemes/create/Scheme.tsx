import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import {
  CheckboxButtonGroup,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { createSchemeSchema } from "../../../shared/schemas";
import { BasePage, BoxResp } from "../../../shared/components";
import { apiUsingNow } from "../../../shared/services";
import { useEffect, useState } from "react";
import {
  iDepartment,
  iDepartmentPositionData,
  iPosition,
} from "../../../shared/interfaces";
import { useSchemeContext } from "../../../shared/contexts";

interface iCreateSchemeProps {
  back: string;
}

export const CreateScheme = ({ back }: iCreateSchemeProps) => {
  const { createScheme } = useSchemeContext();
  const [departments, setDepartments] = useState<iDepartmentPositionData[]>();
  const [positions, setPositions] = useState<iDepartmentPositionData[]>();

  useEffect(() => {
    apiUsingNow.get<{ results: iDepartment[] }>("departments/").then((res) => {
      setDepartments(
        res.data.results.map((el) => {
          return { ...el, label: el.name };
        })
      );
    });
    apiUsingNow.get<{ results: iPosition[] }>("positions/").then((res) => {
      setPositions(
        res.data.results.map((el) => {
          return { ...el, label: el.name };
        })
      );
    });
  }, []);
  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={createScheme}
        resolver={zodResolver(createSchemeSchema)}
      >
        <BoxResp>
          <TextFieldElement
            name="name"
            label="Nome do Plano"
            required
            fullWidth
          />
          <TextFieldElement
            name="num_criterion"
            label="Número de Critérios"
            type="number"
            required
            fullWidth
          />
          <CheckboxButtonGroup
            name="departments_id"
            label="Departamentos"
            required
            options={departments ? departments : []}
          />
          <CheckboxButtonGroup
            name="positions_id"
            label="Cargos"
            required
            options={positions ? positions : []}
          />
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
