import { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";

export default function FullDivorceResult({ id = 30 }) {
  const dbName = "civilmarriage";
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem(id))?.fav || false
  );
  const details = {
    hName: "Joseph",
    wName: "Ruth",
    rDivorce: "Cruelty",
    noChildren: "1",
    coChildren: "Mother",
    hNumber: "+256123456789",
    wNumber: "+256987654321",
    hDob: "09-08-1989",
    wDob: "12-06-1990",
    hNationality: "Ugandan",
    wNationality: "Ugandan",
    hAddress: "SomeWhere",
    wAddress: "SomeWhere",
  };

  return (
    <>
      <Container fluid>
        <Card className="p-3 ">
          <div className="border-3">
            <Row>
              <Col md="6" lg="3">
                <span>
                  <h4>Husband Name</h4>
                  <p>{details?.hName}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Wife Name</h4>
                  <p>{details?.wName}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Grounds for Divorce</h4>
                  <p>{details?.rDivorce}</p>
                </span>
              </Col>

              <Col md="6" lg="3">
                <span>
                  <h4>Number Of Children Couple Have</h4>
                  <p>{details?.noChildren}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Children Are In Custody Of</h4>
                  <p>{details?.coChildren}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Husband Mobile Number</h4>
                  <p>{details?.hNumber}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Wife Mobile Number</h4>
                  <p>{details?.wNumber}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Husband Date Of Birth</h4>
                  <p>{details?.hDob}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Wife Date Of Birth</h4>
                  <p>{details?.wDob}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Husband Nationality</h4>
                  <p>{details?.hNationality}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Wife Nationality</h4>
                  <p>{details?.wNationality}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Husband's Residence</h4>
                  <p>{details?.hAddress}</p>
                </span>
              </Col>
              <Col md="6" lg="3">
                <span>
                  <h4>Wife's Residence</h4>
                  <p>{details?.wAddress}</p>
                </span>
              </Col>
            </Row>
          </div>
        </Card>
      </Container>
    </>
  );
}
