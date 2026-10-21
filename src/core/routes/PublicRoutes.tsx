import {Navigate, Route } from "react-router-dom";
import { LoginPage } from "../../features/auth/LoginPage";
import { ForgotPassWordPage } from "../../features/auth/ForgotPassWordPage";
import ProtectedRoute from "../routes/Protected"
import {ManagerStudents} from "../../features/students/ManagerStudents";
import { RegisterPage } from "../../features/auth/RegisterPage";
import { clientRoutes } from "../configs/client.routes";

export function PublicRoutes() {
 return (
    <>
      {/* 1. Quando o usuário entra na raiz (/), manda ele para o /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* 2. Aqui nós definimos o que aparece na tela quando ele está no /login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path={clientRoutes.AUTH.REGISTER} element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
      </Route>
      <Route path="/redefinir-senha" element={<ForgotPassWordPage />} />
      <Route path={clientRoutes.STUDENTS.MANAGE} element={<ManagerStudents />} />
    </>
    
  );
}
