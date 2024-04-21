import NumberInput from "nmrs/components/forms/NumberInput";
import TelInput from "nmrs/components/forms/TelInput";
import TextArea from "nmrs/components/forms/TextArea";
import TextInput from "nmrs/components/forms/TextInput";
import { useAddData } from "nmrs/hooks/useAddData";
import { useDataWithId } from "nmrs/hooks/useDataWithId";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Row } from "reactstrap";
import Swal from "sweetalert2";

export default function PaymentEdit({ setModal, id, editWithId }) {
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
      text: "Question And Answer Added Successfully",
      confirmButtonText: "OK",
    }).then(() => setModal(0));
  };
  const handleChange = (e) => {
    e.preventDefault();

    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.form && !details.poUgandan && !details.poOthers) {
      toast.error(`Please Fill All The Fields`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.form) {
      toast.error(`Please Enter The Form Name`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.poUgandan) {
      toast.error(`Please Enter The Price For Ugandan`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.poOthers) {
      toast.error(`Please Enter The Price For Others`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else {
      editWithId(details, id);
      showSuccessAlert();
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit</h2>
      <Row>
        <TextInput
          id="form"
          onChange={handleChange}
          value={details?.form}
          md="12"
          labelText="Form Name"
        />
        <NumberInput
          id="poUgandan"
          onChange={handleChange}
          value={details?.poUgandan}
          md="12"
          labelText="Price For Ugandan"
        />
        <NumberInput
          id="poOthers"
          onChange={handleChange}
          value={details?.poOthers}
          md="12"
          labelText="Price For Others"
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
