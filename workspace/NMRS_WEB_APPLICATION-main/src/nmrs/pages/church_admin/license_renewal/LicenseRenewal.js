import { useRef, useState } from "react";
import { Button, Container, Form, Row } from "reactstrap";
import TextInput from "../../../components/forms/TextInput";
import NumberInput from "../../../components/forms/NumberInput";
import FormFileInput from "../../../components/forms/FormFileInput";
import FormSelect from "../../../components/forms/FormSelect";
import { useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAddData } from "nmrs/hooks/useAddData";
import useDate from "Hooks/useDate";

export default function LicenseRenewal() {
  const addData = useAddData();
  const formatDate = useDate();
  const location = useLocation();
  const routeName = location.pathname.split("/")[1] || "";
  const dbName = routeName;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aName: "",
    aNumber: "",
    cName: "",
    cLNo: "",
    ExLicense: "",
    InsReport: "",
    cAddress: "",
    county: "",
    district: "",
    zipCode: "",
    doA: formatDate,
    status: "Applied",
  });
  const [errorMsg, setErrorMsg] = useState({
    aName: "",
    aNumber: "",
    cName: "",
    cLNo: "",
    ExLicense: "",
    InsReport: "",
    cAddress: "",
    county: "",
    district: "",
    zipCode: "",
  });
  const [files, setFiles] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value, type, files } = e.target;
    if (type === "file") {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFiles((prevFiles) => ({
          ...prevFiles,
          [id]: e.target.result,
        }));
      };
      reader.readAsDataURL(files[0]);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.aName) {
      toast.error(`Please Enter Applicant Name`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.aNumber) {
      toast.error(`Please Enter Mobile Number`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.cName) {
      toast.error(`Please Enter Church Name`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.cLNo) {
      toast.error(`Please Enter Church License Number`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.ExLicense) {
      toast.error(`Please Attach Exipred License Copy `, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.InsReport) {
      toast.error(`Please Attach Inspection Report `, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.cAddress) {
      toast.error(`Please Enter Church Address`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.county) {
      toast.error(`Please select the Country`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.district) {
      toast.error(`Please select the District`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!formData.zipCode) {
      toast.error(`Please select the Zip Code`, {
        theme: "colored",
        toastId: "error-toast",
      });
    }

    const hasErrors = Object.values(errorMsg).some(
      (errorMsg) => errorMsg !== ""
    );

    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!hasErrors && allFieldsFilled) {
      localStorage.setItem("formData", JSON.stringify(formData));
      let details = formData;
      addData({ details, dbName });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your license renewal request was successful.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${routeName}`);
        }
      });
    } else {
      // Show error toast if there are any errors
      toast.error(`Please fill in all fields correctly.`, {
        theme: "colored",
        toastId: "error-toast",
      });
    }
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row>
          <TextInput
            id="aName"
            labelText="Applicant Name"
            value={formData.aName}
            onChange={handleChange}
            hasError={errorMsg.aName}
          />
          <TextInput
            id="aNumber"
            labelText="Mobile Number"
            value={formData.aNumber}
            onChange={handleChange}
            hasError={errorMsg.aNumber}
          />
          <TextInput
            id="cName"
            labelText="Church Name"
            value={formData.cName}
            onChange={handleChange}
            hasError={errorMsg.cName}
          />
          <NumberInput
            id="cLNo"
            labelText="Church License Number"
            value={formData.cLNo}
            onChange={handleChange}
            hasError={errorMsg.cLNo}
          />
          <FormFileInput
            labelText="Exipred License Copy "
            id="ExLicense"
            src={files.ExLicense}
            hasError={errorMsg.ExLicense}
            value={formData.ExLicense}
            onChange={handleChange}
          />

          <FormFileInput
            labelText="Inspection Report"
            id="InsReport"
            src={files.InsReport}
            hasError={errorMsg.InsReport}
            value={formData.InsReport}
            onChange={handleChange}
          />
          <TextInput
            id="cAddress"
            labelText="Church Address"
            value={formData.cAddress}
            onChange={handleChange}
            hasError={errorMsg.cAddress}
          />
          <FormSelect
            id="county"
            labelText="County"
            value={formData.county}
            onChange={handleChange}
            hasError={errorMsg.county}
          >
            <option value="">Select Country</option>
            <option>Country</option>
          </FormSelect>
          <FormSelect
            id="district"
            labelText="District"
            value={formData.district}
            onChange={handleChange}
            hasError={errorMsg.district}
          >
            <option value="">Select District</option>
            <option>District</option>
          </FormSelect>
          <NumberInput
            id="zipCode"
            labelText="Zip Code"
            onChange={handleChange}
            value={formData.zipCode}
            hasError={errorMsg.zipCode}
          />
        </Row>

        <Row className="justify-content-center">
          <Button className="bg-primary text-white" size="md">
            <i className="fa-regular fa-floppy-disk text-white mr-1"></i>Save
          </Button>
          <Button
            className="bg-success text-white btn btn-secondary btn-md "
            type="submit"
          >
            <i className="fa-regular fa-paper-plane mr-1"></i>
            Submit
          </Button>

          <Button className="bg-danger text-white" size="md">
            <i className="fa-solid fa-clock-rotate-left text-white mr-1"></i>
            Reset
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
