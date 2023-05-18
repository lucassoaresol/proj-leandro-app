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
      .min(10, "Precisa ter no mínimo 10 números"),
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
  .refine((fields) => (fields.username = fields.username.toLowerCase()))
  .refine((fields) => (fields.department.name = fields.department.label))
  .refine((fields) => (fields.position.name = fields.position.label));

export const userFirstSchema = z
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
      .min(10, "Precisa ter no mínimo 10 números"),
    username: z
      .string({ required_error: "Username obrigatório" })
      .nonempty("Username obrigatório"),
    password: z
      .string({ required_error: "Senha obrigatória" })
      .nonempty("Senha obrigatória"),
    repeat_password: z
      .string({ required_error: "Confirmar senha obrigatória" })
      .nonempty("Confirmar senha obrigatória"),
    is_first_access: z.boolean().default(true),
  })
  .refine((fields) => fields.password === fields.repeat_password, {
    path: ["repeat_password"],
    message: "As senhas precisam ser iguais",
  })
  .refine((fields) => (fields.username = fields.username.toLowerCase()));

export const userPasswordSchema = z
  .object({
    old_password: z
      .string({ required_error: "Senha Atual obrigatória" })
      .nonempty("Senha Atual obrigatória"),
    password: z
      .string({ required_error: "Senha obrigatória" })
      .nonempty("Senha obrigatória"),
    repeat_password: z
      .string({ required_error: "Confirmar senha obrigatória" })
      .nonempty("Confirmar senha obrigatória"),
    is_default: z.boolean().default(false),
  })
  .refine((fields) => fields.password === fields.repeat_password, {
    path: ["repeat_password"],
    message: "As senhas precisam ser iguais",
  });

export const userUpdateSchema = z
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
      .min(10, "Precisa ter no mínimo 10 números"),
    username: z
      .string({ required_error: "Username obrigatório" })
      .nonempty("Username obrigatório"),
  })
  .refine((fields) => (fields.username = fields.username.toLowerCase()));

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
  .refine((fields) => (fields.username = fields.username.toLowerCase()))
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

export const acceptUserSchema = z.object({
  users: z
    .array(z.number(), {
      required_error: "É necessário escolher no mínimo 1 usuário",
    })
    .min(1, "É necessário escolher no mínimo 1 usuário"),
});
