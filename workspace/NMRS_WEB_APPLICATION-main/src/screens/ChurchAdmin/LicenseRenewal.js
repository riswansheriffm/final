import FormFileInput from "components/Forms/FormFileInput";
import FormSelect from "components/Forms/FormSelect";
import NumberInput from "components/Forms/NumberInput";
import TextInput from "components/Forms/TextInput";
import { Button, Container, Form, Row } from "reactstrap";

export default function LicenseRenewal() {
  const handleChange = () => {};
  return (
    <Container fluid>
      <Form>
        <Row>
          <TextInput
            id="aName"
            labelText="Applicant Name"
            onChange={handleChange}
          />
          <TextInput
            id="aNumber"
            labelText="Mobile Number"
            onChange={handleChange}
          />
          <TextInput
            id="cName"
            labelText="Church Name"
            onChange={handleChange}
          />
          <NumberInput
            id="cLNo"
            labelText="Church License Number"
            onChange={handleChange}
          />
          <FormFileInput
            labelText="Exipred License Copy "
            id="LCopy"
            onChange={handleChange}
          />
          <FormFileInput
            labelText="Inspection Report"
            id="report"
            onChange={handleChange}
          />
          <TextInput
            id="cAddress"
            labelText="Church Address"
            onChange={handleChange}
          />
          <FormSelect id="county" labelText="County" onChange={handleChange}>
            <option value="">Select County</option>
          </FormSelect>
          <FormSelect
            id="district"
            labelText="District"
            onChange={handleChange}
          >
            <option value="">Select District</option>
          </FormSelect>
          <NumberInput
            id="Zip Code"
            labelText="Zip Code"
            onChange={handleChange}
          />
        </Row>

        <Row className="justify-content-center">
          <Button className="bg-gray text-white" size="md">
            <i className="fa-regular fa-floppy-disk text-white mr-1"></i>Save
          </Button>
          <Button className="bg-usrb text-white" size="md">
            <i className="fa-regular fa-paper-plane mr-1"></i>
            Submit
          </Button>

          <Button className="bg-danger text-white" size="md">
            <i className="fa-solid fa-clock-rotate-left text-white mr-1"></i>
            Reset
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
