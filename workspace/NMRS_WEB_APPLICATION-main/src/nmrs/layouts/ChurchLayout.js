import React, { useState } from "react";
import { Route, Outlet, useLocation, Navigate } from "react-router-dom";

import { Container } from "reactstrap";

import AdminNavbar from "../components/navbars/AdminNavbar";
import Sidebar from "../components/sidebar/Sidebar";
import AdminFooter from "../components/footers/admin_footer/AdminFooter";
import routes from "../routes/routes";

const Church = (props) => {
  const mainContent = React.useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const location = useLocation();

  const handleSidebarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return "UGANDA REGISTRATION SERVICES BUREAU";
      }
    }
    return "Brand";
  };

  return !location.pathname?.split("/")[2]?.includes("approval") &&
    (location.pathname?.split("/")[1]?.includes("index") ||
      location.pathname?.split("/")[1]?.includes("churchlicensing") ||
      location.pathname?.split("/")[1]?.includes("LicenseRenewal") ||
      location.pathname?.split("/")[1]?.includes("church")) ? (
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
          role="Church"
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

export default Church;
