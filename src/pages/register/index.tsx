import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  AutocompleteElement,
} from "react-hook-form-mui";
import { userCreateSchema } from "../../shared/schemas";
import { useUserContext } from "../../shared/contexts";
import {
  BasePage,
  BoxResp,
  ValidatePhone,
  ValidateUsername,
} from "../../shared/components";
import { useEffect, useState } from "react";
import {
  iDepartment,
  iDepartmentPositionData,
  iPosition,
} from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";

export const Register = () => {
  const { create } = useUserContext();
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
    <BasePage>
      <FormContainer
        onSuccess={create}
        resolver={zodResolver(userCreateSchema)}
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
