import useDate from "nmrs/hooks/useDate";
import { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";

export default function FullChurchResult({ id = 1 }) {
  const details = {
    cName: "Church Of Uganda",
    denomination: "Bapist",
    affiliation: "N/A",
    lPastor: "Joseph",
    vam: "Vision:To be a welcoming community transformed by Christ's love. Mission:To make disciples, nurture spiritual growth, reach out with compassion, and equip believers for ministry.",
    programs:
      "Sunday school, youth groups, outreach programs, and adult education classes.",
    address: "8MR7+79R, Kirinya-Bukasa Road",
    county: " Kampala",
    district: "Kampala",
    zipCode: "31210",
  };

  const formatDate = useDate();
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem(id))?.fav || false
  );
  return (
    <Container fluid>
      <Card className="p-3 ">
        <div className="border-3">
          <Row>
            <Col md="6" lg="3">
              <span>
                <h4>Church Name</h4>
                <p>{details?.cName}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Denomination</h4>
                <p>{details?.denomination}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Affiliation</h4>
                <p>{details?.affiliation}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Lead Pastor</h4>
                <p>{details?.lPastor}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Vision and Mission</h4>
                <p>{details?.vam}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Programs and Ministries</h4>
                <p>{details?.programs}</p>
              </span>
            </Col>

            <Col md="6" lg="3">
              <span>
                <h4>Address</h4>
                <p>{details?.address}</p>
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
        </div>
      </Card>
    </Container>
  );
}
