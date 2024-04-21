import { jwtDecode } from "jwt-decode";
import EndUserLayout from "../layouts/EndUserLayout";
import Church from "../layouts/ChurchLayout";
import Registrar from "../layouts/Registrar";

import { Navigate, useNavigate } from "react-router-dom";
import ChurchAdmin from "nmrs/layouts/ChurchAdmin";
import Admin from "nmrs/layouts/Admin";

export default function ProtectedRouteUser() {
  const token = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!token) return <Navigate to="/" />;

  // const decodedData = jwtDecode(token);

  if (token?.role === "citizen") {
    return <EndUserLayout />;
  } else if (token?.role === "church") {
    return <Church />;
  } else if (token?.role === "registrar") {
    return <Registrar />;
  } else if (token?.role === "churchAdmin") {
    return <ChurchAdmin />;
  } else if (token?.role === "admin") {
    return <Admin />;
  }
}
