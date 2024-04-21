import useDataWithId from "Hooks/useDataWithId";
import useDate from "Hooks/useDate";

import DateInput from "components/Forms/DateInput";
import FormFileInput from "components/Forms/FormFileInput";
import FormSelect from "components/Forms/FormSelect";
import NumberInput from "components/Forms/NumberInput";
import TelInput from "components/Forms/TelInput";
import TextInput from "components/Forms/TextInput";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, Col, Container, Form, Row } from "reactstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default function CivilMarriageEdit({ id, setModal, editWithKey }) {
  const [step, setStep] = useState(1);
  const [file, setFiles] = useState({});
  const dateObj = new Date();
  const year = dateObj.getFullYear() - 18;
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const formatDate = useDate();

  const location = useLocation();
  const routeName = location.pathname.split("/")[1];

  const dbName = routeName;

  const details = useDataWithId({ dbName, id });

  let gAgeVerified;
  let groomVerified;

  const [detail1, setDetail1] = useState({
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
    celebrant: "",
    doMarriage: "",
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

  useEffect(() => {
    if (details) {
      console.log(details);
      setDetail1(details);
    }
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
    celebrant: "",
    doMarriage: "",
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

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your action was successful.",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        setModal(false);
      }
    });
  };

  const filled = useRef({});
  const handleNext = (e) => {
    e.preventDefault();
    const errorMsgKeys = Object.keys(errorMsg);
    if (step === 1) {
      errorMsgKeys.forEach((value, index) => {
        if (index < 16)
          if (!detail1[value]) {
            setErrorMsg((elem) => {
              return { ...elem, [value]: "error" };
            });
          }
      });
      if (
        detail1.gName &&
        detail1.bName &&
        detail1.gNumber &&
        detail1.bNumber &&
        detail1.gDob &&
        detail1.bDob &&
        detail1.gMaritalStatus &&
        detail1.bMaritalStatus &&
        detail1.gNationality &&
        detail1.bNationality &&
        detail1.gAddress &&
        detail1.bAddress &&
        detail1.gOccupation &&
        detail1.bOccupation &&
        detail1.gFather &&
        detail1.bFather
      ) {
        if (year === Number(detail1.gDob.split("-")[0])) {
          if (month === Number(detail1.gDob.split("-")[1])) {
            if (date >= Number(detail1.gDob.split("-")[2])) {
              gAgeVerified = true;
            }
          } else if (month > Number(detail1.gDob.split("-")[1])) {
            gAgeVerified = true;
          }
        } else if (year > Number(detail1.gDob.split("-")[0])) {
          gAgeVerified = true;
        }

        if (year === Number(detail1.bDob.split("-")[0]) && gAgeVerified) {
          if (month === Number(detail1.bDob.split("-")[1])) {
            if (date >= Number(detail1.bDob.split("-")[2])) {
              filled.current.one = true;
              setStep(step + 1);
            } else {
              filled.current.one = false;
            }
          } else if (
            month > Number(detail1.bDob.split("-")[1]) &&
            gAgeVerified
          ) {
            filled.current.one = true;
            setStep(step + 1);
          } else {
            filled.current.one = false;
          }
        } else if (year > Number(detail1.bDob.split("-")[0]) && gAgeVerified) {
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
          if (!detail1[value]) {
            setErrorMsg((elem) => {
              return { ...elem, [value]: "error" };
            });
          }
      });
      if (
        detail1.gFatherOccupation &&
        detail1.bFatherOccupation &&
        detail1.witness1 &&
        detail1.witness2 &&
        detail1.doMarriage &&
        detail1.poMarriage &&
        detail1.county &&
        detail1.district &&
        detail1.zipCode
      ) {
        if (
          detail1.noChurch ||
          detail1.noRegistrarOffice ||
          detail1.noTemple ||
          detail1.noMosque
        ) {
          filled.current.two = true;
          setStep(step + 1);
        } else {
          filled.current.two = false;
        }
      } else {
        filled.current.two = false;
      }
    } else {
      filled.current.two = false;
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleChange = (e) => {
    // console.log("Updated detail1:", e.target.value);
    e.preventDefault();
    const detail1Keys = Object.keys(detail1);
    detail1Keys.forEach((value) => {
      if (e.target.type !== "file") {
        if (e.target.name !== "gDob" && e.target.name !== "bDob") {
          if (e.target.name === value) {
            setDetail1((elem) => {
              return { ...elem, [value]: e.target.value };
            });
            setErrorMsg((elem) => {
              return { ...elem, [value]: "" };
            });
          }
        } else {
          if (e.target.name === value) {
            setDetail1((elem) => {
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
          setDetail1((elem) => {
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
        if (!detail1[value]) {
          setErrorMsg((elem) => {
            return { ...elem, [value]: "error" };
          });
        }
    });

    if (detail1.gNationality === "Ugandan") {
      if (detail1.gSSL || detail1.gWDC || detail1.gDDA) {
        if (detail1.gLC1 && detail1.gPhoto && detail1.gId) {
          groomVerified = true;
        }
      }
    } else if (detail1.gNationality === "Refugee") {
      if (detail1.gSSL || detail1.gWDC || detail1.gDDA) {
        if (detail1.gPhoto && detail1.gVisa) {
          groomVerified = true;
        }
      }
    } else {
      if (detail1.gSSL || detail1.gWDC || detail1.gDDA) {
        if (detail1.gVisa && detail1.gPhoto && detail1.gId) {
          groomVerified = true;
        }
      }
    }

    if (detail1.bNationality === "Ugandan") {
      if (detail1.bSSL || detail1.bHDC || detail1.bDDA) {
        if (
          detail1.bLC1 &&
          detail1.bPhoto &&
          detail1.bId &&
          detail1.w1Id &&
          detail1.w2Id &&
          detail1.rmAffidavits &&
          groomVerified
        ) {
          editWithKey(detail1, id);
          filled.current.three = true;
          showSuccessAlert();
        } else {
          filled.current.three = false;
        }
      } else {
        filled.current.three = false;
      }
    } else if (detail1.gNationality === "Refugee") {
      if (detail1.bSSL || detail1.bHDC || detail1.bDDA) {
        if (
          detail1.bPhoto &&
          detail1.bVisa &&
          detail1.w1Id &&
          detail1.w2Id &&
          detail1.rmAffidavits &&
          groomVerified
        ) {
          editWithKey(detail1, id);
          filled.current.three = true;
          showSuccessAlert();
        } else {
          filled.current.three = false;
        }
      } else {
        filled.current.three = false;
      }
    } else {
      if (detail1.bSSL || detail1.bHDC || detail1.bDDA) {
        if (
          detail1.bVisa &&
          detail1.bPhoto &&
          detail1.bId &&
          detail1.w1Id &&
          detail1.w2Id &&
          detail1.rmAffidavits &&
          groomVerified
        ) {
          showSuccessAlert();
          filled.current.three = true;
          editWithKey(detail1, id);
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
                  // name="gName"
                  labelText="Groom Name"
                  // className="form-control"
                  onChange={handleChange}
                  value={detail1?.gName}
                  hasError={errorMsg.gName}
                />
                <TextInput
                  id="bName"
                  labelText="Bride Name"
                  onChange={handleChange}
                  value={detail1.bName}
                  hasError={errorMsg.bName}
                />

                <TelInput
                  id="gNumber"
                  labelText="Groom Mobile Number"
                  onChange={handleChange}
                  value={detail1.gNumber}
                  hasError={errorMsg.gNumber}
                />
                <TelInput
                  id="bNumber"
                  labelText="Bride Mobile Number"
                  onChange={handleChange}
                  value={detail1.bNumber}
                  hasError={errorMsg.bNumber}
                />

                <DateInput
                  id="gDob"
                  labelText="Groom Date Of Birth"
                  onChange={handleChange}
                  value={detail1.gDob}
                  hasError={errorMsg.gDob}
                  max={`${year}-${month < 10 ? "0" + month : month}-${
                    date < 10 ? "0" + date : date
                  }`}
                />
                <DateInput
                  id="bDob"
                  labelText="Bride Date Of Birth"
                  onChange={handleChange}
                  value={detail1.bDob}
                  hasError={errorMsg.bDob}
                  max={`${year}-${month < 10 ? "0" + month : month}-${
                    date < 10 ? "0" + date : date
                  }`}
                />

                <FormSelect
                  labelText="Groom Marital Status"
                  onChange={handleChange}
                  id="gMaritalStatus"
                  value={detail1.gMaritalStatus}
                  hasError={errorMsg.gMaritalStatus}
                >
                  <option value="">Select Groom Marital Status</option>
                  <option>Single</option>
                </FormSelect>
                <FormSelect
                  labelText="Bride Marital Status"
                  onChange={handleChange}
                  id="bMaritalStatus"
                  value={detail1.bMaritalStatus}
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
                  value={detail1.gNationality}
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
                  value={detail1.bNationality}
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
                  value={detail1.gAddress}
                  hasError={errorMsg.gAddress}
                />
                <TextInput
                  id="bAddress"
                  labelText="Bride's Residence"
                  onChange={handleChange}
                  value={detail1.bAddress}
                  hasError={errorMsg.bAddress}
                />

                <TextInput
                  id="gOccupation"
                  labelText="Groom's Occupation"
                  onChange={handleChange}
                  value={detail1.gOccupation}
                  hasError={errorMsg.gOccupation}
                />
                <TextInput
                  id="bOccupation"
                  labelText="Bride's Occupation"
                  onChange={handleChange}
                  value={detail1.bOccupation}
                  hasError={errorMsg.bOccupation}
                />

                <TextInput
                  id="gFather"
                  labelText="Groom's Father Name"
                  onChange={handleChange}
                  value={detail1.gFather}
                  hasError={errorMsg.gFather}
                />
                <TextInput
                  id="bFather"
                  labelText="Bride's Father Name"
                  onChange={handleChange}
                  value={detail1.bFather}
                  hasError={errorMsg.bFather}
                />
              </>
            )}
            {step === 2 && (
              <>
                <TextInput
                  id="gFatherOccupation"
                  labelText="Groom's Father's Occupation"
                  onChange={handleChange}
                  value={detail1.gFatherOccupation}
                  hasError={errorMsg.gFatherOccupation}
                />
                <TextInput
                  id="bFatherOccupation"
                  labelText="Bride's Father's Occupation"
                  onChange={handleChange}
                  value={detail1.bFatherOccupation}
                  hasError={errorMsg.bFatherOccupation}
                />

                <TextInput
                  id="witness1"
                  labelText="Name Of Witness 1"
                  onChange={handleChange}
                  value={detail1.witness1}
                  hasError={errorMsg.witness1}
                />
                <TextInput
                  id="witness2"
                  labelText="Name Of Witness 2"
                  onChange={handleChange}
                  value={detail1.witness2}
                  hasError={errorMsg.witness2}
                />

                <DateInput
                  id="doMarriage"
                  labelText="Date Of Marriage"
                  onChange={handleChange}
                  value={detail1.doMarriage}
                  hasError={errorMsg.doMarriage}
                />
                <TextInput
                  id="celebrant"
                  labelText="Celebrant Name"
                  onChange={handleChange}
                  value={detail1?.celebrant}
                  hasError={errorMsg?.celebrant}
                />
                <FormSelect
                  id="poMarriage"
                  labelText="Place Of Marriage"
                  onChange={handleChange}
                  value={detail1.poMarriage}
                  hasError={errorMsg.poMarriage}
                >
                  <option value="">Select Place Of Marriage</option>
                  <option>Registrar Office</option>
                  <option>Church</option>
                  <option>Mosque</option>
                  <option>Temple</option>
                </FormSelect>
                {detail1.poMarriage === "Registrar Office" && (
                  <FormSelect
                    id="noRegistrarOffice"
                    labelText="Registrar Office's Name"
                    onChange={handleChange}
                    value={detail1.noRegistrarOffice}
                    hasError={errorMsg.noRegistrarOffice}
                  >
                    <option value="">Select Registrar Office</option>
                    <option>Registrar Office</option>
                  </FormSelect>
                )}
                {detail1.poMarriage === "Church" && (
                  <FormSelect
                    id="noChurch"
                    labelText="Church's Name"
                    onChange={handleChange}
                    value={detail1.noChurch}
                    hasError={errorMsg.noChurch}
                  >
                    <option value="">Select Church</option>
                    <option>Church</option>
                  </FormSelect>
                )}
                {detail1.poMarriage === "Mosque" && (
                  <FormSelect
                    id="noMosque"
                    labelText="Mosque's Name"
                    onChange={handleChange}
                    value={detail1.noMosque}
                    hasError={errorMsg.noMosque}
                  >
                    <option value="">Select Mosque</option>
                    <option>Mosque</option>
                  </FormSelect>
                )}
                {detail1.poMarriage === "Temple" && (
                  <FormSelect
                    id="noTemple"
                    labelText="Temple's Name"
                    onChange={handleChange}
                    value={detail1.noTemple}
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
                  value={detail1.county}
                  hasError={errorMsg.county}
                >
                  <option value="">Select County</option>
                  <option>County</option>
                </FormSelect>
                <FormSelect
                  id="district"
                  labelText="District"
                  onChange={handleChange}
                  value={detail1.district}
                  hasError={errorMsg.district}
                >
                  <option value="">Select District</option>
                  <option> District</option>
                </FormSelect>
                <NumberInput
                  id="zipCode"
                  labelText="Zip Code"
                  onChange={handleChange}
                  value={detail1.zipCode}
                  hasError={errorMsg.zipCode}
                />
              </>
            )}
            {step === 3 && (
              <>
                {(detail1.gNationality === "Ugandan" ||
                  detail1.gNationality === "Other") && (
                  <FormFileInput
                    src={file?.gId}
                    labelText="Groom National Id"
                    id="gId"
                    onChange={handleChange}
                    value={detail1.gId}
                    hasError={errorMsg.gId}
                  />
                )}
                {(detail1.bNationality === "Ugandan" ||
                  detail1.bNationality === "Other") && (
                  <FormFileInput
                    src={file?.bId}
                    labelText="Bride National Id"
                    id="bId"
                    onChange={handleChange}
                    value={detail1.bId}
                    hasError={errorMsg.bId}
                  />
                )}

                {detail1.gNationality === "Ugandan" && (
                  <FormFileInput
                    src={file?.gLC1}
                    labelText="Groom's LC1 Certificate"
                    id="gLC1"
                    onChange={handleChange}
                    value={detail1.gLC1}
                    hasError={errorMsg.gLC1}
                  />
                )}
                {detail1.bNationality === "Ugandan" && (
                  <FormFileInput
                    src={file?.bLC1}
                    labelText="Bride's LC1 Certificate"
                    id="bLC1"
                    onChange={handleChange}
                    value={detail1.bLC1}
                    hasError={errorMsg.bLC1}
                  />
                )}

                <FormFileInput
                  src={file?.gPhoto}
                  labelText="Groom's Passport Size Photo"
                  id="gPhoto"
                  onChange={handleChange}
                  value={detail1.gPhoto}
                  hasError={errorMsg.gPhoto}
                />
                <FormFileInput
                  src={file?.bPhoto}
                  labelText="Bride's Passport Size Photo"
                  id="bPhoto"
                  onChange={handleChange}
                  value={detail1.bPhoto}
                  hasError={errorMsg.bPhoto}
                />

                <FormFileInput
                  src={file?.w1Id}
                  labelText="Witness 1 Valid Id"
                  id="w1Id"
                  onChange={handleChange}
                  value={detail1.w1Id}
                  hasError={errorMsg.w1Id}
                />
                <FormFileInput
                  src={file?.w2Id}
                  labelText="Witness 2 Valid Id"
                  id="w2Id"
                  onChange={handleChange}
                  value={detail1.w2Id}
                  hasError={errorMsg.w2Id}
                />
                {detail1.gMaritalStatus === "Divorced" && (
                  <FormFileInput
                    src={file?.gDDA}
                    labelText="Groom's Divorce Decree Associate "
                    id="gDDA"
                    onChange={handleChange}
                    value={detail1.gDDA}
                    hasError={errorMsg.gDDA}
                  />
                )}
                {detail1.bMaritalStatus === "Divorced" && (
                  <FormFileInput
                    src={file?.bDDA}
                    labelText="Bride's Divorce Decree Associate"
                    id="bDDA"
                    onChange={handleChange}
                    value={detail1.bDDA}
                    hasError={errorMsg.bDDA}
                  />
                )}

                {detail1.gMaritalStatus === "Widower" && (
                  <FormFileInput
                    src={file?.gWDC}
                    labelText="Groom's Wife's Death Certificate "
                    id="gWDC"
                    onChange={handleChange}
                    value={detail1.gWDC}
                    hasError={errorMsg.gWDC}
                  />
                )}
                {detail1.bMaritalStatus === "widow" && (
                  <FormFileInput
                    src={file?.bHDC}
                    labelText="Bride's Husband's Death Certificate"
                    id="bHDC"
                    onChange={handleChange}
                    value={detail1.bHDC}
                    hasError={errorMsg.bHDC}
                  />
                )}
                {detail1.gMaritalStatus === "Single" && (
                  <FormFileInput
                    src={file?.gSSL}
                    labelText="Groom's Single Status Letter "
                    id="gSSL"
                    onChange={handleChange}
                    value={detail1.gSSL}
                    hasError={errorMsg.gSSL}
                  />
                )}
                {detail1.bMaritalStatus === "Single" && (
                  <FormFileInput
                    src={file?.bSSL}
                    labelText="Bride's Single Status Letter"
                    id="bSSL"
                    onChange={handleChange}
                    value={detail1.bSSL}
                    hasError={errorMsg.bSSL}
                  />
                )}
                {(detail1.gNationality === "Refugee" ||
                  detail1.gNationality === "Other") && (
                  <FormFileInput
                    src={file?.gVisa}
                    labelText="Groom's Valid Visa"
                    id="gVisa"
                    onChange={handleChange}
                    value={detail1.gVisa}
                    hasError={errorMsg.gVisa}
                  />
                )}
                {(detail1.bNationality === "Refugee" ||
                  detail1.bNationality === "Other") && (
                  <FormFileInput
                    src={file?.bVisa}
                    labelText="Bride's Valid Visa"
                    id="bVisa"
                    onChange={handleChange}
                    value={detail1.bVisa}
                    hasError={errorMsg.bVisa}
                  />
                )}
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
