import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username obrigatório" })
    .nonempty("Username obrigatório"),
  password: z
    .string({ required_error: "Senha obrigatória" })
    .nonempty("Senha obrigatória"),
});

export const userCreateSchema = z
  .object({
    first_name: z
      .string({ required_error: "Nome obrigatório" })
      .nonempty("Nome obrigatório"),
    last_name: z
      .string({ required_error: "Sobrenome obrigatório" })
      .nonempty("Sobrenome obrigatório"),
    email: z
      .string({ required_error: "Email obrigatório" })
      .email("Email inválido"),
    phone: z
      .string({ required_error: "Telefone obrigatório" })
      .nonempty("Telefone obrigatório"),
    username: z
      .string({ required_error: "Username obrigatório" })
      .nonempty("Username obrigatório"),
    password: z
      .string({ required_error: "Senha obrigatória" })
      .nonempty("Senha obrigatória"),
    repeat_password: z
      .string({ required_error: "Confirmar senha obrigatória" })
      .nonempty("Confirmar senha obrigatória"),
    is_default: z.boolean().default(false),
    department: z.object(
      { id: z.number(), label: z.string(), name: z.string().optional() },
      {
        invalid_type_error: "Departamento obrigatório",
        required_error: "Departamento obrigatório",
      }
    ),
    position: z.object(
      { id: z.number(), label: z.string(), name: z.string().optional() },
      {
        invalid_type_error: "Cargo obrigatório",
        required_error: "Cargo obrigatório",
      }
    ),
  })
  .refine((fields) => fields.password === fields.repeat_password, {
    path: ["repeat_password"],
    message: "As senhas precisam ser iguais",
  })
  .refine((fields) => (fields.department.name = fields.department.label))
  .refine((fields) => (fields.position.name = fields.position.label));

export const userAdminCreateSchema = z
  .object({
    username: z
      .string({ required_error: "Username obrigatório" })
      .nonempty("Username obrigatório"),
    password: z.string().optional(),
    role: z.enum(["Administrator", "Manager", "Common"]),
    is_active: z.boolean().default(true),
    department: z.object(
      { id: z.number(), label: z.string(), name: z.string().optional() },
      {
        invalid_type_error: "Departamento obrigatório",
        required_error: "Departamento obrigatório",
      }
    ),
    position: z.object(
      { id: z.number(), label: z.string(), name: z.string().optional() },
      {
        invalid_type_error: "Cargo obrigatório",
        required_error: "Cargo obrigatório",
      }
    ),
  })
  .refine((fields) => (fields.password = `${fields.username}1234`))
  .refine((fields) => (fields.department.name = fields.department.label))
  .refine((fields) => (fields.position.name = fields.position.label));

export const createDepartSchema = z.object({
  name: z
    .string({ required_error: "Nome do Departamento obrigatório" })
    .nonempty("Nome do Departamento obrigatório"),
});

export const createPositionSchema = z.object({
  name: z
    .string({ required_error: "Nome do Cargo obrigatório" })
    .nonempty("Nome do Cargo obrigatório"),
});
