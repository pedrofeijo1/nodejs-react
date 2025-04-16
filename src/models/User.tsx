export type UserLogin = {
  login: string;
  password: string;
};

export type UserRegister = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserToken = {
  name: string;
  username: string;
  email: string;
  accessToken: string;
  company: string;
};

export type User = {
  name: string;
  username: string;
  email: string;
  company: string;
};
