import { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import TextInput from "../../../components/forms/TextInput";
import PasswordInput from "../../../components/forms/PasswordInput";

import DateInput from "../../../components/forms/DateInput";
import FormSelect from "../../../components/forms/FormSelect";
import { toast } from "react-toastify";
import TelInput from "nmrs/components/forms/TelInput";

export default function UserCreation() {
  const [details, setDetails] = useState({
    fName: "",
    role: "",
    gender: "",
    dob: "",
    mNumber: "",
    email: "",
    cIncharge: "",
    noDelegate: "",
    denomination: "",
    pass: "",
    cPass: "",
  });
  const mobileNumRegex = /^\+256[1-9]\d{8}$/;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/;

  const [check, setCheck] = useState("other");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (check === "other") {
      if (
        !details.fName &&
        !details.role &&
        !details.gender &&
        !details.dob &&
        !details.mNumber &&
        !details.email &&
        !details.pass &&
        !details.cPass
      ) {
        toast.error(`Please Complete All The Information`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.fName) {
        toast.error(`Please Enter Full Name`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.role) {
        toast.error(`Please Select Role`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.gender) {
        toast.error(`Please Select gender`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.dob) {
        toast.error(`Please Enter Date Of Birth`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.mNumber) {
        toast.error(`Please Enter Mobile Number`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!mobileNumRegex.test(details.mNumber)) {
        toast.error(`Please Enter A Valid Mobile Number`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.email) {
        toast.error(`Please Enter Email`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!emailRegex.test(details.email)) {
        toast.error(`Please Enter a Valid Email`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.pass) {
        toast.error(`Please Enter password`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!passwordRegex.test(details.pass)) {
        toast.error(
          `1. Password must be at least 8 characters.
        2. Password must contain at least one uppercase & lowercase letter.
        3. Password must contain one digit, and one special character.`,
          { theme: "colored", toastId: "error-toast" }
        );
      } else if (!details.cPass) {
        toast.error(`Please Re-Entered Password`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (details.pass !== details.cPass) {
        toast.error(`Passwords must match for confirmation.`, {
          theme: "colored",
          toastId: "error-toast",
        });
      }
    } else {
      if (
        !details.noDelegate &&
        !details.cIncharge &&
        !details.denomination &&
        !details.mNumber &&
        !details.email &&
        !details.pass &&
        !details.cPass
      ) {
        toast.error(`Please Complete All The Information`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.noDelegate) {
        toast.error(`Please Enter Name Of Delegate`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.cIncharge) {
        toast.error(`Please Enter Name Of Church Incharge`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.denomination) {
        toast.error(`Please Select Denomination`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.mNumber) {
        toast.error(`Please Enter Mobile Number`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!mobileNumRegex.test(details.mNumber)) {
        toast.error(`Please Enter A Valid Mobile Number`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.email) {
        toast.error(`Please Enter Email`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!emailRegex.test(details.email)) {
        toast.error(`Please Enter a Valid Email`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!details.pass) {
        toast.error(`Please Enter password`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (!passwordRegex.test(details.pass)) {
        toast.error(
          `1. Password must be at least 8 characters.
        2. Password must contain at least one uppercase & lowercase letter.
        3. Password must contain one digit, and one special character.`,
          { theme: "colored", toastId: "error-toast" }
        );
      } else if (!details.cPass) {
        toast.error(`Please Re-Entered Password`, {
          theme: "colored",
          toastId: "error-toast",
        });
      } else if (details.pass !== details.cPass) {
        toast.error(`Passwords must match for confirmation.`, {
          theme: "colored",
          toastId: "error-toast",
        });
      }
    }
  };

  const handleOptionChange = (event) => {
    setCheck(event.target.value);
    setDetails({
      fName: "",
      role: "",
      gender: "",
      dob: "",
      mNumber: "",
      email: "",
      cIncharge: "",
      noDelegate: "",
      denomination: "",
      pass: "",
      cPass: "",
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
    const detailsKeys = Object.keys(details);

    detailsKeys.forEach((value) => {
      if (e.target.name === value) {
        setDetails((elem) => {
          return { ...elem, [value]: e.target.value };
        });
      }
    });
  };
  
  return (
    <Container>
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Row className="text-center">
                <Col>
                  <Input
                    type="radio"
                    name="check"
                    checked={check === "church"}
                    value="church"
                    onChange={handleOptionChange}
                  />
                  <label>Church</label>
                </Col>
                <Col>
                  <Input
                    type="radio"
                    name="check"
                    checked={check === "other"}
                    value="other"
                    onChange={handleOptionChange}
                  />
                  <label>Other</label>
                </Col>
              </Row>
            </FormGroup>
            {check === "church" && (
              <Row>
                <TextInput
                  onChange={handleChange}
                  labelText="Name of Delegate"
                  id="noDelegate"
                />
                <TextInput
                  onChange={handleChange}
                  labelText="Church Incharge"
                  id="cIncharge"
                />
                <FormSelect
                  onChange={handleChange}
                  labelText="Denomination"
                  id="denomination"
                >
                  <option value="">Please Select Church Denomination</option>
                  <option>Catholic</option>
                </FormSelect>
                <TelInput
                  id="mNumber"
                  labelText="Mobile Number"
                  onChange={handleChange}
                  value={details.mNumber}
                />
                <TextInput
                  id="email"
                  labelText="Email"
                  onChange={handleChange}
                  value={details.email}
                />
                <PasswordInput
                  id="pass"
                  labelText="Password"
                  onChange={handleChange}
                  value={details.pass}
                />
                <PasswordInput
                  id="cPass"
                  labelText="Confirm Password"
                  onChange={handleChange}
                  value={details.cPass}
                />
              </Row>
            )}
            {check === "other" && (
              <Row>
                <TextInput
                  labelText="Full Name"
                  onChange={handleChange}
                  id="fName"
                  value={details.fName}
                />

                <FormSelect
                  labelText="Role"
                  id="role"
                  onChange={handleChange}
                  value={details.role}
                >
                  <option value="">Select Role</option>
                  <option>EndUsers</option>
                  <option>Church Super Admin</option>
                  <option>Registrar</option>
                </FormSelect>
                <FormSelect
                  labelText="Gender"
                  id="gender"
                  onChange={handleChange}
                  value={details.gender}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </FormSelect>
                <DateInput
                  id="dob"
                  labelText="Date Of Birth"
                  onChange={handleChange}
                  value={details.dob}
                />
                <TelInput
                  id="mNumber"
                  labelText="Mobile Number"
                  onChange={handleChange}
                  value={details.mNumber}
                />
                <TextInput
                  id="email"
                  labelText="Email"
                  onChange={handleChange}
                  value={details.email}
                />
                <PasswordInput
                  id="pass"
                  labelText="Password"
                  onChange={handleChange}
                  value={details.pass}
                />
                <PasswordInput
                  id="cPass"
                  labelText="Confirm Password"
                  onChange={handleChange}
                  value={details.cPass}
                />
              </Row>
            )}
            <Row className="justify-content-center">
              <Button className="mt-4" color="primary" type="submit">
                Create account
              </Button>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
