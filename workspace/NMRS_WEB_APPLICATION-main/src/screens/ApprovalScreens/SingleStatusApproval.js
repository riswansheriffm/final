import useDataWithId from "Hooks/useDataWithId";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "reactstrap";
import FileView from "./FileView";

export default function SingleStatusApproval({ id, updateStatus, status }) {
  const dbName = "singlestatusletter";

  const [step, setStep] = useState(1);
  const details = useDataWithId({ dbName, id });
  const [files, setFiles] = useState();

  useEffect(() => {
    const detailsKeys = Object.keys(details || {});
    detailsKeys.forEach((value, index) => {
      if (index >= 8) {
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
  return (
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
          </h2>
        </Col>

        <Col role="button" onClick={() => setStep(2)}>
          <h2
            className={
              step === 2
                ? "border-bottom-1 text-center pb-2"
                : "text-center pb-2"
            }
          >
            Documents Needed
          </h2>
        </Col>
      </Row>
      <Card className="p-3 ">
        {step === 1 && (
          <Row>
            <Col md="6" lg="3">
              <span>
                <h4>Applicant Name</h4>
                <p>{details?.aName}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Applicant's Mobile Number</h4>
                <p>{details?.aNumber}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Applicant Date Of Birth</h4>
                <p>{details?.aDob}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Applicant's Father's Name</h4>
                <p>{details?.aFName}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Applicant's Mother's Name</h4>
                <p>{details?.aMName}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Applicant's Address</h4>
                <p>{details?.aAddress}</p>
              </span>
            </Col>

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
        )}
        {step === 2 && (
          <Row>
            <FileView src={files?.aId} labelText="Applicant's National Id" />
            <FileView src={files?.aLBC} labelText="Long Birth Certificate" />
            <FileView
              src={files?.aSDA}
              labelText="Statutory Declaration Of Applicant"
            />
            <FileView
              src={files?.aSDP}
              labelText="Statutory Declaration Of Parent"
            />
            <FileView
              src={files?.aLC1}
              labelText="LC1 ChairPerson Recommendation Letter"
            />
          </Row>
        )}
        {status !== "Rejected" && status !== "Approved" && (
          <Row className="justify-content-center mt-3">
            <Button
              size="md"
              className="bg-success text-white"
              onClick={() => {
                updateStatus("Approved", id);
              }}
            >
              Approve
            </Button>
            {status !== "On Hold" && (
              <Button
                size="md"
                className="bg-warning text-white"
                onClick={() => {
                  updateStatus("On Hold", id);
                }}
              >
                On Hold
              </Button>
            )}
            <Button
              size="md"
              className="bg-danger text-white"
              onClick={() => {
                updateStatus("Rejected", id);
              }}
            >
              Reject
            </Button>
          </Row>
        )}
      </Card>
    </Container>
  );
}
