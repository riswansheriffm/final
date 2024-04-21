import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Row, Col } from "reactstrap";
import { useAddData } from "../../../hooks/useAddData";
import TextInput from "nmrs/components/forms/TextInput";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Create_church({ setModal }) {
  const [details, setDetails] = useState({
    churchName: "",
    denomination: "",
    county: "",
    district: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    churchName: "",
    denomination: "",
    county: "",
    district: "",
  });

  const location = useLocation();
  const routeName = location.pathname.split("/")[2];

  const dbName = routeName;

  const addData = useAddData();

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Church Details Added Successfully",
      confirmButtonText: "OK",
    }).then(() => setModal(0));
  };

  const handleChange = (e) => {
    e.preventDefault();

    setDetails({ ...details, [e.target.name]: e.target.value });
    setErrorMsg({ ...errorMsg, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !details.churchName &&
      !details.denomination &&
      !details.county &&
      !details.district
    ) {
      toast.error(`Please Fill All The Fields`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.churchName) {
      toast.error(`Please Enter The Name of Church`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.denomination) {
      toast.error(`Please Enter The Denomination`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.county) {
      toast.error(`Please Enter The County`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.district) {
      toast.error(`Please Enter The District`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else {
      addData({ details, dbName });
      showSuccessAlert();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Church Details</h2>
      <Row>
        <TextInput
          sm="12"
          md="12"
          id="churchName"
          labelText="Name of Church"
          value={details.churchName}
          onChange={handleChange}
          hasError={errorMsg.churchName}
        />

        <TextInput
          sm="12"
          md="12"
          id="denomination"
          labelText="Denomination"
          value={details.denomination}
          onChange={handleChange}
          hasError={errorMsg.denomination}
        />

        <TextInput
          sm="12"
          md="12"
          id="county"
          labelText="County"
          value={details.county}
          onChange={handleChange}
          hasError={errorMsg.county}
        />

        <TextInput
          sm="12"
          md="12"
          id="district"
          labelText="District"
          value={details.district}
          onChange={handleChange}
          hasError={errorMsg.district}
        />
      </Row>
      <Row className="justify-content-center">
        <Button type="submit" className="bg-usrb text-white" size="md">
          Submit
        </Button>
      </Row>
    </Form>
  );
}
