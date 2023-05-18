import { iCriterionRequest, iSchemeRequest } from "../interfaces";
import { apiUsingNow } from "./api";

export async function postCriterion(data: iCriterionRequest): Promise<void> {
  await apiUsingNow.post("criterions/", data);
}

export async function postScheme(data: iSchemeRequest): Promise<void> {
  await apiUsingNow.post("schemes/", data);
}
