import {Navigate, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ForgotPassWordPage } from "../pages/ForgotPassWordPage";
import ProtectedRoute from "../routes/Protected"

export function PublicRoutes() {
 return (
    <>
      {/* 1. Quando o usuário entra na raiz (/), manda ele para o /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* 2. Aqui nós definimos o que aparece na tela quando ele está no /login */}
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
      </Route>
      <Route path="/redefinir-senha" element={<ForgotPassWordPage />} />
    </>
    
  );
}
