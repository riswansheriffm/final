import useIndexedDB from "Hooks/useIndexedDB";
import TextInput from "components/Forms/TextInput";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Row } from "reactstrap";

export default function Create() {
  const [details, setDetails] = useState({ question: "", answer: "" });
  const [errorMsg, setErrorMsg] = useState({ question: "", answer: "" });

  const location = useLocation();
  const routeName = location.pathname.split("/")[1];

  const dbName = routeName;

  const addData = useIndexedDB();

  const handleChange = (e) => {
    e.preventDefault();

    setDetails({ ...details, [e.target.name]: e.target.value });
    setErrorMsg({ ...errorMsg, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.question) {
      setErrorMsg({ ...errorMsg, question: "error" });
    } else if (!details.answer) {
      setErrorMsg({ ...errorMsg, answer: "error" });
    }
    if (details.question && details.answer) {
      addData({ details, dbName });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <TextInput
          sm="12"
          md="6"
          id="question"
          labelText="Question"
          value={details.question}
          onChange={handleChange}
          hasError={errorMsg.question}
        />
        <TextInput
          sm="12"
          md="6"
          id="answer"
          labelText="Answer"
          value={details.answer}
          onChange={handleChange}
          hasError={errorMsg.answer}
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
