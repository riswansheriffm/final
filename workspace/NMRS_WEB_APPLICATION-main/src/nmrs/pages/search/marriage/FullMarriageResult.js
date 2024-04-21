import { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";

import { useDataWithId } from "../../../hooks/useDataWithId";

import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";

import styles from "../styles.module.css";
import useDate from "nmrs/hooks/useDate";

export default function FullMarriageResult({ id = 30 }) {
  const formatDate = useDate();
  const dbName = "civilmarriage";

  const [step, setStep] = useState(1);
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem(id))?.fav || false
  );

  const details = useDataWithId({ dbName, id });

  return (
    <>
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
          <Col>
            <Row>
              <Col>
                <h2
                  role="button"
                  onClick={() => setStep(2)}
                  className={
                    step === 2
                      ? "border-bottom-1 text-center pb-2"
                      : "text-center pb-2"
                  }
                >
                  Other Information
                </h2>
              </Col>
              <Col
                xs="1"
                onClick={() => {
                  setFav(!fav);
                  if (!fav) {
                    localStorage.setItem(
                      id,
                      JSON.stringify({
                        ...details,
                        searchOn: "marriage",
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
          </Col>
        </Row>
        <Card className="p-3 ">
          <div className="border-3">
            {step === 1 && (
              <Row>
                <Col md="6" lg="3">
                  <span>
                    <h4>Groom Name </h4>
                    <p>{details?.gName}</p>
                  </span>
                </Col>

                <Col md="6" lg="3">
                  <span>
                    <h4>Bride Name </h4>
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
                    <h4>Groom's Marital Status At Time Of Marriage</h4>
                    <p>{details?.gMaritalStatus}</p>
                  </span>
                </Col>
                <Col md="6" lg="3">
                  <span>
                    <h4>Bride's Marital Status At Time Of Marriage</h4>
                    <p>{details?.bMaritalStatus}</p>
                  </span>
                </Col>
                <Col md="6" lg="3">
                  <span>
                    <h4>Groom Nationality</h4>
                    <p>{details?.gNationality}</p>
                  </span>
                </Col>
                <Col md="6" lg="3">
                  <span>
                    <h4>Bride Nationality</h4>
                    <p>{details?.bNationality}</p>
                  </span>
                </Col>
                <Col md="6" lg="3">
                  <span>
                    <h4>Groom's Residence</h4>
                    <p>{details?.gAddress}</p>
                  </span>
                </Col>
                <Col md="6" lg="3">
                  <span>
                    <h4>Bride's Residence</h4>
                    <p>{details?.bAddress}</p>
                  </span>
                </Col>
                <Col md="6" lg="3">
                  <span>
                    <h4>Groom's Occupation</h4>
                    <p>{details?.gOccupation}</p>
                  </span>
                </Col>
                <Col md="6" lg="3">
                  <span>
                    <h4>Bride's Occupation</h4>
                    <p>{details?.bOccupation}</p>
                  </span>
                </Col>
              </Row>
            )}
            {step === 2 && (
              <Row>
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
                    <h4>Groom's Father's Occupation</h4>
                    <p>{details?.gFatherOccupation}</p>
                  </span>
                </Col>

                <Col md="6" lg="3">
                  <span>
                    <h4>Bride's Father's Occupation</h4>
                    <p>{details?.bFatherOccupation}</p>
                  </span>
                </Col>

                <Col md="6" lg="3">
                  <span>
                    <h4>Name Of Witness 1</h4>
                    <p>{details?.witness1}</p>
                  </span>
                </Col>

                <Col md="6" lg="3">
                  <span>
                    <h4>Name Of Witness 2</h4>
                    <p>{details?.witness2}</p>
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
                    <h4>Name Of Celebrant</h4>
                    <p>{details?.celebrant}</p>
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
            )}
          </div>
        </Card>
      </Container>
    </>
  );
}
