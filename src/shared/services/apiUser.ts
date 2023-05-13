import { FieldValues } from "react-hook-form";
import { apiUsingNow } from "./api";
import {
  iDepartment,
  iLoginRequest,
  iLoginResponse,
  iPosition,
  iUser,
} from "../interfaces";

export async function postUser(data: iLoginRequest): Promise<iLoginResponse> {
  const { data: response } = await apiUsingNow.post<iLoginResponse>(
    "login/",
    data
  );
  return response;
}

export async function postUserCreate(data: FieldValues): Promise<iUser> {
  const { data: response } = await apiUsingNow.post<iUser>("users/", data);
  return response;
}

export async function postUserCreateDepart(
  data: FieldValues
): Promise<iDepartment> {
  const { data: response } = await apiUsingNow.post<iDepartment>(
    "departments/",
    data
  );
  return response;
}

export async function postUserCreatePosition(
  data: FieldValues
): Promise<iPosition> {
  const { data: response } = await apiUsingNow.post<iPosition>(
    "positions/",
    data
  );
  return response;
}

export async function patchUser(
  id: number,
  data: FormData | FieldValues
): Promise<iUser> {
  const { data: response } = await apiUsingNow.patch<iUser>(
    `users/${id}/`,
    data
  );
  return response;
}
