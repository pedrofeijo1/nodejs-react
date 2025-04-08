import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "@/pages/layouts/AuthLayout.tsx";
import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import AppLayout from "@/pages/layouts/AppLayout.tsx";
import Dashboard from "@/pages/app/Dashboard.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
