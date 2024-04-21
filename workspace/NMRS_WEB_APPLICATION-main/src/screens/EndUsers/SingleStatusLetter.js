import useDate from "Hooks/useDate";
import useIndexedDB from "Hooks/useIndexedDB";
import DateInput from "components/Forms/DateInput";
import FormFileInput from "components/Forms/FormFileInput";
import FormSelect from "components/Forms/FormSelect";
import NumberInput from "components/Forms/NumberInput";
import TelInput from "components/Forms/TelInput";
import TextInput from "components/Forms/TextInput";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "reactstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default function SingleStatusLetter() {
  const formatDate = useDate();

  const addData = useIndexedDB();

  const location = useLocation();
  const routeName = location.pathname.split("/")[1];

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
  const dateObj = new Date();
  const year = dateObj.getFullYear() - 18;
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const dbName = routeName;
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
  const [files, setFiles] = useState({});

  const [step, setStep] = useState(1);
  const handlePrevious = (e) => {
    e.preventDefault();

    setStep(step - 1);
  };
  const filled = useRef({});

  const handleChange = (e) => {
    e.preventDefault();

    const detailsKeys = Object.keys(details);

    detailsKeys.forEach((value) => {
      if (e.target.type !== "file") {
        if (e.target.name !== "aDob") {
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
            setDetails((elem) => {
              return { ...elem, [value]: e.target.value };
            });

            if (year === Number(e.target.value.split("-")[0])) {
              if (month === Number(e.target.value.split("-")[1])) {
                if (date >= Number(e.target.value.split("-")[2])) {
                  setErrorMsg((elem) => {
                    return { ...elem, [value]: "" };
                  });
                } else {
                  setErrorMsg((elem) => {
                    return { ...elem, [value]: "Applicant Must Be Above 18" };
                  });
                }
              } else if (month > Number(e.target.value.split("-")[1])) {
                setErrorMsg((elem) => {
                  return { ...elem, [value]: "" };
                });
              } else {
                setErrorMsg((elem) => {
                  return { ...elem, [value]: "Applicant Must Be Above 18" };
                });
              }
            } else if (year > Number(e.target.value.split("-")[0])) {
              setErrorMsg((elem) => {
                return { ...elem, [value]: "" };
              });
            } else {
              setErrorMsg((elem) => {
                return { ...elem, [value]: "Applicant Must Be Above 18" };
              });
            }
          }
        }
      } else {
        if (e.target.name === value) {
          if (!e.target.value && !files[value]) {
            return null;
          }
          const reader = new FileReader();
          reader.onload = function (e) {
            setFiles((elem) => {
              return { ...elem, [value]: e.target.result };
            });
          };

          reader.readAsDataURL(e.target.files[0] || files[value]);
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
      details.aName &&
      details.aNumber &&
      details.aDob &&
      details.aFName &&
      details.aMName &&
      details.aAddress &&
      details.county &&
      details.district &&
      details.zipCode
    ) {
      if (year === Number(details.aDob.split("-")[0])) {
        if (month === Number(details.aDob.split("-")[1])) {
          if (date >= Number(details.aDob.split("-")[2])) {
            setStep(step + 1);
            filled.current.one = true;
          } else filled.current.one = false;
        } else if (month > Number(details.aDob.split("-")[1])) {
          filled.current.one = true;
          setStep(step + 1);
        } else filled.current.one = false;
      } else if (year > Number(details.aDob.split("-")[0])) {
        setStep(step + 1);
        filled.current.one = true;
      } else filled.current.one = false;
    } else filled.current.one = false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsgKeys = Object.keys(errorMsg);

    errorMsgKeys.forEach((value, index) => {
      if (index > 8) {
        if (!details[value]) {
          setErrorMsg((elem) => {
            return { ...elem, [value]: "error" };
          });
        }
      }
    });
    if (
      details.aLBC &&
      details.aId &&
      details.aSDP &&
      details.aSDA &&
      details.aLC1
    ) {
      addData({ details, dbName });
      filled.current.two = true;

      showSuccessAlert();
    } else filled.current.two = false;
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
              {filled.current.one === true && (
                <i class="ml-1 text-success fa-solid fa-circle-check"></i>
              )}
              {filled.current.one === false && (
                <i class="ml-1 fa-solid text-danger fa-circle-xmark"></i>
              )}
            </h2>
          </Col>

          <Col
            role="button"
            onClick={step === 1 ? handleNext : () => setStep(2)}
          >
            <h2
              className={
                step === 2
                  ? "border-bottom-1 text-center pb-2"
                  : "text-center pb-2"
              }
            >
              Documents Needed
              {filled.current.two === true && (
                <i class="ml-1 text-success fa-solid fa-circle-check"></i>
              )}
              {filled.current.two === false && (
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
                  id="aName"
                  labelText="Applicant Name"
                  onChange={handleChange}
                  hasError={errorMsg.aName}
                  value={details.aName}
                />
                <TelInput
                  id="aNumber"
                  labelText="Applicant's Mobile Number"
                  onChange={handleChange}
                  value={details.aNumber}
                  hasError={errorMsg.aNumber}
                />
                <DateInput
                  id="aDob"
                  labelText="Applicant Date Of Birth"
                  onChange={handleChange}
                  hasError={errorMsg.aDob}
                  value={details.aDob}
                  max={`${year}-${month < 10 ? "0" + month : month}-${
                    date < 10 ? "0" + date : date
                  }`}
                />

                <TextInput
                  id="aFName"
                  labelText="Applicant's Father's Name"
                  onChange={handleChange}
                  hasError={errorMsg.aFName}
                  value={details.aFName}
                />
                <TextInput
                  id="aMName"
                  labelText="Applicant's Mother's Name"
                  onChange={handleChange}
                  hasError={errorMsg.aMName}
                  value={details.aMName}
                />
                <TextInput
                  id="aAddress"
                  labelText="Applicant's Address"
                  onChange={handleChange}
                  hasError={errorMsg.aAddress}
                  value={details.aAddress}
                />
                <FormSelect
                  id="county"
                  labelText="County"
                  onChange={handleChange}
                  hasError={errorMsg.county}
                  value={details.county}
                >
                  <option value="">Select County</option>
                  <option>county</option>
                </FormSelect>
                <FormSelect
                  id="district"
                  labelText="District"
                  onChange={handleChange}
                  hasError={errorMsg.district}
                  value={details.district}
                >
                  <option value="">Select District</option>
                  <option>District</option>
                </FormSelect>
                <NumberInput
                  id="zipCode"
                  labelText="Zip Code"
                  onChange={handleChange}
                  hasError={errorMsg.zipCode}
                  value={details.zipCode}
                />
              </>
            )}
            {step === 2 && (
              <>
                <FormFileInput
                  labelText="Applicant's National Id"
                  id="aId"
                  onChange={handleChange}
                  hasError={errorMsg.aId}
                  value={details.aId}
                  src={files.aId}
                />

                <FormFileInput
                  labelText="Long Birth Certificate"
                  id="aLBC"
                  onChange={handleChange}
                  hasError={errorMsg.aLBC}
                  value={details.aLBC}
                  src={files.aLBC}
                />
                <FormFileInput
                  labelText="Statutory Declaration Of Applicant"
                  id="aSDA"
                  onChange={handleChange}
                  hasError={errorMsg.aSDA}
                  value={details.aSDA}
                  src={files.aSDA}
                />
                <FormFileInput
                  labelText="Statutory Declaration Of Parent"
                  id="aSDP"
                  onChange={handleChange}
                  hasError={errorMsg.aSDP}
                  value={details.aSDP}
                  src={files.aSDP}
                />

                <FormFileInput
                  labelText="LC1 ChairPerson Recommendation Letter"
                  id="aLC1"
                  onChange={handleChange}
                  hasError={errorMsg.aLC1}
                  value={details.aLC1}
                  src={files.aLC1}
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
    </>
  );
}
