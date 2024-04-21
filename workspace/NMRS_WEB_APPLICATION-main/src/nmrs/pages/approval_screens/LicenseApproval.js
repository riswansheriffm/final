import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "reactstrap";
import FileView from "./FileView";
import { useDataWithId } from "../../hooks/useDataWithId";

export default function LicenseApproval({ id, updateStatus, status }) {
  const dbName = "churchlicensing";

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
        <div className="border-3">
          {step === 1 && (
            <Row>
              <Col md="6" lg="3">
                <span>
                  <h4>Church Official Name</h4>
                  <p>{details?.cOfficialName}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Mobile Number</h4>
                  <p>{details?.cOfficialNumber}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Church Name</h4>
                  <p>{details?.cName}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Denominaton</h4>
                  <p>{details?.denomination}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Celebrant Name</h4>
                  <p>{details?.celebrantName}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Church Address</h4>
                  <p>{details?.cAddress}</p>
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
              <FileView
                src={files?.detailsLetter}
                labelText="Letter Of Clear Details About The Church"
              />
              <FileView
                src={files?.rLetter}
                labelText="Recommendation Letter Of Mother Church"
              />
              <FileView src={files?.lEntity} labelText="Legal Entity" />
              <FileView
                src={files?.pLand}
                labelText="Proof Of Land OwnerShip"
              />
              <FileView src={files?.MCId} labelText="Marriage Celerabant Id" />
              <FileView
                src={files?.photo}
                labelText="Photos Of Church Interior And Exterior"
              />
              <FileView src={files?.report} labelText="Inspection Report" />
            </Row>
          )}
        </div>
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
        )}{" "}
      </Card>
    </Container>
  );
}
