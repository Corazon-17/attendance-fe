export type UserData = {
  id: string;
  email: string;
  name: string;
  position: {
    positionId: string;
    name: string;
  };
  phone: string;
  photo: string;
};

export type UpdateUserPayload = {
  phone: string;
  photo: string;
};

export type changePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  newPassword2: string;
};
