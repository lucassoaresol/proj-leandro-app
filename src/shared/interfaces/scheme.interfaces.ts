import { z } from "zod";
import { createCriterionSchema, createSchemeSchema } from "../schemas";

export type iCriterionRequest = z.infer<typeof createCriterionSchema>;

export type iSchemeRequest = z.infer<typeof createSchemeSchema>;
