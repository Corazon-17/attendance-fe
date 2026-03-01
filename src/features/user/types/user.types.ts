export type UpdateUserPayload = {
  phone: string;
  photo: string;
};

export type changePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  newPassword2: string;
};
