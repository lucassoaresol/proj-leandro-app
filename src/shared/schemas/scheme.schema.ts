import { z } from "zod";

export const createCriterionSchema = z.object({
  description: z
    .string({ required_error: "Descrição do Critério obrigatório" })
    .nonempty("Descrição do Critério obrigatório"),
  category: z.object({
    name: z
      .string({ required_error: "Nome da Categoria obrigatória" })
      .nonempty("Nome da Categoria obrigatória"),
    options: z
      .object({
        name: z
          .string({ required_error: "Nome obrigatório" })
          .nonempty("Nome obrigatório"),
        value: z.number({ required_error: "Valor obrigatório" }),
      })
      .array()
      .min(1, "Deve enviar no mínimo 01 Opção"),
  }),
});

export const createSchemeSchema = z.object({
  name: z
    .string({ required_error: "Nome do Plano obrigatório" })
    .nonempty("Nome do Plano obrigatório"),
  num_criterion: z.number({
    required_error: "Número de Critérios obrigatório",
  }),
  departments_id: z.number().array(),
  positions_id: z.number().array(),
});
