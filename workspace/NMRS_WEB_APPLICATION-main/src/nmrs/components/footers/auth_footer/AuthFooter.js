// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer>
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a className="font-weight-bold ml-1" href="">
                  Uganda Registration Services Bureau
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink href="https://ursb.go.ug/" target="_blank">
                    About Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
