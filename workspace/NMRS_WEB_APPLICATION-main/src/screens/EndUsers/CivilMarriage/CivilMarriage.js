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

export default function CivilMarriage() {
  const [step, setStep] = useState(1);
  const dateObj = new Date();
  const year = dateObj.getFullYear() - 18;
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const formatDate = useDate();
  const addData = useIndexedDB();
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;
  const navigate = useNavigate();

  let gAgeVerified;
  let groomVerified;
  const [details, setDetails] = useState({
    gName: "",
    bName: "",
    gNumber: "",
    bNumber: "",
    gDob: "",
    bDob: "",
    gMaritalStatus: "",
    bMaritalStatus: "",
    gNationality: "",
    bNationality: "",
    gAddress: "",
    bAddress: "",
    gOccupation: "",
    bOccupation: "",
    gFather: "",
    bFather: "",
    gFatherOccupation: "",
    bFatherOccupation: "",
    witness1: "",
    witness2: "",
    doMarriage: "",
    celebrant: "",
    poMarriage: "",
    noRegistrarOffice: "",
    noChurch: "",
    noMosque: "",
    noTemple: "",
    county: "",
    district: "",
    zipCode: "",
    gId: "",
    bId: "",
    gLC1: "",
    bLC1: "",
    gPhoto: "",
    bPhoto: "",
    w1Id: "",
    w2Id: "",
    gDDA: "",
    bDDA: "",
    gWDC: "",
    bHDC: "",
    gSSL: "",
    bSSL: "",

    gVisa: "",
    bVisa: "",
    rmAffidavits: "",
    doA: formatDate,
    status: "Applied",
  });
  const [errorMsg, setErrorMsg] = useState({
    gName: "",
    bName: "",
    gNumber: "",
    bNumber: "",
    gDob: "",
    bDob: "",
    gMaritalStatus: "",
    bMaritalStatus: "",
    gNationality: "",
    bNationality: "",
    gAddress: "",
    bAddress: "",
    gOccupation: "",
    bOccupation: "",
    gFather: "",
    bFather: "",
    gFatherOccupation: "",
    bFatherOccupation: "",
    witness1: "",
    witness2: "",
    doMarriage: "",
    celebrant: "",
    poMarriage: "",

    noRegistrarOffice: "",
    noChurch: "",
    noMosque: "",
    noTemple: "",
    county: "",
    district: "",
    zipCode: "",
    gId: "",
    bId: "",
    gLC1: "",
    bLC1: "",
    gPhoto: "",
    bPhoto: "",
    w1Id: "",
    w2Id: "",
    gDDA: "",
    bDDA: "",
    gWDC: "",
    bHDC: "",
    gSSL: "",
    bSSL: "",
    gVisa: "",
    bVisa: "",
    rmAffidavits: "",
  });

  const [file, setFiles] = useState();
  const filled = useRef({});
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
  const handleNext = (e) => {
    e.preventDefault();
    const errorMsgKeys = Object.keys(errorMsg);
    if (step === 1) {
      errorMsgKeys.forEach((value, index) => {
        if (index < 14)
          if (!details[value]) {
            setErrorMsg((elem) => {
              return { ...elem, [value]: "error" };
            });
          }
      });
      if (
        details.gName &&
        details.bName &&
        details.gNumber &&
        details.bNumber &&
        details.gDob &&
        details.bDob &&
        details.gMaritalStatus &&
        details.bMaritalStatus &&
        details.gNationality &&
        details.bNationality &&
        details.gAddress &&
        details.bAddress &&
        details.gOccupation &&
        details.bOccupation
      ) {
        if (year === Number(details.gDob.split("-")[0])) {
          if (month === Number(details.gDob.split("-")[1])) {
            if (date >= Number(details.gDob.split("-")[2])) {
              gAgeVerified = true;
            }
          } else if (month > Number(details.gDob.split("-")[1])) {
            gAgeVerified = true;
          }
        } else if (year > Number(details.gDob.split("-")[0])) {
          gAgeVerified = true;
        }

        if (year === Number(details.bDob.split("-")[0]) && gAgeVerified) {
          if (month === Number(details.bDob.split("-")[1])) {
            if (date >= Number(details.bDob.split("-")[2])) {
              filled.current.one = true;
              setStep(step + 1);
            } else {
              filled.current.one = false;
            }
          } else if (
            month > Number(details.bDob.split("-")[1]) &&
            gAgeVerified
          ) {
            filled.current.one = true;

            setStep(step + 1);
          } else {
            filled.current.one = false;
          }
        } else if (year > Number(details.bDob.split("-")[0]) && gAgeVerified) {
          filled.current.one = true;

          setStep(step + 1);
        } else {
          filled.current.one = false;
        }
      } else {
        filled.current.one = false;
      }
    } else if (step === 2) {
      errorMsgKeys.forEach((value, index) => {
        if (index >= 14 && index < 30)
          if (!details[value]) {
            setErrorMsg((elem) => {
              return { ...elem, [value]: "error" };
            });
          }
      });
      if (
        details.gFather &&
        details.bFather &&
        details.gFatherOccupation &&
        details.bFatherOccupation &&
        details.witness1 &&
        details.witness2 &&
        details.celebrant &&
        details.doMarriage &&
        details.poMarriage &&
        details.county &&
        details.district &&
        details.zipCode
      ) {
        if (
          details.noChurch ||
          details.noRegistrarOffice ||
          details.noTemple ||
          details.noMosque
        ) {
          filled.current.two = true;

          setStep(step + 1);
        } else {
          filled.current.two = false;
        }
      } else {
        filled.current.two = false;
      }
    }
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
        if (e.target.name !== "gDob" && e.target.name !== "bDob") {
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
      if (index >= 30)
        if (!details[value]) {
          setErrorMsg((elem) => {
            return { ...elem, [value]: "error" };
          });
        }
    });

    if (details.gNationality === "Ugandan") {
      if (details.gSSL || details.gWDC || details.gDDA) {
        if (details.gLC1 && details.gPhoto && details.gId) {
          groomVerified = true;
        }
      }
    } else if (details.gNationality === "Refugee") {
      if (details.gSSL || details.gWDC || details.gDDA) {
        if (details.gPhoto && details.gVisa) {
          groomVerified = true;
        }
      }
    } else {
      if (details.gSSL || details.gWDC || details.gDDA) {
        if (details.gVisa && details.gPhoto && details.gId) {
          groomVerified = true;
        }
      }
    }

    if (details.bNationality === "Ugandan") {
      if (details.bSSL || details.bHDC || details.bDDA) {
        if (
          details.bLC1 &&
          details.bPhoto &&
          details.bId &&
          details.w1Id &&
          details.w2Id &&
          details.rmAffidavits &&
          groomVerified
        ) {
          addData({ details, dbName });
          filled.current.three = true;
          showSuccessAlert();
        } else {
          filled.current.three = false;
        }
      } else {
        filled.current.three = false;
      }
    } else if (details.gNationality === "Refugee") {
      if (details.bSSL || details.bHDC || details.bDDA) {
        if (
          details.bPhoto &&
          details.bVisa &&
          details.w1Id &&
          details.w2Id &&
          details.rmAffidavits &&
          groomVerified
        ) {
          addData({ details, dbName });
          filled.current.three = true;
          showSuccessAlert();
        } else {
          filled.current.three = false;
        }
      } else {
        filled.current.three = false;
      }
    } else {
      if (details.bSSL || details.bHDC || details.bDDA) {
        if (
          details.bVisa &&
          details.bPhoto &&
          details.bId &&
          details.w1Id &&
          details.w2Id &&
          details.rmAffidavits &&
          groomVerified
        ) {
          filled.current.three = true;
          addData({ details, dbName });
          showSuccessAlert();
        } else {
          filled.current.three = false;
        }
      } else {
        filled.current.three = false;
      }
    }
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
              Other Information
              {filled.current.two === true && (
                <i class="ml-1 text-success fa-solid fa-circle-check"></i>
              )}
              {filled.current.two === false && (
                <i class="ml-1 fa-solid text-danger fa-circle-xmark"></i>
              )}
            </h2>
          </Col>
          <Col
            role="button"
            onClick={step === 2 || step === 1 ? handleNext : () => setStep(3)}
          >
            <h2
              className={
                step === 3
                  ? "border-bottom-1 text-center pb-2"
                  : "text-center pb-2"
              }
            >
              Documents Needed
              {filled.current.three === true && (
                <i class="ml-1 text-success fa-solid fa-circle-check"></i>
              )}
              {filled.current.three === false && (
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
                  id="gName"
                  labelText="Groom Name"
                  onChange={handleChange}
                  value={details.gName}
                  hasError={errorMsg.gName}
                />
                <TextInput
                  id="bName"
                  labelText="Bride Name"
                  onChange={handleChange}
                  value={details.bName}
                  hasError={errorMsg.bName}
                />

                <TelInput
                  id="gNumber"
                  labelText="Groom Mobile Number"
                  onChange={handleChange}
                  value={details.gNumber}
                  hasError={errorMsg.gNumber}
                />
                <TelInput
                  id="bNumber"
                  labelText="Bride Mobile Number"
                  onChange={handleChange}
                  value={details.bNumber}
                  hasError={errorMsg.bNumber}
                />

                <DateInput
                  id="gDob"
                  labelText="Groom Date Of Birth"
                  onChange={handleChange}
                  value={details.gDob}
                  hasError={errorMsg.gDob}
                  max={`${year}-${month < 10 ? "0" + month : month}-${
                    date < 10 ? "0" + date : date
                  }`}
                />
                <DateInput
                  id="bDob"
                  labelText="Bride Date Of Birth"
                  onChange={handleChange}
                  value={details.bDob}
                  hasError={errorMsg.bDob}
                  max={`${year}-${month < 10 ? "0" + month : month}-${
                    date < 10 ? "0" + date : date
                  }`}
                />

                <FormSelect
                  labelText="Groom Marital Status"
                  onChange={handleChange}
                  id="gMaritalStatus"
                  value={details.gMaritalStatus}
                  hasError={errorMsg.gMaritalStatus}
                >
                  <option value="">Select Groom Marital Status</option>
                  <option>Single</option>
                </FormSelect>
                <FormSelect
                  labelText="Bride Marital Status"
                  onChange={handleChange}
                  id="bMaritalStatus"
                  value={details.bMaritalStatus}
                  hasError={errorMsg.bMaritalStatus}
                >
                  {" "}
                  <option value="">Select Bride Marital Status</option>
                  <option>Single</option>
                </FormSelect>

                <FormSelect
                  id="gNationality"
                  labelText="Groom Nationality"
                  onChange={handleChange}
                  value={details.gNationality}
                  hasError={errorMsg.gNationality}
                >
                  {" "}
                  <option value="">Select Groom Nationality</option>
                  <option>Ugandan</option>
                </FormSelect>
                <FormSelect
                  id="bNationality"
                  labelText="Bride Nationality"
                  onChange={handleChange}
                  value={details.bNationality}
                  hasError={errorMsg.bNationality}
                >
                  {" "}
                  <option value="">Select Bride Nationality</option>
                  <option>Ugandan</option>
                </FormSelect>

                <TextInput
                  id="gAddress"
                  labelText="Groom's Residence"
                  onChange={handleChange}
                  value={details.gAddress}
                  hasError={errorMsg.gAddress}
                />
                <TextInput
                  id="bAddress"
                  labelText="Bride's Residence"
                  onChange={handleChange}
                  value={details.bAddress}
                  hasError={errorMsg.bAddress}
                />

                <TextInput
                  id="gOccupation"
                  labelText="Groom's Occupation"
                  onChange={handleChange}
                  value={details.gOccupation}
                  hasError={errorMsg.gOccupation}
                />
                <TextInput
                  id="bOccupation"
                  labelText="Bride's Occupation"
                  onChange={handleChange}
                  value={details.bOccupation}
                  hasError={errorMsg.bOccupation}
                />
              </>
            )}
            {step === 2 && (
              <>
                <TextInput
                  id="gFather"
                  labelText="Groom's Father Name"
                  onChange={handleChange}
                  value={details.gFather}
                  hasError={errorMsg.gFather}
                />
                <TextInput
                  id="bFather"
                  labelText="Bride's Father Name"
                  onChange={handleChange}
                  value={details.bFather}
                  hasError={errorMsg.bFather}
                />
                <TextInput
                  id="gFatherOccupation"
                  labelText="Groom's Father's Occupation"
                  onChange={handleChange}
                  value={details.gFatherOccupation}
                  hasError={errorMsg.gFatherOccupation}
                />
                <TextInput
                  id="bFatherOccupation"
                  labelText="Bride's Father's Occupation"
                  onChange={handleChange}
                  value={details.bFatherOccupation}
                  hasError={errorMsg.bFatherOccupation}
                />

                <TextInput
                  id="witness1"
                  labelText="Name Of Witness 1"
                  onChange={handleChange}
                  value={details.witness1}
                  hasError={errorMsg.witness1}
                />
                <TextInput
                  id="witness2"
                  labelText="Name Of Witness 2"
                  onChange={handleChange}
                  value={details.witness2}
                  hasError={errorMsg.witness2}
                />

                <DateInput
                  id="doMarriage"
                  labelText="Date Of Marriage"
                  onChange={handleChange}
                  value={details.doMarriage}
                  hasError={errorMsg.doMarriage}
                />
                <TextInput
                  id="celebrant"
                  labelText="Celebrant Name"
                  onChange={handleChange}
                  value={details.celebrant}
                  hasError={errorMsg.celebrant}
                />
                <FormSelect
                  id="poMarriage"
                  labelText="Place Of Marriage"
                  onChange={handleChange}
                  value={details.poMarriage}
                  hasError={errorMsg.poMarriage}
                >
                  <option value="">Select Place Of Marriage</option>
                  <option>Registrar Office</option>
                  <option>Church</option>
                  <option>Mosque</option>
                  <option>Temple</option>
                </FormSelect>
                {details.poMarriage === "Registrar Office" && (
                  <FormSelect
                    id="noRegistrarOffice"
                    labelText="Registrar Office's Name"
                    onChange={handleChange}
                    value={details.noRegistrarOffice}
                    hasError={errorMsg.noRegistrarOffice}
                  >
                    <option value="">Select Registrar Office</option>
                    <option>Registrar Office</option>
                  </FormSelect>
                )}
                {details.poMarriage === "Church" && (
                  <FormSelect
                    id="noChurch"
                    labelText="Church's Name"
                    onChange={handleChange}
                    value={details.noChurch}
                    hasError={errorMsg.noChurch}
                  >
                    <option value="">Select Church</option>
                    <option>Church</option>
                  </FormSelect>
                )}
                {details.poMarriage === "Mosque" && (
                  <FormSelect
                    id="noMosque"
                    labelText="Mosque's Name"
                    onChange={handleChange}
                    value={details.noMosque}
                    hasError={errorMsg.noMosque}
                  >
                    <option value="">Select Mosque</option>
                    <option>Mosque</option>
                  </FormSelect>
                )}
                {details.poMarriage === "Temple" && (
                  <FormSelect
                    id="noTemple"
                    labelText="Temple's Name"
                    onChange={handleChange}
                    value={details.noTemple}
                    hasError={errorMsg.noTemple}
                  >
                    <option value="">Select Temple</option>
                    <option>Temple</option>
                  </FormSelect>
                )}

                <FormSelect
                  id="county"
                  labelText="County"
                  onChange={handleChange}
                  value={details.county}
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
                  onChange={handleChange}
                  value={details.zipCode}
                  hasError={errorMsg.zipCode}
                />
              </>
            )}
            {step === 3 && (
              <>
                {(details.gNationality === "Ugandan" ||
                  details.gNationality === "Other") && (
                  <FormFileInput
                    src={file?.gId}
                    labelText="Groom National Id"
                    id="gId"
                    onChange={handleChange}
                    value={details.gId}
                    hasError={errorMsg.gId}
                  />
                )}
                {(details.bNationality === "Ugandan" ||
                  details.bNationality === "Other") && (
                  <FormFileInput
                    src={file?.bId}
                    labelText="Bride National Id"
                    id="bId"
                    onChange={handleChange}
                    value={details.bId}
                    hasError={errorMsg.bId}
                  />
                )}

                {details.gNationality === "Ugandan" && (
                  <FormFileInput
                    src={file?.gLC1}
                    labelText="Groom's LC1 Certificate"
                    id="gLC1"
                    onChange={handleChange}
                    value={details.gLC1}
                    hasError={errorMsg.gLC1}
                  />
                )}
                {details.bNationality === "Ugandan" && (
                  <FormFileInput
                    src={file?.bLC1}
                    labelText="Bride's LC1 Certificate"
                    id="bLC1"
                    onChange={handleChange}
                    value={details.bLC1}
                    hasError={errorMsg.bLC1}
                  />
                )}

                <FormFileInput
                  src={file?.gPhoto}
                  labelText="Groom's Passport Size Photo"
                  id="gPhoto"
                  onChange={handleChange}
                  value={details.gPhoto}
                  hasError={errorMsg.gPhoto}
                />
                <FormFileInput
                  src={file?.bPhoto}
                  labelText="Bride's Passport Size Photo"
                  id="bPhoto"
                  onChange={handleChange}
                  value={details.bPhoto}
                  hasError={errorMsg.bPhoto}
                />

                <FormFileInput
                  src={file?.w1Id}
                  labelText="Witness 1 Valid Id"
                  id="w1Id"
                  onChange={handleChange}
                  value={details.w1Id}
                  hasError={errorMsg.w1Id}
                />
                <FormFileInput
                  src={file?.w2Id}
                  labelText="Witness 2 Valid Id"
                  id="w2Id"
                  onChange={handleChange}
                  value={details.w2Id}
                  hasError={errorMsg.w2Id}
                />

                {details.gMaritalStatus === "Divorced" && (
                  <FormFileInput
                    src={file?.gDDA}
                    labelText="Groom's Divorce Decree Associate "
                    id="gDDA"
                    onChange={handleChange}
                    value={details.gDDA}
                    hasError={errorMsg.gDDA}
                  />
                )}
                {details.bMaritalStatus === "Divorced" && (
                  <FormFileInput
                    src={file?.bDDA}
                    labelText="Bride's Divorce Decree Associate"
                    id="bDDA"
                    onChange={handleChange}
                    value={details.bDDA}
                    hasError={errorMsg.bDDA}
                  />
                )}
                {details.gMaritalStatus === "Widower" && (
                  <FormFileInput
                    src={file?.gWDC}
                    labelText="Groom's Wife's Death Certificate "
                    id="gWDC"
                    onChange={handleChange}
                    value={details.gWDC}
                    hasError={errorMsg.gWDC}
                  />
                )}
                {details.bMaritalStatus === "widow" && (
                  <FormFileInput
                    src={file?.bHDC}
                    labelText="Bride's Husband's Death Certificate"
                    id="bHDC"
                    onChange={handleChange}
                    value={details.bHDC}
                    hasError={errorMsg.bHDC}
                  />
                )}
                {details.gMaritalStatus === "Single" &&
                  details.gNationality === "Ugandan" && (
                    <FormFileInput
                      src={file?.gSSL}
                      labelText="Groom's Single Status Letter "
                      id="gSSL"
                      onChange={handleChange}
                      value={details.gSSL}
                      hasError={errorMsg.gSSL}
                    />
                  )}

                {details.gMaritalStatus === "Single" &&
                  details.gNationality === "Other" && (
                    <FormFileInput
                      src={file?.gSSL}
                      labelText="Groom's Single Status Letter From His Country"
                      id="gSSL"
                      onChange={handleChange}
                      value={details.gSSL}
                      hasError={errorMsg.gSSL}
                    />
                  )}

                {details.gMaritalStatus === "Single" &&
                  details.gNationality === "Refugee" && (
                    <FormFileInput
                      src={file?.gSSL}
                      labelText="Groom's Single Status Letter From PM Office"
                      id="gSSL"
                      onChange={handleChange}
                      value={details.gSSL}
                      hasError={errorMsg.gSSL}
                    />
                  )}
                {details.bMaritalStatus === "Single" &&
                  details.bNationality === "Ugandan" && (
                    <FormFileInput
                      src={file?.bSSL}
                      labelText="Bride's Single Status Letter"
                      id="bSSL"
                      onChange={handleChange}
                      value={details.bSSL}
                      hasError={errorMsg.bSSL}
                    />
                  )}

                {details.bMaritalStatus === "Single" &&
                  details.bNationality === "Other" && (
                    <FormFileInput
                      src={file?.bSSL}
                      labelText="Bride's Single Status Letter From Her Nation "
                      id="bSSL"
                      onChange={handleChange}
                      value={details.bSSL}
                      hasError={errorMsg.bSSL}
                    />
                  )}

                {details.bMaritalStatus === "Single" &&
                  details.bNationality === "Refugee" && (
                    <FormFileInput
                      src={file?.bSSL}
                      labelText="Bride's Single Status Letter From Pm Office"
                      id="bSSL"
                      onChange={handleChange}
                      value={details.bSSL}
                      hasError={errorMsg.bSSL}
                    />
                  )}
                {(details.gNationality === "Refugee" ||
                  details.gNationality === "Other") && (
                  <FormFileInput
                    src={file?.gVisa}
                    labelText="Groom's Valid Visa"
                    id="gVisa"
                    onChange={handleChange}
                    value={details.gVisa}
                    hasError={errorMsg.gVisa}
                  />
                )}
                {(details.bNationality === "Refugee" ||
                  details.bNationality === "Other") && (
                  <FormFileInput
                    src={file?.bVisa}
                    labelText="Bride's Valid Visa"
                    id="bVisa"
                    onChange={handleChange}
                    value={details.bVisa}
                    hasError={errorMsg.bVisa}
                  />
                )}
                <FormFileInput
                  src={file?.rmAffidavits}
                  labelText="Registered Marriage Affidavits"
                  id="rmAffidavits"
                  onChange={handleChange}
                  value={details.rmAffidavits}
                  hasError={errorMsg.rmAffidavits}
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
            {step === 3 ? (
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
