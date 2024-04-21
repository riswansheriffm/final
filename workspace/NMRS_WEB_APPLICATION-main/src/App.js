import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "layouts.js";
import AuthLayout from "layouts/Auth.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/nmrs.css";

export default function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/auth/*" replace />} />
    </Routes>
  );
}
