import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required").trim(),
  positionId: z.string().min(1, "Position ID is required"),
  phone: z.string(),
  photo: z.string(),
});
export type CreateUserType = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  photo: z.string().trim(),
  phone: z.string().trim(),
});
export type UpdateUserType = z.infer<typeof updateUserSchema>;

export const updateUserForAdminSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  name: z.string().min(1, "Name is required").trim(),
  positionId: z.string().min(1, "Position ID is required"),
  phone: z.string(),
  photo: z.string(),
});
export type UpdateUserForAdminType = z.infer<typeof updateUserForAdminSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  newPassword2: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
