import { useEffect, useState } from "react";
import { Button, Container, Col, Row, Card } from "reactstrap";
import FileView from "./FileView";

import useDataWithId from "Hooks/useDataWithId";

export default function LicenseRenewalApproval({ id, updateStatus, status }) {
  const dbName = "LicenseRenewal";
  const details = useDataWithId({ dbName, id });
  const [files, setFiles] = useState({});

  useEffect(() => {
    const detailsKeys = Object.keys(details || {});
    detailsKeys.forEach((value, index) => {
      if (index === 4 || index === 5) {
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
      <Card className="p-3 ">
        <div className="border-3">
          <Row>
            <Col md="6" lg="3">
              <span>
                <h4>Applicant Name</h4>
                <p>{details?.aName}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Mobile Number</h4>
                <p>{details?.aNumber}</p>
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
                <h4>Church License Number</h4>
                <p>{details?.cLNo}</p>
              </span>
            </Col>

            <FileView
              labelText="Exipred License Copy "
              src={files?.ExLicense}
            />

            <FileView labelText="Inspection Report" src={files?.InsReport} />

            <Col md="6" lg="3">
              <span>
                <h4>Church Address</h4>
                <p>{details?.cAddress}</p>
              </span>
            </Col>

            <Col md="6" lg="3">
              <span>
                <h4>Country</h4>
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
