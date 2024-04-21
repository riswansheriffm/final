import { useNavigate } from "react-router-dom";
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href=""
              rel="noopener noreferrer"
            >
              Uganda Registration Services Bureau
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            {/* <NavItem>
              <NavLink
                href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                NMRS
              </NavLink>
            </NavItem> */}

            <NavItem>
              <NavLink href="/civilmarriage/thankyou" rel="noopener noreferrer">
                FeedBack
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://ursb.go.ug/"
                rel="noopener noreferrer"
                target="_blank"
              >
                About Us
              </NavLink>
            </NavItem>

            {/* <NavItem>
              <NavLink
                href="http://blog.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Privacy & Policy
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                onClick={() => {
                  navigate("/faq");
                }}
              >
                FAQ
              </NavLink>
            </NavItem> */}
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
