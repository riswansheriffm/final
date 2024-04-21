import useDataWithId from "Hooks/useDataWithId";
import useDate from "Hooks/useDate";
import useIndexedDB from "Hooks/useIndexedDB";
import DateInput from "components/Forms/DateInput";
import FormFileInput from "components/Forms/FormFileInput";
import FormSelect from "components/Forms/FormSelect";
import NumberInput from "components/Forms/NumberInput";
import TelInput from "components/Forms/TelInput";
import TextInput from "components/Forms/TextInput";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "reactstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SingleStatusFileView from "./singleStatusFileView";

export default function SingleStatusView({ id, setmodalClose }) {
  const formatDate = useDate();

  const addData = useIndexedDB();

  const location = useLocation();

  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;

  const [modal, setModal] = useState(false);

  const singlestatuslist = useDataWithId({ dbName, id });

  const navigate = useNavigate();

  const [details, setDetails] = useState({
    aName: "",
    aNumber: "",
    aDob: "",
    aFName: "",
    aMName: "",
    aAddress: "",
    county: "",
    district: "",
    zipCode: "",
    aLBC: "",
    aId: "",
    aSDP: "",
    aSDA: "",
    aLC1: "",
    doA: formatDate,
    status: "Applied",
  });

  const [errorMsg, setErrorMsg] = useState({
    aName: "",
    aNumber: "",
    aDob: "",
    aFName: "",
    aMName: "",
    aAddress: "",
    county: "",
    district: "",
    zipCode: "",
    aLBC: "",
    aId: "",
    aSDP: "",
    aSDA: "",
    aLC1: "",
  });

  useEffect(() => {
    console.log(singlestatuslist, "singlestatuslistll");
  }, [singlestatuslist]);

  const [files, setFiles] = useState();

  const handleClick = () => {
    setmodalClose(false);
  };

  useEffect(() => {
    const detailsKeys = Object.keys(singlestatuslist || {});
    detailsKeys.forEach((value, index) => {
      if (index >= 8) {
        if (singlestatuslist[value]) {
          const reader = new FileReader();

          if (singlestatuslist[value] instanceof Blob) {
            reader.readAsDataURL(singlestatuslist[value]);
          }
          reader.onload = function (e) {
            setFiles((elem) => {
              return { ...elem, [value]: e.target.result };
            });
          };
        }
      }
    });
  }, [singlestatuslist]);

  const handleChange = () => {};
  const handleSubmit = () => {};
  const [step, setStep] = useState(1);

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
              Documents Needed
            </h2>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            {step === 1 && (
              <>
                <TextInput
                  id="aName"
                  labelText="Applicant Name"
                  onChange={handleChange}
                  value={singlestatuslist?.aName}
                  disabled={true}
                />
                <TelInput
                  id="aNumber"
                  labelText="Applicant's Mobile Number"
                  onChange={handleChange}
                  value={singlestatuslist?.aNumber}
                  disabled={true}
                />
                <DateInput
                  id="aDob"
                  labelText="Applicant Date Of Birth"
                  onChange={handleChange}
                  value={singlestatuslist?.aDob}
                  disabled={true}
                />

                <TextInput
                  id="aFName"
                  labelText="Applicant's Father's Name"
                  onChange={handleChange}
                  value={singlestatuslist?.aFName}
                  disabled={true}
                />
                <TextInput
                  id="aMName"
                  labelText="Applicant's Mother's Name"
                  onChange={handleChange}
                  value={singlestatuslist?.aMName}
                  disabled={true}
                />
                <TextInput
                  id="aAddress"
                  labelText="Applicant's Address"
                  onChange={handleChange}
                  value={singlestatuslist?.aAddress}
                  disabled={true}
                />
                <FormSelect
                  id="county"
                  labelText="County"
                  onChange={handleChange}
                  value={singlestatuslist?.county}
                  disabled={true}
                >
                  <option value="">Select County</option>
                  <option>county</option>
                </FormSelect>
                <FormSelect
                  id="district"
                  labelText="District"
                  onChange={handleChange}
                  value={singlestatuslist?.district}
                  disabled={true}
                >
                  <option value="">Select District</option>
                  <option>District</option>
                </FormSelect>
                <NumberInput
                  id="zipCode"
                  labelText="Zip Code"
                  onChange={handleChange}
                  value={singlestatuslist?.zipCode}
                  disabled={true}
                />
              </>
            )}
            {step === 2 && (
              <>
                <SingleStatusFileView
                  labelText="Applicant's National Id"
                  src={files?.aLBC}
                  id="aLBC"
                  name={singlestatuslist?.aLBC?.name}
                  modal={modal}
                  setModal={setModal}
                />
                <SingleStatusFileView
                  labelText="Long Birth Certificate"
                  id="aId"
                  name={singlestatuslist?.aId?.name}
                  src={files?.aId}
                  modal={modal}
                  setModal={setModal}
                />
                <SingleStatusFileView
                  labelText="Statutory Declaration Of Parent"
                  id="aSDP"
                  name={singlestatuslist?.aSDP?.name}
                  src={files?.aSDP}
                  modal={modal}
                  setModal={setModal}
                />
                <SingleStatusFileView
                  labelText="Statutory Declaration Of Applicant"
                  id="aSDA"
                  name={singlestatuslist?.aSDA?.name}
                  src={files?.aSDA}
                  modal={modal}
                  setModal={setModal}
                />
                <SingleStatusFileView
                  labelText="LC1 ChairPerson Recommendation Letter"
                  id="aLC1"
                  name={singlestatuslist?.aLC1?.name}
                  src={files?.aLC1}
                  modal={modal}
                  setModal={setModal}
                />
              </>
            )}
          </Row>
          <Row className="justify-content-center">
            <Button
              className="bg-danger text-white"
              size="md"
              onClick={() => handleClick()}
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
}
