import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Row } from "reactstrap";
import { useAddData } from "../../../hooks/useAddData";

import TextArea from "nmrs/components/forms/TextArea";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Create({ setModal }) {
  const [details, setDetails] = useState({ question: "", answer: "" });
  const [errorMsg, setErrorMsg] = useState({ question: "", answer: "" });

  const location = useLocation();
  const routeName = location.pathname.split("/")[2];

  const dbName = routeName;

  const addData = useAddData();

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
    setErrorMsg({ ...errorMsg, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.question && !details.answer) {
      toast.error(`Please Fill All The Fields`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.question) {
      toast.error(`Please Enter The Question`, {
        theme: "colored",
        toastId: "error-toast",
      });
    } else if (!details.answer) {
      toast.error(`Please Enter The Answer`, {
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
      <h2>Add a Question Along With Answer</h2>
      <Row>
        <TextArea
          sm="12"
          md="12"
          id="question"
          labelText="Question"
          value={details.question}
          onChange={handleChange}
        />
        <TextArea
          sm="12"
          md="12"
          id="answer"
          labelText="Answer"
          value={details.answer}
          onChange={handleChange}
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
