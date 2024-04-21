import DateInput from "components/Forms/DateInput";
import FormSelect from "components/Forms/FormSelect";
import NumberInput from "components/Forms/NumberInput";
import TextInput from "components/Forms/TextInput";
import PasswordInput from "components/Forms/PasswordInput";
import { useState } from "react";

import { Button, Card, CardBody, Container, Form, Row } from "reactstrap";

export default function UserCreation() {
  const [details, setDetails] = useState({
    fName: "",
    lName: "",
    role: "",
    gender: "",
    dob: "",
  });
  const handleSubmit = () => { };
  const handleChange = () => { };
  return (
    <Container>
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h2 className="mb-0 text-lg font-weight-bold">User Creation</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <TextInput
                labelText="First Name"
                onChange={handleChange}
                id="fName"
                value={details.fName}
              />
              <TextInput
                labelText="Last Name"
                onChange={handleChange}
                id="lName"
                value={details.lName}
              />
              <FormSelect
                labelText="Role"
                id="role"
                onChange={handleChange}
                value={details.role}
              >
                <option value="">Select Role</option>
                <option>EndUsers</option>
                <option>Church Admin</option>
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
              <NumberInput
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
