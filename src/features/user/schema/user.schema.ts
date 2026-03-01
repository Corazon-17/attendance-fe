import { z } from "zod";

export const updateUserSchema = z.object({
  photo: z.string().trim(),
  phone: z.string().trim(),
});
export type UpdateUserType = z.infer<typeof updateUserSchema>;

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
