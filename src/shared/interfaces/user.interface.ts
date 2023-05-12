import { z } from "zod";
import {
  createDepartSchema,
  createPositionSchema,
  loginSchema,
  userAdminCreateSchema,
  userCreateSchema,
} from "../schemas";

export type iLoginRequest = z.infer<typeof loginSchema>;

export interface iLoginResponse {
  access: string;
}

export interface iDepartmentPositionData {
  id: number;
  label: string;
}

export type iDepartmentRequest = z.infer<typeof createDepartSchema>;

export interface iDepartment {
  id: number;
  name: string;
}

export type iPositionRequest = z.infer<typeof createPositionSchema>;

export interface iPosition {
  id: number;
  name: string;
}

export type iUserRequest = z.infer<typeof userCreateSchema>;

export type iUserAdminRequest = z.infer<typeof userAdminCreateSchema>;

export interface iUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "Administrator" | "Manager" | "Common";
  is_active: boolean;
  date_joined: Date;
  date_expired?: Date;
  department: iDepartment;
  position: iPosition;
}

export interface iAcceptUser extends iUser {
  label: string;
}
