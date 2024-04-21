import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Row } from "reactstrap";

import TextInput from "nmrs/components/forms/TextInput";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// import { useEditWithId } from "nmrs/hooks/useEditWithId";
import { useDataWithId } from "nmrs/hooks/useDataWithId";

export default function View_church({ setModal, id, editWithId }) {
  const location = useLocation();
  const routeName = location.pathname.split("/")[2];

  const dbName = routeName;

  const detail = useDataWithId({ dbName, id });

  const [details, setDetails] = useState();
  useEffect(() => {
    setDetails(detail);
  }, [detail]);

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Church Details Edited Successfully",
      confirmButtonText: "OK",
    }).then(() => setModal(0));
  };

  const handleChange = (e) => {
    e.preventDefault();

    setDetails({ ...details, [e.target.name]: e.target.value });
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
      editWithId(details,id);
      showSuccessAlert();
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2>View Church Details</h2>
      <Row>
        <TextInput
          sm="12"
          md="12"
          id="churchName"
          labelText="Name of Church"
          value={details?.churchName}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          sm="12"
          md="12"
          id="denomination"
          labelText="Denomination"
          value={details?.denomination}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          sm="12"
          md="12"
          id="county"
          labelText="County"
          value={details?.county}
          onChange={handleChange}
          disabled={true}
        />
        <TextInput
          sm="12"
          md="12"
          id="district"
          labelText="District"
          value={details?.district}
          onChange={handleChange}
          disabled={true}
        />
      </Row>
      
    </Form>
  );
}
