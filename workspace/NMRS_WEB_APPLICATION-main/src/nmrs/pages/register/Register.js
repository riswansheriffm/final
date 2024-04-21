import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  InputGroup,
  Col,
  Row,
} from "reactstrap";
import styles from "./style.module.css";
import FormFileInput from "nmrs/components/forms/FormFileInput";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const sign = require("jwt-encode");

const Register = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [registerdata, setRegdata] = useState({
    email: "",
    password: "",
    firstname: "",
    idProof: "",
    role: "citizen",
    gender: "",
    dob: "",
    mobile: "",
    confirmpassword: "",
  });
  const [citizenErrors, setCitizenErrors] = useState({
    email: "",
    password: "",
    firstname: "",
    idProof: "",
    role: "",
    gender: "",
    dob: "",
    mobile: "",
    confirmpassword: "",
  });
  const [churchData, setChurchData] = useState({
    email: "",
    password: "",
    NameofDelegate: "",
    Denomination: "",
    role: "church",
    confirmpassword: "",
    lastname: "",
  });

  const [churchErrors, setChurchErrors] = useState({
    email: "",
    password: "",
    NameofDelegate: "",
    Denomination: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();

  const secretKey = "just_try";

  const [selectedOption, setSelectedOption] = useState("citizen");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setRegdata((prevData) => ({
      ...prevData,
      idProof: selectedFile,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (toast.isActive("error-toast")) {
      return;
    }

    if (selectedOption === "citizen") {
      const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

      if (!registerdata.firstname) {
        toast.error(`Please Enter the Name`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!registerdata.gender) {
        toast.error(`Please Select Gender`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!registerdata.dob) {
        toast.error(`Please Enter Date of Birth`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!registerdata.mobile) {
        toast.error(`Please Enter Mobile number`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!registerdata.email || !isEmailValid(registerdata.email)) {
        toast.error(`Please Enter a Valid Email Address`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!registerdata.password) {
        toast.error(`Please Enter Password`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }

      if (!registerdata.confirmpassword) {
        toast.error(`Please Enter Confirm Password`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }

      if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(
          registerdata.password
        )
      ) {
        toast.error(
          `
          Password must be at least 8 characters.
          Password must contain at least one uppercase & lowercase letter.
          Password must contain one digit, and one special character.`,
          { theme: "colored", toastId: "error-toast" }
        );
        return;
      }

      if (registerdata.password !== registerdata.confirmpassword) {
        toast.error(`Passwords do not match`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!registerdata.idProof) {
        toast.error(`Please Upload your ID proof`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }

      const jwtEncoded = sign(registerdata, secretKey);
      localStorage.setItem("token", jwtEncoded);
      navigate("/auth/login");
    } else {
      const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
      if (!churchData.NameofDelegate) {
        toast.error(`Please Enter Name of Delegate`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!churchData.lastname) {
        toast.error(`Please Enter Name of Church Incharge`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!churchData.Denomination) {
        toast.error(`Please Enter Name of Denomination`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!churchData.email || !isEmailValid(churchData.email)) {
        toast.error(`Please Enter a valid email address`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      if (!churchData.password) {
        toast.error(`Please Enter password`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }

      if (!churchData.confirmpassword) {
        toast.error(`Please enter confirm password`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }

      if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(
          churchData.password
        )
      ) {
        toast.error(
          `
          Password must be at least 8 characters.
          Password must contain at least one uppercase & lowercase letter.
          Password must contain one digit, and one special character.`,
          { theme: "colored", toastId: "error-toast" }
        );
        return;
      }
      if (churchData.password !== churchData.confirmpassword) {
        toast.error(`Confirm password does not match`, {
          theme: "colored",
          toastId: "error-toast",
        });
        return;
      }
      const jwtEncoded = sign(churchData, secretKey);
      localStorage.setItem("token", jwtEncoded);
      navigate("/auth/login");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (selectedOption === "citizen") {
      setRegdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Remove previous error messages
      setCitizenErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));

      if (name === "mobile") {
        if (value.length !== 10) {
          toast.error("Mobile number must be 10 characters", {
            theme: "colored",
            toastId: "error-toast",
          });
        }
      } else if (name === "password") {
        if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(value)
        ) {
          toast.error(
            `
            Password must be at least 8 characters.
            Password must contain at least one uppercase & lowercase letter.
            Password must contain one digit, and one special character.`,
            { theme: "colored", toastId: "error-toast" }
          );
        }
      } else if (name === "confirmpassword") {
        if (value !== registerdata.password) {
          toast.error("Confirm password does not match", {
            theme: "colored",
            toastId: "error-toast",
          });
        }
      }
    } else {
      setChurchData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Remove previous error messages
      setChurchErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));

      if (name === "password") {
        if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/.test(value)
        ) {
          toast.error(
            `
            Password must be at least 8 characters.
            Password must contain at least one uppercase & lowercase letter.
            Password must contain one digit, and one special character.`,
            { theme: "colored", toastId: "error-toast" }
          );
        }
      } else if (name === "confirmpassword") {
        if (value !== churchData.password) {
          toast.error("Confirm password does not match", {
            theme: "colored",
            toastId: "error-toast",
          });
        }
      }
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Col lg="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-4 py-lg-3">
            <div className="logo_img">
              <img
                className="logo_img2"
                alt="..."
                src={require("../../themes/Logo.png")}
              />
            </div>
            <div className="text-center text-muted mb-4">
              <h2 className="mb-0 text-lg font-weight-bold">REGISTER</h2>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <div className={styles.radioContainer}>
                  <input
                    type="radio"
                    value="citizen"
                    name="role"
                    checked={selectedOption === "citizen"}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="citizen"
                    className={`${styles.radioLabel} ml-2`}
                  >
                    Citizen
                  </label>

                  <input
                    type="radio"
                    value="church"
                    name="role"
                    checked={selectedOption === "church"}
                    onChange={handleOptionChange}
                    style={{ marginLeft: "10px" }}
                  />
                  <label
                    htmlFor="church"
                    className={`${styles.radioLabel} ml-2`}
                  >
                    Church
                  </label>
                </div>
              </FormGroup>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />

              {selectedOption === "citizen" && (
                <div>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label htmlFor="Name" className={styles.text_style}>
                          Name:
                        </label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="firstname"
                            placeholder="Name"
                            type="text"
                            autoComplete="off"
                            value={registerdata.firstname}
                            onChange={handleChange}
                            style={{ color: "#000000" }}
                          />
                        </InputGroup>
                        {citizenErrors.firstname && (
                          <h6 className="mb-0 text-sm" style={{ color: "red" }}>
                            {citizenErrors.firstname}
                          </h6>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="gender" className={styles.text_style}>
                          Gender:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="gender"
                            type="select"
                            value={registerdata.gender}
                            onChange={handleChange}
                            style={{ color: "#000000" }}
                          >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </Input>
                        </InputGroup>
                        {citizenErrors.gender && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {citizenErrors.gender}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="dob" className={styles.text_style}>
                          Date of Birth:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="dob"
                            placeholder="Date of Birth"
                            type="date"
                            value={registerdata.dob}
                            onChange={handleChange}
                            style={{ color: "#000000" }}
                          />
                        </InputGroup>
                        {citizenErrors.dob && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {citizenErrors.dob}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="mobile" className={styles.text_style}>
                          Mobile Number:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="mobile"
                            placeholder="Mobile Number"
                            type="text"
                            autoComplete="off"
                            min="10"
                            value={registerdata.mobile}
                            onChange={handleChange}
                            style={{ color: "#000000" }}
                          />
                        </InputGroup>
                        {citizenErrors.mobile && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {citizenErrors.mobile}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="email" className={styles.text_style}>
                          Email:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="email"
                            placeholder="Email"
                            type="text"
                            style={{ color: "#000000" }}
                            autoComplete="new-email"
                            value={registerdata.email}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {citizenErrors.email && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {citizenErrors.email}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="password" className={styles.text_style}>
                          Password:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="password"
                            placeholder="Password"
                            style={{ color: "#000000" }}
                            type="password"
                            autoComplete="new-password"
                            value={registerdata.password}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {citizenErrors.password && (
                          <h7
                            className="mb-0 text-sm"
                            style={{ color: "red", whiteSpace: "pre-line" }}
                          >
                            {citizenErrors.password}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label
                          htmlFor="confirmpassword"
                          className={styles.text_style}
                        >
                          Confirm Password:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            type="password"
                            style={{ color: "#000000" }}
                            autoComplete="new-password"
                            value={registerdata.confirmpassword}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {citizenErrors.confirmpassword && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {citizenErrors.confirmpassword}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>

                    <FormFileInput
                      id="idProof"
                      labelText="IdProof"
                      onChange={handleFileChange}
                      value={fileName}
                      src={file && URL.createObjectURL(file)}
                    />
                  </Row>
                </div>
              )}
              {selectedOption === "church" && (
                <div>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label
                          htmlFor="NameofDelegate"
                          className={styles.text_style}
                        >
                          Name of Church:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="NameofDelegate"
                            placeholder="Name of Church"
                            type="text"
                            style={{ color: "#000000" }}
                            autoComplete="off"
                            value={churchData.NameofDelegate}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {churchErrors.NameofDelegate && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {churchErrors.NameofDelegate}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="lastname" className={styles.text_style}>
                          Church Incharge:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            placeholder="Church Incharge"
                            type="text"
                            autoComplete="off"
                            name="lastname"
                            style={{ color: "#000000" }}
                            value={churchData.lastname}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {churchErrors.lastname && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {churchErrors.lastname}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="lastname" className={styles.text_style}>
                          Denomination:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            placeholder="Church Incharge"
                            type="text"
                            autoComplete="off"
                            name="Denomination"
                            style={{ color: "#000000" }}
                            value={churchData.Denomination}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {churchErrors.Denomination && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {churchErrors.Denomination}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="email" className={styles.text_style}>
                          Email:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="email"
                            placeholder="email"
                            style={{ color: "#000000" }}
                            type="text"
                            autoComplete="new-email"
                            value={churchData.email}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {churchErrors.email && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {churchErrors.email}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label htmlFor="password" className={styles.text_style}>
                          Password:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            style={{ color: "#000000" }}
                            autoComplete="new-password"
                            value={churchData.password}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {churchErrors.password && (
                          <h7
                            className="mb-0 text-sm"
                            style={{ color: "red", whiteSpace: "pre-line" }}
                          >
                            {churchErrors.password}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label
                          htmlFor="confirmpassword"
                          className={styles.text_style}
                        >
                          Confirm Password:
                        </Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            type="password"
                            style={{ color: "#000000" }}
                            autoComplete="new-password"
                            value={churchData.confirmpassword}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {churchErrors.confirmpassword && (
                          <h7 className="mb-0 text-sm" style={{ color: "red" }}>
                            {churchErrors.confirmpassword}
                          </h7>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              )}

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
