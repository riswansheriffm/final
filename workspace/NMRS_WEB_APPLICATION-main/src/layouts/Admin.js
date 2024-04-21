import React, { useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components

import AdminNavbar from "components/NavbarsNavbar.js";
import AdminFooter from "components/FootersFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleSidebarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

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

  return (
    <div>
      <Sidebar
        {...props}
        toggleSidebar={toggleSidebar}
        handleSidebarToggle={handleSidebarToggle}
        routes={routes}
        logo={{
          innerLink: "/index",
          imgSrc: require("../nmrs/themes/Logo.png"),
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
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </div>
  );
};

export default Admin;
