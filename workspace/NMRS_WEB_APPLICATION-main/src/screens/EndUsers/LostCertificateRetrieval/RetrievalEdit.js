import useDataWithId from "Hooks/useDataWithId";
import useDate from "Hooks/useDate";

import DateInput from "components/Forms/DateInput";
import FormSelect from "components/Forms/FormSelect";
import NumberInput from "components/Forms/NumberInput";
import TextInput from "components/Forms/TextInput";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Form, Row } from "reactstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default function RetrievalEdit({ id, setModal, editWithKey }) {
  const formatDate = useDate();

  const location = useLocation();
  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;
  const details1 = useDataWithId({ dbName, id });

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your action was successful.",
      confirmButtonText: "OK",
    }).then(() => {
      setModal(false);
    });
  };
  const dateObj = new Date();
  const year = dateObj.getFullYear() - 18;
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  let gAgeVerified;
  const [details, setDetails] = useState({
    gName: "",
    bName: "",
    gNumber: "",
    bNumber: "",
    gDob: "",
    bDob: "",
    gFather: "",
    bFather: "",
    doMarriage: "",
    poMarriage: "",
    noRegistrarOffice: "",
    noChurch: "",
    noMosque: "",
    noTemple: "",
    county: "",
    district: "",
    zipCode: "",
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
    gFather: "",
    bFather: "",
    doMarriage: "",
    poMarriage: "",
    noRegistrarOffice: "",
    noChurch: "",
    noMosque: "",
    noTemple: "",
    county: "",
    district: "",
    zipCode: "",
  });

  useEffect(() => {
    if (details1) {
      console.log(details1);
      setDetails(details1);
    }
  }, [details1]);
  const handleChange = (e) => {
    e.preventDefault();

    const detailsKeys = Object.keys(details);

    detailsKeys.forEach((value) => {
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
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsgKeys = Object.keys(errorMsg);

    errorMsgKeys.forEach((value) => {
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
      details.bDob &&
      details.gDob &&
      details.gFather &&
      details.bFather &&
      details.doMarriage &&
      details.county &&
      details.district &&
      details.poMarriage &&
      details.zipCode
    ) {
      if (
        details.noRegistrarOffice ||
        details.noChurch ||
        details.noMosque ||
        details.noTemple
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
              editWithKey(details, id);
              showSuccessAlert();
            }
          } else if (
            month > Number(details.bDob.split("-")[1]) &&
            gAgeVerified
          ) {
            editWithKey(details, id);
            showSuccessAlert();
          }
        } else if (year > Number(details.bDob.split("-")[0]) && gAgeVerified) {
          editWithKey(details, id);
          showSuccessAlert();
        }
      }
    }
  };
  return (
    <>
      <Container fluid>
        <Form onSubmit={handleSubmit}>
          <Row>
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

            <NumberInput
              id="gNumber"
              labelText="Groom Mobile Number"
              onChange={handleChange}
              value={details.gNumber}
              hasError={errorMsg.gNumber}
            />
            <NumberInput
              id="bNumber"
              labelText="Bride Mobile Number"
              onChange={handleChange}
              value={details.bNumber}
              hasError={errorMsg.gNumber}
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

            <DateInput
              id="doMarriage"
              labelText="Date Of Marriage"
              onChange={handleChange}
              value={details.doMarriage}
              hasError={errorMsg.doMarriage}
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
                labelText="Registrar Office Name"
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
                labelText="Church Name"
                onChange={handleChange}
                value={details.noChurch}
                hasError={errorMsg.noChurch}
              >
                <option value="">Select Church</option>
                <option> Church</option>
              </FormSelect>
            )}
            {details.poMarriage === "Mosque" && (
              <FormSelect
                id="noMosque"
                labelText="Mosque Name"
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
                labelText="Name Of Temple"
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
              <option>county</option>
            </FormSelect>
            <FormSelect
              id="district"
              labelText="District"
              onChange={handleChange}
              value={details.district}
              hasError={errorMsg.district}
            >
              <option value="">Select District</option>
              <option>District</option>
            </FormSelect>
            <NumberInput
              id="zipCode"
              labelText="Zip Code"
              onChange={handleChange}
              value={details.zipCode}
              hasError={errorMsg.zipCode}
            />
          </Row>
          <Row className="justify-content-center">
            <Button className="bg-gray text-white" size="md">
              <i className="fa-regular fa-floppy-disk text-white mr-1"></i>Save
            </Button>
            <Button className="bg-usrb text-white" size="md">
              <i className="fa-regular fa-paper-plane mr-1"></i> Submit
            </Button>

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
