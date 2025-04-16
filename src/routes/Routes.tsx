import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import Dashboard from "@/pages/app/Dashboard.tsx";
import AuthLayout from "@/pages/layouts/AuthLayout.tsx";
import AppLayout from "@/pages/layouts/AppLayout.tsx";
import App from "../App.tsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
      { path: "*", element: <div>Deu XABU!</div> },
    ],
  },
]);
