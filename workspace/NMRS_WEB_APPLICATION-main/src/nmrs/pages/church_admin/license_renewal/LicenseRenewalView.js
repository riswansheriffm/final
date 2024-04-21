import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "reactstrap";
import TextInput from "../../../components/forms/TextInput";
import NumberInput from "../../../components/forms/NumberInput";
import FormSelect from "../../../components/forms/FormSelect";
import { useLocation } from "react-router-dom";
import RenewalFileView from "./RenewalFileView";
import useDataWithId from "Hooks/useDataWithId";
export default function LicenseRenewalView({ id }) {
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;
  const [files, setFiles] = useState({});
  const details = useDataWithId({ dbName, id });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const detailsKeys = Object.keys(details || {});
    detailsKeys.forEach((value, index) => {
      if (index === 4 || index === 5) {
        if (details[value]) {
          const reader = new FileReader();

          if (details[value] instanceof Blob) {
            reader.readAsDataURL(details[value]);
          }
          reader.onload = function (e) {
            setFiles((elem) => {
              return { ...elem, [value]: e.target.result };
            });
          };
        }
      }
    });
  }, [details]);

  return (
    <Container fluid>
      <Form>
        <Row>
          <TextInput
            id="aName"
            labelText="Applicant Name"
            value={details?.aName}
            disabled={true}
          />
          <TextInput
            id="aNumber"
            labelText="Mobile Number"
            value={details?.aNumber}
            disabled={true}
          />
          <TextInput
            id="cName"
            labelText="Church Name"
            value={details?.cName}
            disabled={true}
          />
          <NumberInput
            id="cLNo"
            labelText="Church License Number"
            value={details?.cLNo}
            disabled={true}
          />
          <RenewalFileView
            modal={modal}
            setModal={setModal}
            labelText="Exipred License Copy "
            id="ExLicense"
            src={files?.ExLicense}
            name={details?.ExLicense?.name}
          />

          <RenewalFileView
            modal={modal}
            setModal={setModal}
            labelText="Inspection Report"
            id="InsReport"
            src={files?.InsReport}
            name={details?.InsReport?.name}
          />
          <TextInput
            id="cAddress"
            labelText="Church Address"
            value={details?.cAddress}
            disabled={true}
          />
          <FormSelect
            id="county"
            labelText="County"
            value={details?.county}
            disabled={true}
          >
            <option value="">Select County</option>
            <option>Country</option>
          </FormSelect>
          <FormSelect
            id="district"
            labelText="District"
            value={details?.district}
            disabled={true}
          >
            <option value="">Select District</option>
            <option>District</option>
          </FormSelect>
          <NumberInput
            id="zipCode"
            labelText="Zip Code"
            value={details?.zipCode}
            disabled={true}
          />
        </Row>
      </Form>
    </Container>
  );
}
