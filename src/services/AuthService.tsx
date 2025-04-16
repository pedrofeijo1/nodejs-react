import axios from "axios";
import {handleError} from "../helpers/ErrorHandler";
import {UserLogin, UserRegister, UserToken} from "../models/User";

const api = import.meta.env.VITE_API_URL;

export const loginAPI = async (loginUser: UserLogin) => {
  try {
    return await axios.post<UserToken>(api + "auth/login", {
      login: loginUser.login,
      password: loginUser.password,
    });
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (registerUser: UserRegister) => {
  try {
    return await axios.post<UserToken>(api + "auth/register", {
      name: registerUser.name,
      email: registerUser.email,
      username: registerUser.username,
      password: registerUser.password,
      confirmPassword: registerUser.confirmPassword,
    });
  } catch (error) {
    handleError(error);
  }
};
