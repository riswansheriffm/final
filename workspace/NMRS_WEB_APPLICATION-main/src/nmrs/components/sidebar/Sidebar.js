import { useState, useEffect } from "react";
import { NavLink as NavLinkRRD, Link, useLocation } from "react-router-dom";

import { PropTypes } from "prop-types";

import { FaRegIdCard } from "react-icons/fa";

import ringWhite from "../../assets/img/brand/ringfill.png";
import lostBlack from "../../assets/img/brand/lost-black.png";
import ringBlack from "../../assets/img/brand/ring.png";
import lostWhite from "../../assets/img/brand/lost.png";

import { FaUserPlus } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

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
import { jwtDecode } from "jwt-decode";
let STATE;
const Sidebar = (props) => {
  const location = useLocation();
  const [collapseOpen, setCollapseOpen] = useState(false);
  // const decoded = jwtDecode(localStorage.getItem("token"));
  const decoded = JSON.parse(localStorage.getItem("user"));

  STATE = { state: { username: decoded.username, role: decoded.role } };

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
              <h6 className="d-none d-sm-block text-white mt-2 font-weight-bolder text-wrap">
                UGANDA REGISTRATION SERVICES BUREAU
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
                    src={require("../../themes/team-1-800x800.jpg")}
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
                {(STATE?.state.role === "citizen" ||
                  STATE?.state.role === "registrar") && (
                  <>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          closeCollapse();
                          setOpen(isOpen === 1 ? 0 : 1);
                        }}
                      >
                        <i>
                          <img alt="icon" src={ringWhite} width="20px" />
                        </i>
                        <span className="w-100 mr-1 ">Civil Marriage</span>
                        {isOpen === 1 ? (
                          <i className=" fa-solid fa-chevron-up"></i>
                        ) : (
                          <i className="fa-solid fa-chevron-down"></i>
                        )}
                      </NavLink>
                      <div
                        id="collapse"
                        className={isOpen === 1 ? "d-block " : "d-none"}
                      >
                        {STATE?.state.role === "citizen" && (
                          <>
                            <NavLink
                              to={"/civilmarriage/registration"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Registration
                            </NavLink>

                            <NavLink
                              to={"/civilmarriage/status"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Registration Status
                            </NavLink>
                          </>
                        )}
                        {STATE.state.role === "registrar" && (
                          <NavLink
                            to={"/civilmarriage/approval"}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            className="text-sm"
                          >
                            <i className="">
                              <i className="fa-solid fa-arrow-right text-sm "></i>
                            </i>
                            Registration Approval
                          </NavLink>
                        )}
                      </div>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        onClick={() => {
                          closeCollapse();
                          setOpen(isOpen === 2 ? 0 : 2);
                        }}
                      >
                        <i className="fa-solid fa-person text-white"></i>
                        <span className="w-100 mr-1 ">
                          Single Status Letter
                        </span>
                        {isOpen === 2 ? (
                          <i className=" fa-solid fa-chevron-up"></i>
                        ) : (
                          <i className="  fa-solid fa-chevron-down"></i>
                        )}
                      </NavLink>
                      <div
                        id="collapse"
                        className={isOpen === 2 ? "d-block " : "d-none"}
                      >
                        {" "}
                        {STATE.state.role === "citizen" && (
                          <>
                            <NavLink
                              to={"/singlestatusletter/apply"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm "
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Apply
                            </NavLink>

                            <NavLink
                              to={"/singlestatusletter/status"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Application Status
                            </NavLink>
                          </>
                        )}
                        {STATE.state.role === "registrar" && (
                          <NavLink
                            to={"/singlestatusletter/approval"}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            className="text-sm"
                          >
                            <i className="">
                              <i className="fa-solid fa-arrow-right text-sm "></i>
                            </i>
                            Single Status Letter Approval
                          </NavLink>
                        )}
                      </div>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        onClick={() => {
                          closeCollapse();
                          setOpen(isOpen === 3 ? 0 : 3);
                        }}
                      >
                        <i>
                          <img alt="icon" src={lostWhite} width="15px" />
                        </i>
                        <span className="w-100 mr-1 ">
                          Lost Certificate Retrieval
                        </span>
                        {isOpen === 3 ? (
                          <i className=" fa-solid fa-chevron-up"></i>
                        ) : (
                          <i className="  fa-solid fa-chevron-down"></i>
                        )}
                      </NavLink>
                      <div
                        id="collapse"
                        className={isOpen === 3 ? "d-block " : "d-none"}
                      >
                        {" "}
                        {STATE.state.role === "citizen" && (
                          <>
                            <NavLink
                              to={"/lostcertificateretrieval/apply"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Apply
                            </NavLink>

                            <NavLink
                              to={"/lostcertificateretrieval/status"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Application Status
                            </NavLink>
                          </>
                        )}
                        {STATE.state.role === "registrar" && (
                          <NavLink
                            to={"/lostcertificateretrieval/approval"}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            className="text-sm"
                          >
                            <i className="">
                              <i className="fa-solid fa-arrow-right text-sm "></i>
                            </i>
                            Lost Certificate Request Approval
                          </NavLink>
                        )}
                      </div>
                    </NavItem>
                  </>
                )}
                {(STATE?.state.role === "church" ||
                  STATE?.state.role === "registrar") && (
                  <>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          closeCollapse();
                          setOpen(isOpen === 4 ? 0 : 4);
                        }}
                      >
                        <i className="fa-solid fa-church text-white"></i>
                        <span className="w-100 mr-1 ">Licensing a Church </span>
                        {isOpen === 4 ? (
                          <i className=" fa-solid fa-chevron-up"></i>
                        ) : (
                          <i className="  fa-solid fa-chevron-down"></i>
                        )}
                      </NavLink>
                      <div
                        id="collapse"
                        className={isOpen === 4 ? "d-block " : "d-none"}
                      >
                        {STATE.state.role === "church" && (
                          <>
                            <NavLink
                              to={"/churchlicensing/apply"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Apply
                            </NavLink>

                            <NavLink
                              to={"/churchlicensing/status"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Application Status
                            </NavLink>
                          </>
                        )}
                        {STATE?.state?.role === "registrar" && (
                          <NavLink
                            to={"/churchlicensing/approval"}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            className="text-sm"
                          >
                            <i className="">
                              <i className="fa-solid fa-arrow-right text-sm "></i>
                            </i>
                            Lost Certificate Request Approval
                          </NavLink>
                        )}
                      </div>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        onClick={() => {
                          closeCollapse();
                          setOpen(isOpen === 5 ? 0 : 5);
                        }}
                      >
                        <FaRegIdCard
                          style={{
                            color: "white",
                            fontSize: "30px",
                            marginRight: "10px",
                          }}
                        />
                        <span className="w-100 mr-1">License Renewal</span>
                        {isOpen === 5 ? (
                          <i className=" fa-solid fa-chevron-up"></i>
                        ) : (
                          <i className="fa-solid fa-chevron-down"></i>
                        )}
                      </NavLink>
                      <div
                        id="collapse"
                        className={isOpen === 5 ? "d-block " : "d-none"}
                      >
                        {STATE.state.role === "church" && (
                          <>
                            <NavLink
                              to={"/LicenseRenewal/apply"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Apply
                            </NavLink>

                            <NavLink
                              to={"/LicenseRenewal/Status"}
                              tag={NavLinkRRD}
                              onClick={closeCollapse}
                              className="text-sm"
                            >
                              <i className="">
                                <i className="fa-solid fa-arrow-right text-sm "></i>
                              </i>
                              Application Status
                            </NavLink>
                          </>
                        )}
                        {STATE?.state?.role === "registrar" && (
                          <NavLink
                            to={"/LicenseRenewal/approval"}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                            className="text-sm"
                          >
                            <i className="">
                              <i className="fa-solid fa-arrow-right text-sm "></i>
                            </i>
                            License Renewal Approval
                          </NavLink>
                        )}
                      </div>
                    </NavItem>
                  </>
                )}
                {STATE?.state.role === "admin" && (
                  <>
                    <NavItem>
                      <NavLink
                        to={"/admin/usercreation"}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                      >
                        <i>
                          <FaUserPlus />
                        </i>
                        Create User
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to={"/admin/faqcrud"}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                      >
                        <i>
                          <FaQuestion />
                        </i>
                        FAQ - CRUD
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to={"/admin/payment"}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                      >
                        <i>
                          <MdOutlinePayment />
                        </i>
                        Payment
                      </NavLink>
                    </NavItem>
                  </>
                )}

                {STATE?.state.role === "churchAdmin" && (
                  <>
                    <NavItem>
                      <NavLink
                        to={"/churchAdmin/usercreation"}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                      >
                        <i>
                          <FaUserPlus />
                        </i>
                        User Creation
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to={"/churchAdmin/Addchurch"}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                      >
                        <i className="fa-solid fa-church text-white"></i>
                        Church Admin Creation
                      </NavLink>
                    </NavItem>
                  </>
                )}
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
                {(STATE?.state.role === "citizen" ||
                  STATE?.state.role === "registrar") && (
                  <>
                    <NavItem
                      className={
                        location.pathname.includes("/civilmarriage") &&
                        "bg-white"
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
                          location.pathname.includes(
                            "/lostcertificateretrieval"
                          )
                            ? "active"
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
                  </>
                )}
                {(STATE?.state.role === "church" ||
                  STATE?.state.role === "registrar") && (
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
                )}
                {(STATE?.state.role === "church" ||
                  STATE?.state.role === "registrar") && (
                  <NavItem>
                    <NavLink
                      className={
                        location.pathname.includes("/churchlicensing")
                          ? "active "
                          : ""
                      }
                      onClick={() => {
                        closeCollapse();
                        setOpen(5);
                        handleSidebarToggle();
                      }}
                    >
                      <i className="fa-solid fa-church text-white"></i>
                    </NavLink>
                  </NavItem>
                )}
                {STATE?.state.role === "admin" && (
                  <>
                    <NavItem>
                      <NavLink
                        to={"/admin/usercreation"}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                      >
                        <i>
                          <FaUserPlus />
                        </i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to={"/admin/faqcrud"}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                      >
                        <i>
                          <FaQuestion />
                        </i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to={"/admin/payment"}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                      >
                        <i>
                          <MdOutlinePayment />
                        </i>
                      </NavLink>
                    </NavItem>
                  </>
                )}
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
