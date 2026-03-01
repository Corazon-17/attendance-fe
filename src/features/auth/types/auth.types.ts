export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
};

export type LoggedUserInfo = {
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
