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

export default function UserCreationChurch() {
  const [details, setDetails] = useState({
    noDelegate: "",
    cIncharge: "",
    denomination: "",
    mNumber: "",
    email: "",
    pass: "",
    cPass: "",
  });

  const mobileNumRegex = /^\+256[1-9]\d{8}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !details.noDelegate ||
      !details.cIncharge ||
      !details.denomination ||
      !details.mNumber ||
      !details.email ||
      !details.pass ||
      !details.cPass
    ) {
      toast.error(`Please Complete All The Information`, {
        theme: "colored",
        toastId: "error-toast",
      });
      return;
    }

    if (!mobileNumRegex.test(details.mNumber)) {
      toast.error(`Please Enter A Valid Mobile Number`, {
        theme: "colored",
        toastId: "error-toast",
      });
      return;
    }

    if (!emailRegex.test(details.email)) {
      toast.error(`Please Enter a Valid Email`, {
        theme: "colored",
        toastId: "error-toast",
      });
      return;
    }

    if (!passwordRegex.test(details.pass)) {
      toast.error(
        `1. Password must be at least 8 characters.
      2. Password must contain at least one uppercase & lowercase letter.
      3. Password must contain one digit, and one special character.`,
        { theme: "colored", toastId: "error-toast" }
      );
      return;
    }

    if (details.pass !== details.cPass) {
      toast.error(`Passwords must match for confirmation.`, {
        theme: "colored",
        toastId: "error-toast",
      });
      return;
    }

    
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
            </FormGroup>
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
