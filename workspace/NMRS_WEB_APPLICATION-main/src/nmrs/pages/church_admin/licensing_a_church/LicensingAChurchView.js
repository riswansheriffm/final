import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Form, Row } from "reactstrap";
import LicensingFileView from "./LicensingFileView";
import { useDataWithId } from "../../../hooks/useDataWithId";
import TextInput from "../../../components/forms/TextInput";
import NumberInput from "../../../components/forms/NumberInput";
import FormSelect from "../../../components/forms/FormSelect";

export default function LicensingAChurchView({ id }) {
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;
  const [files, setFiles] = useState();

  const details = useDataWithId({ dbName, id });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const detailsKeys = Object.keys(details || {});
    detailsKeys.forEach((value, index) => {
      if (index >= 8) {
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

  const [step, setStep] = useState(1);
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center mb-3 ">
        <Col role="button" onClick={() => setStep(1)}>
          <h2
            className={
              step === 1
                ? "border-bottom-1 text-center pb-2"
                : "text-center pb-2"
            }
          >
            Personal Information
          </h2>
        </Col>

        <Col role="button" onClick={() => setStep(2)}>
          <h2
            className={
              step === 2
                ? "border-bottom-1 text-center pb-2"
                : "text-center pb-2"
            }
          >
            Documents Needed
          </h2>
        </Col>
      </Row>
      <Form>
        <div className="border-3">
          <Row>
            {step === 1 && (
              <>
                <TextInput
                  id="cOfficialName"
                  labelText="Church Official Name"
                  value={details?.cOfficialName}
                  disabled={true}
                />
                <NumberInput
                  id="cOfficialNumber"
                  labelText="Mobile Number"
                  disabled={true}
                  value={details?.cOfficialNumber}
                />

                <TextInput
                  id="cName"
                  labelText="Church Name"
                  disabled={true}
                  value={details?.cName}
                />
                <FormSelect
                  id="denomination"
                  labelText="Denominaton"
                  value={details?.denomination}
                  disabled={true}
                >
                  <option value="">Select Denominaton</option>
                  <option> Denominaton</option>
                </FormSelect>
                <TextInput
                  id="celebrantName"
                  labelText="Celebrant Name"
                  disabled={true}
                  value={details?.celebrantName}
                />
                <TextInput
                  id="cAddress"
                  labelText="Church Address"
                  disabled={true}
                  value={details?.cAddress}
                />
                <FormSelect
                  id="county"
                  labelText="County"
                  disabled={true}
                  value={details?.county}
                >
                  <option value="">Select County</option>
                  <option>County</option>
                </FormSelect>
                <FormSelect
                  id="district"
                  labelText="District"
                  value={details?.district}
                  disabled={true}
                >
                  <option value="">Select District</option>
                  <option> District</option>
                </FormSelect>
                <NumberInput
                  id="zipCode"
                  labelText="Zip Code"
                  disabled={true}
                  value={details?.zipCode}
                />
              </>
            )}
            {step === 2 && (
              <>
                <LicensingFileView
                  modal={modal}
                  setModal={setModal}
                  labelText="Letter Of Clear Details About The Church"
                  id="detailsLetter"
                  src={files?.detailsLetter}
                  name={details?.detailsLetter?.name}
                />

                <LicensingFileView
                  modal={modal}
                  setModal={setModal}
                  labelText="Recommendation Letter Of Mother Church"
                  id="rLetter"
                  name={details?.rLetter?.name}
                  src={files?.rLetter}
                />
                <LicensingFileView
                  modal={modal}
                  setModal={setModal}
                  labelText="Legal Entity"
                  id="lEntity"
                  name={details?.lEntity?.name}
                  src={files?.lEntity}
                />
                <LicensingFileView
                  modal={modal}
                  setModal={setModal}
                  labelText="Proof Of Land OwnerShip"
                  id="pLand"
                  name={details?.pLand?.name}
                  src={files?.pLand}
                />
                <LicensingFileView
                  modal={modal}
                  setModal={setModal}
                  labelText="Marriage Celerabant Id"
                  id="MCId"
                  name={details?.MCId?.name}
                  src={files?.MCId}
                />
                <LicensingFileView
                  modal={modal}
                  setModal={setModal}
                  labelText="Photos Of Church Interior And Exterior"
                  id="photo"
                  name={details?.photo?.name}
                  src={files?.photo}
                />
                <LicensingFileView
                  modal={modal}
                  setModal={setModal}
                  labelText="Inspection Report"
                  id="report"
                  name={details?.report?.name}
                  src={files?.report}
                />
              </>
            )}
          </Row>
        </div>
      </Form>
    </Container>
  );
}
