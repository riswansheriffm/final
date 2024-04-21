import { useLocation } from "react-router-dom";
import { Container, Form, Row } from "reactstrap";

import "sweetalert2/dist/sweetalert2.css";
import { useDataWithId } from "../../../hooks/useDataWithId";
import TextInput from "../../../components/forms/TextInput";
import NumberInput from "../../../components/forms/NumberInput";
import DateInput from "../../../components/forms/DateInput";
import FormSelect from "../../../components/forms/FormSelect";

export default function RetrievalView({ id }) {
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;
  const details = useDataWithId({ id, dbName });

  const dateObj = new Date();
  const year = dateObj.getFullYear() - 18;
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  return (
    <>
      <Container fluid>
        <Form>
          <div className="border-3">
            <Row>
              <TextInput
                id="gName"
                labelText="Groom Name"
                value={details?.gName}
                disabled={true}
              />
              <TextInput
                id="bName"
                labelText="Bride Name"
                value={details?.bName}
                disabled={true}
              />

              <NumberInput
                id="gNumber"
                labelText="Groom Mobile Number"
                value={details?.gNumber}
                disabled={true}
              />
              <NumberInput
                id="bNumber"
                labelText="Bride Mobile Number"
                value={details?.bNumber}
                disabled={true}
              />

              <DateInput
                id="gDob"
                labelText="Groom Date Of Birth"
                value={details?.gDob}
                max={`${year}-${month}-${date}`}
                disabled={true}
              />
              <DateInput
                id="bDob"
                labelText="Bride Date Of Birth"
                value={details?.bDob}
                max={`${year}-${month}-${date}`}
                disabled={true}
              />
              <TextInput
                id="gFather"
                labelText="Groom's Father Name"
                value={details?.gFather}
                disabled={true}
              />
              <TextInput
                id="bFather"
                labelText="Bride's Father Name"
                value={details?.bFather}
                disabled={true}
              />

              <DateInput
                id="doMarriage"
                labelText="Date Of Marriage"
                value={details?.doMarriage}
                disabled={true}
              />
              <FormSelect
                disabled={true}
                id="poMarriage"
                labelText="Place Of Marriage"
                value={details?.poMarriage}
              >
                <option value="">Select Place Of Marriage</option>
                <option>Registrar Office</option>
                <option>Church</option>
                <option>Mosque</option>
                <option>Temple</option>
              </FormSelect>

              {details?.poMarriage === "Registrar Office" && (
                <FormSelect
                  disabled={true}
                  id="noRegistrarOffice"
                  labelText="Registrar Office Name"
                  value={details?.noRegistrarOffice}
                >
                  <option value="">Select Registrar Office</option>
                  <option>Registrar Office</option>
                </FormSelect>
              )}
              {details?.poMarriage === "Church" && (
                <FormSelect
                  disabled={true}
                  id="noChurch"
                  labelText="Church Name"
                  value={details?.noChurch}
                >
                  <option value="">Select Church</option>
                  <option> Church</option>
                </FormSelect>
              )}
              {details?.poMarriage === "Mosque" && (
                <FormSelect
                  disabled={true}
                  id="noMosque"
                  labelText="Mosque Name"
                  value={details?.noMosque}
                >
                  <option value="">Select Mosque</option>
                  <option>Mosque</option>
                </FormSelect>
              )}
              {details?.poMarriage === "Temple" && (
                <FormSelect
                  disabled={true}
                  id="noTemple"
                  labelText="Name Of Temple"
                  value={details?.noTemple}
                >
                  <option value="">Select Temple</option>
                  <option>Temple</option>
                </FormSelect>
              )}

              <FormSelect
                disabled={true}
                id="county"
                labelText="County"
                value={details?.county}
              >
                <option value="">Select County</option>
                <option>county</option>
              </FormSelect>
              <FormSelect
                disabled={true}
                id="district"
                labelText="District"
                value={details?.district}
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
          </div>
        </Form>
      </Container>
    </>
  );
}
