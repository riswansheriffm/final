import { useState, useEffect } from "react";
import { NavLink as NavLinkRRD, Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

import lostWhite from "../../assets/img/brand/lost.png";
import ringWhite from "../../assets/img/brand/ringfill.png";
import lostBlack from "../../assets/img/brand/lost-black.png";
import ringBlack from "../../assets/img/brand/ring.png";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const Sidebar = (props) => {
  const location = useLocation();
  const [collapseOpen, setCollapseOpen] = useState(false);

  const [isOpen, setOpen] = useState(0);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    const newUsername = location?.state?.username || "";
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  }, []);

  const toggleCollapse = () => {
    setCollapseOpen((prevCollapseOpen) => !prevCollapseOpen);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  const { routes, logo, toggleSidebar, handleSidebarToggle } = props;
  // const username = location?.state?.username;

  // creates the links that appear in the left menu / Sidebar
  // const createLinks = (routes, username) => {
  //   return routes.map((prop, key) => {
  //     const hasAccess = prop.user && prop.user.includes(username);

  //     return (
  //       <NavItem key={key}>
  //         {toggleSidebar
  //           ? prop.layout !== "/auth" &&
  //             prop.path !== "/faq" && (
  //               <NavLink
  //                 to={prop.layout + prop.path}
  //                 tag={NavLinkRRD}
  //                 onClick={closeCollapse}
  //               >
  //                 {prop.icon !== "lost" && prop.icon !== "ring" ? (
  //                   <i className={prop.icon} />
  //                 ) : (
  //                   <>
  //                     {prop.icon === "lost" && (
  //                       <i>
  //                         <img
  //                           alt="icon"
  //                           src={
  //                             location.pathname.includes(
  //                               "/lostcertificateretrieval"
  //                             )
  //                               ? lostBlack
  //                               : lostWhite
  //                           }
  //                           width="15px"
  //                         />
  //                       </i>
  //                     )}
  //                     {prop.icon === "ring" && (
  //                       <i>
  //                         <img
  //                           alt="icon"
  //                           src={
  //                             location.pathname.includes(
  //                               "/civilmarriage/y"
  //                             )
  //                               ? ringBlack
  //                               : ringWhite
  //                           }
  //                           width="20px"
  //                         />
  //                       </i>
  //                     )}
  //                   </>
  //                 )}

  //                 {prop.name}
  //               </NavLink>
  //             )
  //           : prop.path.split("/").length !== 3 &&
  //             prop.layout !== "/auth" &&
  //             prop.path !== "/faq" && (
  //               <NavLink
  //                 className="text-center"
  //                 to={prop.layout + prop.path}
  //                 tag={NavLinkRRD}
  //                 onClick={closeCollapse}
  //               >
  //                 {prop.icon !== "lost" && prop.icon !== "ring" ? (
  //                   <i className={prop.icon} />
  //                 ) : (
  //                   <>
  //                     {prop.icon === "lost" && (
  //                       <i>
  //                         <img
  //                           alt="icon"
  //                           src={
  //                             location.pathname.includes(
  //                               "/lostcertificateretrieval"
  //                             )
  //                               ? lostBlack
  //                               : lostWhite
  //                           }
  //                           width="15px"
  //                         />
  //                       </i>
  //                     )}
  //                     {prop.icon === "ring" && (
  //                       <i>
  //                         <img
  //                           alt="icon"
  //                           src={
  //                             location.pathname.includes("/civilmarriage")
  //                               ? ringBlack
  //                               : ringWhite
  //                           }
  //                           width="20px"
  //                         />
  //                       </i>
  //                     )}
  //                   </>
  //                 )}
  //               </NavLink>
  //             )}
  //       </NavItem>
  //     );
  //   });
  // };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className={
        props.toggleSidebar
          ? "navbar-vertical bg-usrb-light fixed-left navbar-dark "
          : "navbar-vertical bg-usrb-light fixed-left navbar-dark nav-width toggle-center  "
      }
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand
            className="p-0 d-flex justify-content-center align-items-end"
            {...navbarBrandProps}
          >
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
            {props.toggleSidebar && (
              <h6 className="d-none d-sm-block text-white mt-2  text-wrap">
                NATIONAL MARRIAGE REGISTRATION SYSTEM
              </h6>
            )}
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}

          <Nav navbar className={toggleSidebar || "text-center"}>
            {toggleSidebar ? (
              <>
                <NavItem>
                  <NavLink
                    to={"/index"}
                    tag={NavLinkRRD}
                    onClick={closeCollapse}
                  >
                    <i className="ni ni-tv-2 text-white" />
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/civilmarriage")
                        ? "active justify-content-between"
                        : "justify-content-between"
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(isOpen === 1 ? 0 : 1);
                    }}
                  >
                    <i>
                      <img
                        alt="icon"
                        src={
                          location.pathname.includes("/civilmarriage")
                            ? ringBlack
                            : ringWhite
                        }
                        width="20px"
                      />
                    </i>
                    <span className="w-100">Civil Marriage</span>
                    {isOpen === 1 ? (
                      <i class="ml-3 fa-solid fa-chevron-up"></i>
                    ) : (
                      <i class="ml-3 fa-solid fa-chevron-down"></i>
                    )}
                  </NavLink>
                  <div
                    id="collapse"
                    className={isOpen === 1 ? "d-block " : "d-none"}
                  >
                    <NavLink
                      to={"/civilmarriage/registration"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Registration
                    </NavLink>

                    <NavLink
                      to={"/civilmarriage/status"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Registration Status
                    </NavLink>
                    <NavLink
                      to={"/civilmarriage/approval"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Registration Approval
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/singlestatusletter")
                        ? "active justify-content-between"
                        : "justify-content-between"
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(isOpen === 2 ? 0 : 2);
                    }}
                  >
                    <i className="fa-solid fa-person text-white"></i>
                    Single Status Letter
                    {isOpen === 2 ? (
                      <i class=" fa-solid fa-chevron-up"></i>
                    ) : (
                      <i class="  fa-solid fa-chevron-down"></i>
                    )}
                  </NavLink>
                  <div
                    id="collapse"
                    className={isOpen === 2 ? "d-block " : "d-none"}
                  >
                    <NavLink
                      to={"/singlestatusletter/apply"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Apply
                    </NavLink>

                    <NavLink
                      to={"/singlestatusletter/status"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Application Status
                    </NavLink>
                    <NavLink
                      to={"/singlestatusletter/approval"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Single Status Letter Approval
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/lostcertificateretrieval")
                        ? "active justify-content-between"
                        : "justify-content-between"
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(isOpen === 3 ? 0 : 3);
                    }}
                  >
                    <i>
                      <img
                        alt="icon"
                        src={
                          location.pathname.includes(
                            "/lostcertificateretrieval"
                          )
                            ? lostBlack
                            : lostWhite
                        }
                        width="15px"
                      />
                    </i>
                    Lost Certificate Retrieval
                    {isOpen === 3 ? (
                      <i class=" fa-solid fa-chevron-up"></i>
                    ) : (
                      <i class="  fa-solid fa-chevron-down"></i>
                    )}
                  </NavLink>
                  <div
                    id="collapse"
                    className={isOpen === 3 ? "d-block " : "d-none"}
                  >
                    <NavLink
                      to={"/lostcertificateretrieval/apply"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Apply
                    </NavLink>

                    <NavLink
                      to={"/lostcertificateretrieval/status"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Application Status
                    </NavLink>
                    <NavLink
                      to={"/lostcertificateretrieval/approval"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Lost Certificate Request Approval
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/churchlicensing")
                        ? "active justify-content-between"
                        : "justify-content-between"
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(isOpen === 4 ? 0 : 4);
                    }}
                  >
                    <i className="fa-solid fa-church text-white"></i>
                    Licensing a Church
                    {isOpen === 4 ? (
                      <i class=" fa-solid fa-chevron-up"></i>
                    ) : (
                      <i class="  fa-solid fa-chevron-down"></i>
                    )}
                  </NavLink>
                  <div
                    id="collapse"
                    className={isOpen === 4 ? "d-block " : "d-none"}
                  >
                    <NavLink
                      to={"/churchlicensing/apply"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Apply
                    </NavLink>

                    <NavLink
                      to={"/churchlicensing/status"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Application Status
                    </NavLink>
                    <NavLink
                      to={"/churchlicensing/approval"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      Lost Certificate Request Approval
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/churchlicensing")
                        ? "active justify-content-between"
                        : "justify-content-between"
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(isOpen === 5 ? 0 : 5);
                    }}
                  >
                    <i class="fa-solid fa-circle-question text-white"></i>
                    <span className="w-100 text-left">FAQ</span>
                    {isOpen === 5 ? (
                      <i class=" fa-solid fa-chevron-up"></i>
                    ) : (
                      <i class="  fa-solid fa-chevron-down"></i>
                    )}
                  </NavLink>
                  <div
                    id="collapse"
                    className={isOpen === 5 ? "d-block " : "d-none"}
                  >
                    <NavLink
                      to={"/faq/create"}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                      className="text-sm bg-transparent text-white"
                    >
                      <i className="">
                        <i class="fa-solid fa-arrow-right text-sm "></i>
                      </i>
                      create
                    </NavLink>
                  </div>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    to={"/index"}
                    tag={NavLinkRRD}
                    onClick={closeCollapse}
                  >
                    <i className="ni ni-tv-2 text-white" />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={
                    location.pathname.includes("/civilmarriage") && "bg-white"
                  }
                >
                  <NavLink
                    onClick={() => {
                      closeCollapse();
                      setOpen(1);
                      handleSidebarToggle();
                    }}
                  >
                    <i>
                      <img
                        alt="icon"
                        src={
                          location.pathname.includes("/civilmarriage")
                            ? ringBlack
                            : ringWhite
                        }
                        width="20px"
                      />
                    </i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/singlestatusletter")
                        ? "active "
                        : ""
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(2);
                      handleSidebarToggle();
                    }}
                  >
                    <i className="fa-solid fa-person text-white"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/lostcertificateretrieval")
                        ? "active "
                        : ""
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(3);
                      handleSidebarToggle();
                    }}
                  >
                    <i>
                      <img
                        alt="icon"
                        src={
                          location.pathname.includes(
                            "/lostcertificateretrieval"
                          )
                            ? lostBlack
                            : lostWhite
                        }
                        width="15px"
                      />
                    </i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/churchlicensing")
                        ? "active "
                        : ""
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(4);
                      handleSidebarToggle();
                    }}
                  >
                    <i className="fa-solid fa-church text-white"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={
                      location.pathname.includes("/faq") ? "active " : ""
                    }
                    onClick={() => {
                      closeCollapse();
                      setOpen(5);
                    }}
                  >
                    <i class="fa-solid fa-circle-question text-white"></i>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          {/* 6N1MCWVL48JL31TKGF6ZU9MU */}

          {/* Divider */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
