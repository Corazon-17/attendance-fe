export type UserPositionData = {
  id: string;
  name: string;
};

export type UserData = {
  id: string;
  email: string;
  name: string;
  position: {
    id: string;
    name: string;
  };
  phone: string;
  photo: string;
};

export type CreateUserPayload = {
  email: string;
  password: string;
  name: string;
  positionId: string;
  phone?: string;
  photo?: string;
};

export type UpdateUserPayload = {
  phone: string;
  photo: string;
};

export type UpdateUserForAdmin = {
  email: string;
  name: string;
  positionId: string;
  phone: string;
  photo: string;
};

export type changePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  newPassword2: string;
};
