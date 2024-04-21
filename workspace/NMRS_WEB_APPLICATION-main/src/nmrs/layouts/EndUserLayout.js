import React, { useState } from "react";
import { Route, Outlet, useLocation, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/navbars/AdminNavbar";
import Sidebar from "../components/sidebar/Sidebar";
import AdminFooter from "../components/footers/admin_footer/AdminFooter";
import routes from "../routes/routes";

const EndUserLayout = (props) => {
  const mainContent = React.useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleSidebarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };
  const location = useLocation();

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
      location.pathname?.split("/")[1]?.includes("civilmarriage") ||
      location.pathname?.split("/")[1]?.includes("singlestatusletter") ||
      location.pathname?.split("/")[1]?.includes("document") ||
      location.pathname?.split("/")[1]?.includes("profile") ||
      location.pathname
        ?.split("/")[1]
        ?.includes("lostcertificateretrieval")) ? (
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

export default EndUserLayout;
