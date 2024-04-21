import useDate from "Hooks/useDate";
import useIndexedDB from "Hooks/useIndexedDB";
import FormFileInput from "components/Forms/FormFileInput";
import FormSelect from "components/Forms/FormSelect";
import NumberInput from "components/Forms/NumberInput";
import TextInput from "components/Forms/TextInput";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "reactstrap";
import Swal from "sweetalert2";
export default function LicensingAChurch() {
  const formatDate = useDate();
  const addData = useIndexedDB();
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;
  const navigate = useNavigate();

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your action was successful.",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/${routeName}`);
      }
    });
  };

  const [details, setDetails] = useState({
    cOfficialName: "",
    cOfficialNumber: "",
    cName: "",
    denomination: "",
    celebrantName: "",
    cAddress: "",
    county: "",
    district: "",
    zipCode: "",
    detailsLetter: "",
    rLetter: "",
    lEntity: "",
    pLand: "",
    MCId: "",
    photo: "",
    report: "",
    doA: formatDate,
    status: "Applied",
  });

  const [errorMsg, setErrorMsg] = useState({
    cOfficialName: "",
    cOfficialNumber: "",
    cName: "",
    denomination: "",
    celebrantName: "",
    cAddress: "",
    county: "",
    district: "",
    zipCode: "",
    detailsLetter: "",
    rLetter: "",
    lEntity: "",
    pLand: "",
    MCId: "",
    photo: "",
    report: "",
  });

  const [files, setFiles] = useState({});

  const [step, setStep] = useState(1);
  const filled = useRef({});
  const {
    cOfficialName,
    cOfficialNumber,
    cName,
    denomination,
    celebrantName,
    cAddress,
    county,
    district,
    zipCode,
    detailsLetter,
    rLetter,
    lEntity,
    pLand,
    MCId,
    photo,
    report,
  } = details;
  const handleNext = (e) => {
    e.preventDefault();
    const errorMsgKeys = Object.keys(errorMsg);

    errorMsgKeys.forEach((value, index) => {
      if (index <= 8) {
        if (!details[value]) {
          setErrorMsg((elem) => {
            return { ...elem, [value]: "error" };
          });
        }
      }
    });
    if (
      cOfficialName &&
      cOfficialNumber &&
      cName &&
      denomination &&
      celebrantName &&
      cAddress &&
      county &&
      district &&
      zipCode
    ) {
      filled.current.one = true;
      setStep(step + 1);
    } else filled.current.one = false;
  };
  const handlePrevious = (e) => {
    e.preventDefault();

    setStep(step - 1);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const detailsKeys = Object.keys(details);

    detailsKeys.forEach((value) => {
      if (e.target.type !== "file") {
        if (e.target.name === value) {
          setDetails((elem) => {
            return { ...elem, [value]: e.target.value };
          });
          setErrorMsg((elem) => {
            return { ...elem, [value]: "" };
          });
        }
      } else {
        if (e.target.name === value) {
          const reader = new FileReader();
          reader.onload = function (e) {
            setFiles((elem) => {
              return { ...elem, [value]: e.target.result };
            });
          };

          reader.readAsDataURL(e.target.files[0]);
          setDetails((elem) => {
            return { ...elem, [value]: e.target.files[0] };
          });
          setErrorMsg((elem) => {
            return { ...elem, [value]: "" };
          });
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsgKeys = Object.keys(errorMsg);

    errorMsgKeys.forEach((value, index) => {
      if (index > 8)
        if (!details[value]) {
          setErrorMsg((elem) => {
            return { ...elem, [value]: "error" };
          });
        }
    });

    if (
      detailsLetter &&
      rLetter &&
      lEntity &&
      pLand &&
      MCId &&
      photo &&
      report
    ) {
      addData({ details, dbName });
      filled.current.two = true;
      showSuccessAlert();
    } else filled.current.two = false;
  };

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
            {filled.current?.one === true && (
              <i class="ml-1 text-success fa-solid fa-circle-check"></i>
            )}
            {filled.current?.one === false && (
              <i class="ml-1 fa-solid text-danger fa-circle-xmark"></i>
            )}
          </h2>
        </Col>

        <Col role="button" onClick={step === 1 ? handleNext : () => setStep(2)}>
          <h2
            className={
              step === 2
                ? "border-bottom-1 text-center pb-2"
                : "text-center pb-2"
            }
          >
            Documents Needed
            {filled.current?.two === true && (
              <i class="ml-1 text-success fa-solid fa-circle-check"></i>
            )}
            {filled.current?.two === false && (
              <i class="ml-1 fa-solid text-danger fa-circle-xmark"></i>
            )}
          </h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          {step === 1 && (
            <>
              <TextInput
                id="cOfficialName"
                labelText="Church Official Name"
                onChange={handleChange}
                value={details.cOfficialName}
                hasError={errorMsg.cOfficialName}
              />
              <NumberInput
                id="cOfficialNumber"
                labelText="Mobile Number"
                onChange={handleChange}
                value={details.cOfficialNumber}
                hasError={errorMsg.cOfficialNumber}
              />
              <TextInput
                id="cName"
                labelText="Church Name"
                onChange={handleChange}
                value={details.cName}
                hasError={errorMsg.cName}
              />
              <FormSelect
                id="denomination"
                labelText="Denominaton"
                onChange={handleChange}
                value={details.denomination}
                hasError={errorMsg.denomination}
              >
                <option value="">Select Denominaton</option>
                <option> Denominaton</option>
              </FormSelect>
              <TextInput
                id="celebrantName"
                labelText="Celebrant Name"
                onChange={handleChange}
                value={details.celebrantName}
                hasError={errorMsg.celebrantName}
              />
              <TextInput
                id="cAddress"
                labelText="Church Address"
                onChange={handleChange}
                value={details.cAddress}
                hasError={errorMsg.cAddress}
              />

              <FormSelect
                id="county"
                labelText="County"
                value={details.county}
                onChange={handleChange}
                hasError={errorMsg.county}
              >
                <option value="">Select County</option>
                <option>County</option>
              </FormSelect>
              <FormSelect
                id="district"
                labelText="District"
                onChange={handleChange}
                value={details.district}
                hasError={errorMsg.district}
              >
                <option value="">Select District</option>
                <option> District</option>
              </FormSelect>
              <NumberInput
                id="zipCode"
                labelText="Zip Code"
                value={details.zipCode}
                onChange={handleChange}
                hasError={errorMsg.zipCode}
              />
            </>
          )}
          {step === 2 && (
            <>
              <FormFileInput
                labelText="Letter Of Clear Details About The Church"
                id="detailsLetter"
                src={files.detailsLetter}
                value={details.detailsLetter}
                onChange={handleChange}
                hasError={errorMsg.detailsLetter}
              />
              <FormFileInput
                labelText="Recommendation Letter Of Mother Church"
                id="rLetter"
                value={details.rLetter}
                src={files.rLetter}
                onChange={handleChange}
                hasError={errorMsg.rLetter}
              />
              <FormFileInput
                labelText="Legal Entity"
                id="lEntity"
                value={details.lEntity}
                src={files.lEntity}
                onChange={handleChange}
                hasError={errorMsg.lEntity}
              />
              <FormFileInput
                labelText="Proof Of Land OwnerShip"
                id="pLand"
                value={details.pLand}
                src={files.pLand}
                onChange={handleChange}
                hasError={errorMsg.pLand}
              />
              <FormFileInput
                labelText="Marriage Celerabant Id"
                id="MCId"
                value={details.MCId}
                src={files.MCId}
                onChange={handleChange}
                hasError={errorMsg.MCId}
              />
              <FormFileInput
                labelText="Photos Of Church Interior And Exterior"
                id="photo"
                value={details.photo}
                src={files.photo}
                onChange={handleChange}
                hasError={errorMsg.photo}
              />
              <FormFileInput
                labelText="Inspection Report"
                id="report"
                value={details.report}
                src={files.report}
                onChange={handleChange}
                hasError={errorMsg.report}
              />
            </>
          )}
        </Row>
        <Row className="justify-content-center">
          <Button className="bg-gray text-white" size="md">
            <i className="fa-regular fa-floppy-disk text-white mr-1"></i>Save
          </Button>
          {step !== 1 && (
            <Button
              className="bg-primary text-white"
              size="md"
              onClick={handlePrevious}
            >
              <i className="fa-solid fa-arrow-left text-white mr-1"></i>
              Previous
            </Button>
          )}
          {step === 2 ? (
            <Button className="bg-usrb text-white" size="md" type="submit">
              <i className="fa-regular fa-paper-plane mr-1"></i>
              Submit
            </Button>
          ) : (
            <Button
              className="bg-usrb text-white"
              size="md"
              onClick={handleNext}
            >
              Next
              <i className="fa-solid fa-arrow-right text-white ml-1"></i>
            </Button>
          )}

          <Button className="bg-danger text-white" size="md">
            <i className="fa-solid fa-clock-rotate-left text-white mr-1"></i>
            Reset
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
