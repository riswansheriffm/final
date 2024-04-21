import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  // InputGroupAddon,
  // InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerdata, setRegdata] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    role: "",
    gender: "",
    dob: "",
    mobile: "",
    confirmpassword: "",
  });
  const [errors, setError] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    role: "",
    gender: "",
    dob: "",
    mobile: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { ...errors };

    let regdata = { ...registerdata };
    if (!regdata.email) {
      newErrors.email = "Enter Email ID";
    }
    if (!regdata.firstname) {
      newErrors.firstname = "Enter First name";
    }
    if (!regdata.lastname) {
      newErrors.lastname = "Enter  Last name";
    }
    if (!regdata.role) {
      newErrors.role = "Select Role";
    }
    if (!regdata.gender) {
      newErrors.gender = "Select Gender";
    }
    if (!regdata.mobile) {
      newErrors.mobile = "Enter Mobile Number";
    }
    if (!regdata.dob) {
      newErrors.dob = "Enter Date of Birth";
    }

    if (!regdata.password) {
      newErrors.password = "Enter Password";
    } else if (!regdata.confirmpassword) {
      newErrors.confirmpassword = "Enter Confirm Password";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(
        regdata.password
      )
    ) {
      newErrors.password = `
      Password must be at least 8 characters.
      Password must contain at least one uppercase & lowercase letter.
      Password must contain one digit, and one special character.`;
    } else {
      newErrors.password = "";
    }

    setError(newErrors);

    const noErrors = Object.values(newErrors).every((error) => error === "");

    if (noErrors) {
      navigate("/auth/login");
    }
  };

  // const handleChange = (event) => {
  //   setRegdata(event.target.value);
  //   setError("");
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "mobile") {
      if (value.length != 10) {
        setError((prevErrors) => ({
          ...prevErrors,
          mobile: "Mobile number must be 10 characters",
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          mobile: "",
        }));
      }
    } else if (name === "password") {
      if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(value)
      ) {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: `
          Password must be at least 8 characters.
          Password must contain at least one uppercase & lowercase letter.
          Password must contain one digit, and one special character.`,
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (name === "confirmpassword") {
      if (value !== registerdata.password) {
        setError((prevErrors) => ({
          ...prevErrors,
          confirmpassword: "Confirm password does not match",
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          confirmpassword: "",
        }));
      }
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  return (
    <>
      <Col lg="6" md="8">
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
              <h2 className="mb-0 text-lg font-weight-bold">REGISTER</h2>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon> */}
                  <Input
                    name="firstname"
                    placeholder="First Name"
                    // aria-label="ddff"
                    type="text"
                    value={registerdata.firstname}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.firstname && (
                  <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                    {errors.firstname}
                  </h7>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Last Name"
                    type="text"
                    name="lastname"
                    value={registerdata.lastname}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.lastname && (
                  <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                    {errors.lastname}
                  </h7>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    name="role"
                    type="select"
                    value={registerdata.role}
                    onChange={handleChange}
                  >
                    <option value="">Role</option>
                    <option value="director">Director</option>
                    <option value="citizen">Citizen</option>
                  </Input>
                </InputGroup>
                {errors.role && (
                  <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                    {errors.role}
                  </h7>
                )}
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    name="gender"
                    type="select"
                    value={registerdata.gender}
                    onChange={handleChange}
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Input>
                </InputGroup>
                {errors.gender && (
                  <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                    {errors.gender}
                  </h7>
                )}
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    name="dob"
                    placeholder="Date of Birth"
                    type="date"
                    value={registerdata.dob}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.dob && (
                  <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                    {errors.dob}
                  </h7>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    name="mobile"
                    placeholder="Mobile Number"
                    type="text"
                    min="10"
                    value={registerdata.mobile}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.mobile && (
                  <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                    {errors.mobile}
                  </h7>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    name="email"
                    placeholder="Email"
                    type="text"
                    autoComplete="new-email"
                    value={registerdata.email}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.email && (
                  <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                    {errors.email}
                  </h7>
                )}
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={registerdata.password}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.password && (
                  <h7
                    className="mb-0 text-sm"
                    style={{ color: "red", whiteSpace: "pre-line" }}
                  >
                    {errors.password}
                  </h7>
                )}
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    value={registerdata.confirmpassword}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.confirmpassword && (
                  <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                    {errors.confirmpassword}
                  </h7>
                )}
              </FormGroup>

              {/* <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row> */}
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
