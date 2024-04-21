import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const recaptchaRef = React.createRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rembember, setRember] = useState(false);

  const [errors, setError] = useState({
    email: "",
    password: "",
    recapcha: "",
    rembember: "",
  });
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const captcha = recaptchaRef.current.getValue();
    let newErrors = { ...errors };

    // console.log(newErrors, "dedf");

    if (!email) {
      newErrors.email = "*Enter Your Email ID*";
    } else {
      newErrors.email = "";
    }

    if (!password) {
      newErrors.password = "*Enter Your Password*";
    }

    // } else if (
    //   !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(password)
    // ) {
    //   newErrors.password = `
    //   Password must be at least 8 characters.
    //   Password must contain at least one uppercase & lowercase letter.
    //   Password must contain one digit, and one special character.`;
    // }
    else {
      newErrors.password = "";
    }
    if (!captcha) {
      newErrors.recapcha = "*Please Complete Recaptcha To Submit*";
    } else {
      newErrors.recapcha = "";
    }

    if (!rembember) {
      newErrors.rembember = "*Please Select the Remember me*";
    } else {
      newErrors.rembember = "";
    }

    setError(newErrors);

    if (
      email &&
      password &&
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.recapcha &&
      !newErrors.rembember
    ) {
      setEmail("");
      setPassword("");
      setError({ email: "", password: "", recapcha: "", rembember: "" });
      setIsLoggedIn(true);
      setUsername(email);
      navigate("/index", { state: { username: email } });
    }
  };

  const handleEmailChange = (event) => {
    // console.log("check");
    setEmail(event.target.value);
    setError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handlerembember = (event) => {
    // console.log(event);
    setRember(event.target.checked);
    setError("");
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="logo_img">
              <img
                className="logo_img2"
                alt="..."
                src={require("../../assets/img/brand/img-logo1.png")}
              />
            </div>
            <div className="text-center text-muted mb-4">
              <h2 className="mb-0 text-lg font-weight-bold">LOGIN</h2>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>

                  <Input
                    placeholder="Email"
                    type="text"
                    autoComplete="new-email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </InputGroup>
                {errors.email && (
                  <h7
                    className="mb-0 text-sm"
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "10px",
                    }}
                  >
                    {errors.email}
                  </h7>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </InputGroup>
                {errors.password && (
                  <h7
                    className="mb-0 text-sm"
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "10px",
                    }}
                  >
                    {errors.password}
                  </h7>
                )}
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                  onChange={handlerembember}
                  checked={rembember}
                />

                <label
                  className="custom-control-label"
                  htmlFor="customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>

              {errors.rembember && (
                <h7
                  className="mb-0 text-sm"
                  style={{ color: "red", fontWeight: "400", fontSize: "10px" }}
                >
                  {errors.rembember}
                </h7>
              )}
              <Row>
                <Col xs="12" style={{ paddingTop: 10, width: "30%" }}>
                  <ReCAPTCHA
                    className="d-flex justify-content-center"
                    sitekey="6LeN63ApAAAAAImM5G-h5f-OIzG8zugOW8Z2Om3B"
                    ref={recaptchaRef}
                  />
                </Col>
                {errors.recapcha && (
                  <h7
                    className="mb-0 text-sm"
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "10px",
                    }}
                  >
                    {errors.recapcha}
                  </h7>
                )}
              </Row>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>

        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="/auth/forgetpassword"
              //onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="/auth/register">
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
