/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { Route, Outlet, Navigate, useLocation } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/navbars/AdminNavbar";
import Sidebar from "../components/sidebar/Sidebar";
import AdminFooter from "../components/footers/admin_footer/AdminFooter";
import routes from "../routes/routes";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleSidebarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const location = useLocation();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return location.pathname?.split("/")[1]?.includes("index") ||
    location.pathname?.split("/")[1]?.includes("admin") ? (
    <div>
      <Sidebar
        {...props}
        toggleSidebar={toggleSidebar}
        handleSidebarToggle={handleSidebarToggle}
        routes={routes}
        logo={{
          innerLink: "/index",
          imgSrc: require("../themes/Logo.png"),
          imgAlt: "...",
        }}
      />
      <div
        className={
          toggleSidebar ? "main-content " : "toggle-expand main-content "
        }
        ref={mainContent}
      >
        <AdminNavbar
          toggleSidebar={toggleSidebar}
          handleSidebarToggle={handleSidebarToggle}
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Outlet />
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Admin;
