import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import { MainRoutes } from "./MainRoutes";
import { PublicRoutes } from "./PublicRoutes";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes()}
        {MainRoutes()}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
