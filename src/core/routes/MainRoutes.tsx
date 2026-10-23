import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { clientRoutes } from "../configs/client.routes";
import { ManagerStudents } from "@/features/students/pages/ManagerStudents";

// Alimentem com rotas principais, como dashboard, perfil, etc.
export function MainRoutes() {
  return (
    <Route path="/" element={<MainLayout />}>
      <Route
        path={clientRoutes.STUDENTS.MANAGE}
        element={<ManagerStudents />}
      />
    </Route>
  );
}
