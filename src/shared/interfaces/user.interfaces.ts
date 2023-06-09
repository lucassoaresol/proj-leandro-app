import { z } from "zod";
import {
  acceptUserSchema,
  createDepartSchema,
  createPositionSchema,
  loginSchema,
  userAdminCreateSchema,
  userCreateSchema,
  userFirstSchema,
  userPasswordSchema,
  userUpdateSchema,
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
  departments: iDepartment[];
}

export interface iPositionData extends iPosition {
  label: string;
}

export type iUserRequest = z.infer<typeof userCreateSchema>;

export type iUserIsDefaultRequest = z.infer<typeof userFirstSchema>;

export type iUserUpdateRequest = z.infer<typeof userUpdateSchema>;

export type iUserPasswordRequest = z.infer<typeof userPasswordSchema>;

export type iUserAdminRequest = z.infer<typeof userAdminCreateSchema>;

export type iAcceptUserRequest = z.infer<typeof acceptUserSchema>;

export type iRole = "Administrator" | "Manager" | "Common";

export interface iUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: iRole;
  is_active: boolean;
  is_first_access: boolean;
  is_expired: boolean;
  date_joined: Date;
  date_expired?: Date;
  department: iDepartment;
  position: iPosition;
}

export interface iAcceptUser extends iUser {
  label: string;
}
