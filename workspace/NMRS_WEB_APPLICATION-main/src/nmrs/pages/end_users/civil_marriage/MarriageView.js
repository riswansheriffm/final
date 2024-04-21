import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, Col, Container, Form, Row } from "reactstrap";

import "sweetalert2/dist/sweetalert2.css";
import MarriageFileView from "./MarriageFileView";
import { useDataWithId } from "../../../hooks/useDataWithId";
import TextInput from "../../../components/forms/TextInput";
import TelInput from "../../../components/forms/TelInput";
import DateInput from "../../../components/forms/DateInput";
import FormSelect from "../../../components/forms/FormSelect";
import NumberInput from "../../../components/forms/NumberInput";

export default function MarriageView({ id }) {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];

  const dbName = routeName;

  const details = useDataWithId({ dbName, id });

  const [files, setFiles] = useState();

  const handleChange = () => {};
  const handleSubmit = () => {};

  useEffect(() => {
    const detailsKeys = Object.keys(details || {});
    detailsKeys.forEach((value, index) => {
      if (index >= 29) {
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

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(step + 1);
    } else if (step === 2) {
      setStep(step + 1);
    }
  };
  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <>
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
              Other Information
            </h2>
          </Col>
          <Col role="button" onClick={() => setStep(3)}>
            <h2
              className={
                step === 3
                  ? "border-bottom-1 text-center pb-2"
                  : "text-center pb-2"
              }
            >
              Documents Needed
            </h2>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <div className="border-3">
            <Row>
              {step === 1 && (
                <>
                  <TextInput
                    id="gName"
                    labelText="Groom Name"
                    onChange={handleChange}
                    value={details?.gName}
                    disabled={true}
                  />
                  <TextInput
                    id="bName"
                    labelText="Bride Name"
                    onChange={handleChange}
                    value={details?.bName}
                    disabled={true}
                  />

                  <TelInput
                    id="gNumber"
                    labelText="Groom Mobile Number"
                    onChange={handleChange}
                    value={details?.gNumber}
                    disabled={true}
                  />
                  <TelInput
                    id="bNumber"
                    labelText="Bride Mobile Number"
                    onChange={handleChange}
                    value={details?.bNumber}
                    disabled={true}
                  />

                  <DateInput
                    id="gDob"
                    labelText="Groom Date Of Birth"
                    onChange={handleChange}
                    value={details?.gDob}
                    disabled={true}
                  />
                  <DateInput
                    id="bDob"
                    labelText="Bride Date Of Birth"
                    onChange={handleChange}
                    value={details?.bDob}
                    disabled={true}
                  />

                  <FormSelect
                    disabled={true}
                    labelText="Groom Marital Status"
                    onChange={handleChange}
                    id="gMaritalStatus"
                    value={details?.gMaritalStatus}
                  >
                    <option value="">Select Groom Marital Status</option>
                    <option>Single</option>
                  </FormSelect>
                  <FormSelect
                    disabled={true}
                    labelText="Bride Marital Status"
                    onChange={handleChange}
                    id="bMaritalStatus"
                    value={details?.bMaritalStatus}
                  >
                    {" "}
                    <option value="">Select Bride Marital Status</option>
                    <option>Single</option>
                  </FormSelect>

                  <FormSelect
                    disabled={true}
                    id="gNationality"
                    labelText="Groom Nationality"
                    onChange={handleChange}
                    value={details?.gNationality}
                  >
                    {" "}
                    <option value="">Select Groom Nationality</option>
                    <option>Ugandan</option>
                  </FormSelect>
                  <FormSelect
                    disabled={true}
                    id="bNationality"
                    labelText="Bride Nationality"
                    onChange={handleChange}
                    value={details?.bNationality}
                  >
                    {" "}
                    <option value="">Select Bride Nationality</option>
                    <option>Ugandan</option>
                  </FormSelect>

                  <TextInput
                    id="gAddress"
                    labelText="Groom's Residence"
                    onChange={handleChange}
                    value={details?.gAddress}
                    disabled={true}
                  />
                  <TextInput
                    id="bAddress"
                    labelText="Bride's Residence"
                    onChange={handleChange}
                    value={details?.bAddress}
                    disabled={true}
                  />

                  <TextInput
                    id="gOccupation"
                    labelText="Groom's Occupation"
                    onChange={handleChange}
                    value={details?.gOccupation}
                    disabled={true}
                  />
                  <TextInput
                    id="bOccupation"
                    labelText="Bride's Occupation"
                    onChange={handleChange}
                    value={details?.bOccupation}
                    disabled={true}
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <TextInput
                    id="gFather"
                    labelText="Groom's Father Name"
                    onChange={handleChange}
                    value={details?.gFather}
                    disabled={true}
                  />
                  <TextInput
                    id="bFather"
                    labelText="Bride's Father Name"
                    onChange={handleChange}
                    value={details?.bFather}
                    disabled={true}
                  />
                  <TextInput
                    id="gFatherOccupation"
                    labelText="Groom's Father's Occupation"
                    onChange={handleChange}
                    value={details?.gFatherOccupation}
                    disabled={true}
                  />
                  <TextInput
                    id="bFatherOccupation"
                    labelText="Bride's Father's Occupation"
                    onChange={handleChange}
                    value={details?.bFatherOccupation}
                    disabled={true}
                  />

                  <TextInput
                    id="witness1"
                    labelText="Name Of Witness 1"
                    onChange={handleChange}
                    value={details?.witness1}
                    disabled={true}
                  />
                  <TextInput
                    id="witness2"
                    labelText="Name Of Witness 2"
                    onChange={handleChange}
                    value={details?.witness2}
                    disabled={true}
                  />

                  <DateInput
                    id="doMarriage"
                    labelText="Date Of Marriage"
                    onChange={handleChange}
                    value={details?.doMarriage}
                    disabled={true}
                  />
                  <TextInput
                    id="celebrant"
                    labelText="Celebrant Name"
                    onChange={handleChange}
                    value={details?.celebrant}
                    disabled={true}
                  />
                  <FormSelect
                    disabled={true}
                    id="poMarriage"
                    labelText="Place Of Marriage"
                    onChange={handleChange}
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
                      labelText="Registrar Office's Name"
                      onChange={handleChange}
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
                      labelText="Church's Name"
                      onChange={handleChange}
                      value={details?.noChurch}
                    >
                      <option value="">Select Church</option>
                      <option>Church</option>
                    </FormSelect>
                  )}
                  {details?.poMarriage === "Mosque" && (
                    <FormSelect
                      disabled={true}
                      id="noMosque"
                      labelText="Mosque's Name"
                      onChange={handleChange}
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
                      labelText="Temple's Name"
                      onChange={handleChange}
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
                    onChange={handleChange}
                    value={details?.county}
                  >
                    <option value="">Select County</option>
                    <option>County</option>
                  </FormSelect>
                  <FormSelect
                    disabled={true}
                    id="district"
                    labelText="District"
                    onChange={handleChange}
                    value={details?.district}
                  >
                    <option value="">Select District</option>
                    <option> District</option>
                  </FormSelect>
                  <NumberInput
                    id="zipCode"
                    labelText="Zip Code"
                    onChange={handleChange}
                    value={details?.zipCode}
                    disabled={true}
                  />
                </>
              )}
              {step === 3 && (
                <>
                  {(details?.gNationality === "Ugandan" ||
                    details?.gNationality === "Other") && (
                    <MarriageFileView
                      src={files?.gId}
                      id="gId"
                      name={details?.gId?.name}
                      modal={modal}
                      setModal={setModal}
                      labelText="Groom National Id"
                    />
                  )}
                  {(details?.bNationality === "Ugandan" ||
                    details?.bNationality === "Other") && (
                    <MarriageFileView
                      id="bId"
                      src={files?.bId}
                      name={details?.bId?.name}
                      modal={modal}
                      setModal={setModal}
                      labelText="Bride National Id"
                    />
                  )}

                  {details?.gNationality === "Ugandan" && (
                    <MarriageFileView
                      id="gLC1"
                      src={files?.gLC1}
                      name={details?.gLC1?.name}
                      modal={modal}
                      setModal={setModal}
                      labelText="Groom's LC1 Certificate"
                    />
                  )}
                  {details?.bNationality === "Ugandan" && (
                    <MarriageFileView
                      id="bLC1"
                      src={files?.bLC1}
                      name={details?.bLC1?.name}
                      modal={modal}
                      setModal={setModal}
                      labelText="Bride's LC1 Certificate"
                    />
                  )}

                  <MarriageFileView
                    id="gPhoto"
                    src={files?.gPhoto}
                    name={details?.gPhoto?.name}
                    modal={modal}
                    setModal={setModal}
                    labelText="Groom's Passport Size Photo"
                  />
                  <MarriageFileView
                    labelText="Bride's Passport Size Photo"
                    id="bPhoto"
                    src={files?.bPhoto}
                    name={details?.bPhoto?.name}
                    modal={modal}
                    setModal={setModal}
                  />
                  <MarriageFileView
                    labelText="Witness 1 Valid Id"
                    id="w1Id"
                    src={files?.w1Id}
                    name={details?.w1Id?.name}
                    modal={modal}
                    setModal={setModal}
                  />
                  <MarriageFileView
                    labelText="Witness 2 Valid Id"
                    id="w2Id"
                    src={files?.w2Id}
                    name={details?.w2Id?.name}
                    modal={modal}
                    setModal={setModal}
                  />

                  {details?.gMaritalStatus === "Divorced" && (
                    <MarriageFileView
                      labelText="Groom's Divorce Decree Associate "
                      id="gDDA"
                      src={files?.gDDA}
                      name={details?.gDDA?.name}
                      modal={modal}
                      setModal={setModal}
                    />
                  )}
                  {details?.bMaritalStatus === "Divorced" && (
                    <MarriageFileView
                      id="bDDA"
                      labelText="Bride's Divorce Decree Associate"
                      src={files?.bDDA}
                      name={details?.bDDA?.name}
                      modal={modal}
                      setModal={setModal}
                    />
                  )}
                  {details?.gMaritalStatus === "Widower" && (
                    <MarriageFileView
                      id="gWDC"
                      src={files?.gWDC}
                      name={details?.gWDC?.name}
                      labelText="Groom's Wife's Death Certificate "
                      modal={modal}
                      setModal={setModal}
                    />
                  )}
                  {details?.bMaritalStatus === "widow" && (
                    <MarriageFileView
                      id="bHDC"
                      src={files?.bHDC}
                      name={details?.bHDC?.name}
                      modal={modal}
                      setModal={setModal}
                      labelText="Bride's Husband's Death Certificate"
                    />
                  )}
                  {details?.gMaritalStatus === "Single" && (
                    <MarriageFileView
                      id="gSSL"
                      src={files?.gSSL}
                      name={details?.gSSL?.name}
                      modal={modal}
                      setModal={setModal}
                      labelText="Groom's Single Status Letter "
                    />
                  )}
                  {details?.bMaritalStatus === "Single" && (
                    <MarriageFileView
                      id="bSSL"
                      labelText="Bride's Single Status Letter"
                      src={files?.bSSL}
                      name={details?.bSSL?.name}
                      modal={modal}
                      setModal={setModal}
                    />
                  )}
                  {(details?.gNationality === "Refugee" ||
                    details?.gNationality === "Other") && (
                    <MarriageFileView
                      id="gVisa"
                      labelText="Groom's Valid Visa"
                      src={files?.gVisa}
                      name={details?.gVisa?.name}
                      modal={modal}
                      setModal={setModal}
                    />
                  )}
                  {(details?.bNationality === "Refugee" ||
                    details?.bNationality === "Other") && (
                    <MarriageFileView
                      id="bVisa"
                      src={files?.bVisa}
                      labelText="Bride's Valid Visa"
                      name={details?.bVisa?.name}
                      modal={modal}
                      setModal={setModal}
                    />
                  )}
                  <MarriageFileView
                    id="rmAffidavits"
                    src={files?.rmAffidavits}
                    name={details?.rmAffidavits?.name}
                    labelText="Registered Marriage Affidavits"
                    modal={modal}
                    setModal={setModal}
                  />
                </>
              )}
            </Row>
          </div>
        </Form>
      </Container>
    </>
  );
}
