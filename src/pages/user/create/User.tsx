import { zodResolver } from "@hookform/resolvers/zod";
import {
  AutocompleteElement,
  FormContainer,
  RadioButtonGroup,
  TextFieldElement,
} from "react-hook-form-mui";
import { useUserContext } from "../../../shared/contexts";
import {
  BasePage,
  BoxResp,
  ValidateUsername,
} from "../../../shared/components";
import { userAdminCreateSchema } from "../../../shared/schemas";
import { useEffect, useState } from "react";
import {
  iDepartment,
  iDepartmentPositionData,
  iPosition,
} from "../../../shared/interfaces";
import { apiUsingNow } from "../../../shared/services";

interface iCreateUserProps {
  back: string;
}

export const CreateUser = ({ back }: iCreateUserProps) => {
  const { createUser } = useUserContext();
  const [departments, setDepartments] = useState<iDepartmentPositionData[]>();
  const [positions, setPositions] = useState<iDepartmentPositionData[]>();
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingPositions, setLoadingPositions] = useState(true);

  useEffect(() => {
    apiUsingNow.get<{ results: iDepartment[] }>("departments/").then((res) => {
      setDepartments(
        res.data.results.map((el) => {
          return { ...el, label: el.name };
        })
      );
      setLoadingDepartments(false);
    });
    apiUsingNow.get<{ results: iPosition[] }>("positions/").then((res) => {
      setPositions(
        res.data.results.map((el) => {
          return { ...el, label: el.name };
        })
      );
      setLoadingPositions(false);
    });
  }, []);

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={createUser}
        defaultValues={{ role: "Common" }}
        resolver={zodResolver(userAdminCreateSchema)}
      >
        <BoxResp>
          <TextFieldElement
            name="username"
            label="Username"
            required
            fullWidth
          />
          <RadioButtonGroup
            label="Tipo do Usuário"
            name="role"
            options={[
              {
                id: "Administrator",
                label: "Administrador",
              },
              {
                id: "Manager",
                label: "Gerente",
              },
              {
                id: "Common",
                label: "Comum",
              },
            ]}
            row
            required
          />
          <div style={{ width: "100%" }}>
            <AutocompleteElement
              name="department"
              label="Departamento"
              loading={loadingDepartments}
              options={departments ? departments : []}
              required
            />
          </div>
          <div style={{ width: "100%" }}>
            <AutocompleteElement
              name="position"
              label="Cargo"
              loading={loadingPositions}
              options={positions ? positions : []}
              required
            />
          </div>
          <ValidateUsername />
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
