import React, { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";

import { useDataWithId } from "../../../hooks/useDataWithId";
import useDate from "nmrs/hooks/useDate";
import { toast } from "react-toastify";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";

import styles from "../styles.module.css";

export default function FullSSLResult({ id = 1 }) {
  const dbName = "singlestatusletter";
  const formatDate = useDate();
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem(id))?.fav || false
  );
  const details = useDataWithId({ dbName, id });

  return (
    <Container fluid>
      <Row className="justify-content-end">
        <Col
          xs="1"
          onClick={() => {
            setFav(!fav);
            if (!fav) {
              localStorage.setItem(
                id,
                JSON.stringify({
                  ...details,
                  searchOn: "SINGLE STATUS LETTER",
                  dateOfSearch: formatDate,
                  fav: true,
                })
              );
              toast.success("Added To Favorite", {
                theme: "colored",
                hideProgressBar: false,
              });
            }
            if (fav) {
              localStorage.removeItem(id);

              toast.error("Removed From Favorite", {
                theme: "colored",
                hideProgressBar: false,
              });
            }
          }}
        >
          {fav ? (
            <IoMdStar
              role="button"
              className={styles.iconSize + " text-yellow"}
            />
          ) : (
            <IoIosStarOutline role="button" className={styles.iconSize} />
          )}
        </Col>
      </Row>
      <Card className="p-3 ">
        <div className="border-3">
          <Row>
            <Col md="6" lg="3">
              <span>
                <h4> Name</h4>
                <p>{details?.aName}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4> Mobile Number</h4>
                <p>{details?.aNumber}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4> Date Of Birth</h4>
                <p>{details?.aDob.split("-").reverse().join("-")}</p>
              </span>
            </Col>

            <Col md="6" lg="3">
              <span>
                <h4> Father's Name</h4>
                <p>{details?.aFName}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4> Mother's Name</h4>
                <p>{details?.aMName}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4>Expiry Date</h4>
                <p>{"12-05-2024"}</p>
              </span>
            </Col>
            <Col md="6" lg="3">
              <span>
                <h4> Address</h4>
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
        </div>
      </Card>
    </Container>
  );
}
