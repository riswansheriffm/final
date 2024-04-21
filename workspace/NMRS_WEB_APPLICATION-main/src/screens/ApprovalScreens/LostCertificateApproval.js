import useDataWithId from "Hooks/useDataWithId";
import FormFileInput from "components/Forms/FormFileInput";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "reactstrap";

export default function LostCertificateApproval({ id, status, updateStatus }) {
  const dbName = "lostcertificateretrieval";
  const details = useDataWithId({ dbName, id });
  const [getImage, setImage] = useState();
  const [file, setFiles] = useState();
  const handleChange = (e) => {
    setImage(e.target.value);
    const reader = new FileReader();
    reader.onload = function (e) {
      setFiles(e.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  return (
    <Container fluid>
      <Card className="p-3 ">
        <Row>
          {" "}
          <Col md="6" lg="3">
            <span>
              <h4>Groom Name :</h4>
              <p>{details?.gName}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Bride Name :</h4>
              <p>{details?.bName}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Groom Mobile Number</h4>
              <p>{details?.gNumber}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Bride Mobile Number</h4>
              <p>{details?.bNumber}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Groom Date Of Birth</h4>
              <p>{details?.gDob}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Bride Date Of Birth</h4>
              <p>{details?.bDob}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Groom's Father Name</h4>
              <p>{details?.gFather}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Bride's Father Name</h4>
              <p>{details?.bFather}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Date Of Marriage</h4>
              <p>{details?.doMarriage}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Place Of Marriage</h4>
              <p>{details?.poMarriage}</p>
            </span>
          </Col>
          {details?.poMarriage === "Registrar Office" && (
            <Col md="6" lg="3">
              <span>
                <h4>Name Of Registrar Office</h4>
                <p>{details?.noRegistrarOffice}</p>
              </span>
            </Col>
          )}
          {details?.poMarriage === "Church" && (
            <Col md="6" lg="3">
              <span>
                <h4>Name Of Church</h4>
                <p>{details?.noChurch}</p>
              </span>
            </Col>
          )}
          {details?.poMarriage === "Mosque" && (
            <Col md="6" lg="3">
              <span>
                <h4>Name Of Mosque</h4>
                <p>{details?.noMosque}</p>
              </span>
            </Col>
          )}
          {details?.poMarriage === "Temple" && (
            <Col md="6" lg="3">
              <span>
                <h4>Name Of Temple</h4>
                <p>{details?.noTemple}</p>
              </span>
            </Col>
          )}
          <Col md="6" lg="3">
            <span>
              <h4>County</h4>
              <p>{details?.county}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>District</h4>
              <p>{details?.district}</p>
            </span>
          </Col>
          <Col md="6" lg="3">
            <span>
              <h4>Zip Code</h4>
              <p>{details?.zipCode}</p>
            </span>
          </Col>
        </Row>

        {status !== "Rejected" && status !== "Approved" && (
          <Row className="justify-content-center px-3 align-items-center">
            <FormFileInput
              src={file}
              labelText="Upload Certificate"
              id="bHDC"
              onChange={handleChange}
              value={getImage}
            />
            {file && (
              <Col lg="3" md="6">
                <Button
                  size="md"
                  className="bg-usrb text-white"
                  onClick={() => {
                    updateStatus("Approved", id, getImage);
                  }}
                >
                  Approve
                </Button>
              </Col>
            )}
            {status !== "On Hold" && (
              <Col lg="3" md="6">
                <Button
                  size="md"
                  className="bg-warning text-white"
                  onClick={() => {
                    updateStatus("On Hold", id);
                  }}
                >
                  On Hold
                </Button>
              </Col>
            )}
            <Col lg="3" md="6">
              <Button
                size="md"
                className="bg-danger text-white"
                onClick={() => {
                  updateStatus("Rejected", id);
                }}
              >
                Reject
              </Button>
            </Col>
          </Row>
        )}
      </Card>
    </Container>
  );
}
