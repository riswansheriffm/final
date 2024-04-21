import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import styles from "./styles.module.css";

import user from "../../themes/User.jpg";
import { useState } from "react";
import TextInput from "nmrs/components/forms/TextInput";
import TelInput from "nmrs/components/forms/TelInput";
import FormSelect from "nmrs/components/forms/FormSelect";
import DateInput from "nmrs/components/forms/DateInput";

import { FaPen } from "react-icons/fa";

import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export default function Profile() {
  const [details, setDetails] = useState({
    image: "",
    name: "Anith Christopher",
    email: "anith@gmail.com",
    number: "+256123456789",
    gender: "Male",
    dob: "2000-04-11",
    role: "Registrar",
  });
  const [file, setFile] = useState();
  const [disabled, setDisabled] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    const detailsKeys = Object.keys(details);

    detailsKeys.forEach((value) => {
      if (e.target.type !== "file") {
        if (e.target.name === value) {
          setDetails((elem) => {
            return { ...elem, [value]: e.target.value };
          });
        }
      } else {
        if (e.target.name === value) {
          if (!e.target.value) return;

          const reader = new FileReader();
          reader.onload = function (e) {
            setFile(e.target.result);
          };

          reader.readAsDataURL(e.target.files[0]);
          setDetails((elem) => {
            return { ...elem, [value]: e.target.files[0] };
          });
        }
      }
    });
  };

  return (
    <>
      <Container className="" fluid>
        <Row>
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row className="justify-content-center align-items-end mb-3">
                      <Col xs="12">
                        <div className={styles.imageCard}>
                          <img
                            alt="..."
                            src={file || user}
                            className={styles.imageDisplay}
                          />
                          {details.role !== "citizen" && (
                            <h2>{details.role}</h2>
                          )}

                          <Input
                            type="file"
                            onChange={handleChange}
                            id="image"
                            name="image"
                            className={styles.customInput}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                      <TextInput
                        id="name"
                        labelText="Name"
                        md="8"
                        sm="8"
                        value={details?.name}
                        onChange={handleChange}
                        disabled={disabled !== 1}
                      />
                      {disabled !== 1 ? (
                        <FaPen onClick={() => setDisabled(1)} />
                      ) : (
                        <>
                          <FaCheck
                            className="text-lg mr-2"
                            onClick={() => setDisabled(0)}
                          />
                          <ImCross onClick={() => setDisabled(0)} />
                        </>
                      )}
                      <TextInput
                        labelText="Email"
                        id="email"
                        md="8"
                        sm="8"
                        value={details?.email}
                        onChange={handleChange}
                        disabled={disabled !== 2}
                      />
                      {disabled !== 2 ? (
                        <FaPen onClick={() => setDisabled(2)} />
                      ) : (
                        <>
                          <FaCheck
                            className="text-lg mr-2"
                            onClick={() => setDisabled(0)}
                          />
                          <ImCross onClick={() => setDisabled(0)} />
                        </>
                      )}
                      <TelInput
                        labelText="Mobile Number"
                        id="number"
                        md="8"
                        sm="8"
                        value={details?.number}
                        onChange={handleChange}
                        disabled={disabled !== 3}
                      />
                      {disabled !== 3 ? (
                        <FaPen onClick={() => setDisabled(3)} />
                      ) : (
                        <>
                          <FaCheck
                            className="text-lg mr-2"
                            onClick={() => setDisabled(0)}
                          />
                          <ImCross onClick={() => setDisabled(0)} />
                        </>
                      )}

                      <FormSelect
                        labelText="Gender"
                        id="gender"
                        md="8"
                        sm="8"
                        value={details?.gender}
                        onChange={handleChange}
                        disabled={disabled !== 4}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </FormSelect>
                      {disabled !== 4 ? (
                        <FaPen onClick={() => setDisabled(4)} />
                      ) : (
                        <>
                          <FaCheck
                            className="text-lg mr-2"
                            onClick={() => setDisabled(0)}
                          />
                          <ImCross onClick={() => setDisabled(0)} />
                        </>
                      )}
                      <DateInput
                        labelText="Date Of Birth"
                        md="8"
                        sm="8"
                        id="dob"
                        disabled={disabled !== 5}
                        value={details?.dob}
                        onChange={handleChange}
                      />
                      {disabled !== 5 ? (
                        <FaPen onClick={() => setDisabled(5)} />
                      ) : (
                        <>
                          <FaCheck
                            className="text-lg mr-2"
                            onClick={() => setDisabled(0)}
                          />
                          <ImCross onClick={() => setDisabled(0)} />
                        </>
                      )}
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
