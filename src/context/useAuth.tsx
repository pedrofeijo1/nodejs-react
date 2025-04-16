import { User, UserLogin, UserRegister } from "@/models/User.tsx";
import {ReactNode, useContext, createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "sonner";
import {loginAPI, registerAPI} from "@/services/AuthService.tsx";

type UserContextType = {
  user: User | null;
  token: string | null;
  registerUser: (userRegister: UserRegister) => void;
  loginUser: (userLogin: UserLogin) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (userRegister: UserRegister) => {
    await registerAPI(userRegister)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.accessToken);
          const user: User = {
            name: userRegister.name,
            username: userRegister.username,
            email: userRegister.email,
            company: res?.data.company
          };
          localStorage.setItem("user", JSON.stringify(user));
          setToken(res?.data.accessToken);
          setUser(user);

          navigate("/dashboard");
        }
      })
      .catch(() => toast.error("Server error occured"));
  };

  const loginUser = async (userLogin: UserLogin) => {
    await loginAPI(userLogin)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.accessToken);
          const user: User = {
            name: res?.data.name,
            username: res?.data.username,
            email: res?.data.email,
            company: res?.data.company
          };
          localStorage.setItem("user", JSON.stringify(user));
          setToken(res?.data.accessToken);
          setUser(user);

          navigate("/dashboard");
        }
      })
      .catch(() => toast.error("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);
