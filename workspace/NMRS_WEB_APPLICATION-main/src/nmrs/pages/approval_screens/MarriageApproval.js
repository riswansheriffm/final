import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "reactstrap";
import FileView from "./FileView";
import { useDataWithId } from "../../hooks/useDataWithId";
import Swal from "sweetalert2";

export default function MarriageApproval({ id, status, updateStatus }) {
  const dbName = "civilmarriage";

  const [step, setStep] = useState(1);
  const details = useDataWithId({ dbName, id });
  const [files, setFiles] = useState();

  const Approve = () => {
    Swal.fire({
      icon: "success",
      title: "Approved!",
      text: "Approved Successfully",
      confirmButtonText: "OK",
    });
  };
  const onHold = () => {
    Swal.fire({
      icon: "success",
      title: "On Hold",
      text: "Application Is On Hold",
      confirmButtonText: "OK",
    });
  };
  const Rejected = () => {
    Swal.fire({
      icon: "success",
      title: "Rejected!",
      text: "Application Is Rejected",
      confirmButtonText: "OK",
    });
  };
  useEffect(() => {
    const detailsKeys = Object.keys(details || {});
    detailsKeys.forEach((value, index) => {
      if (index >= 29) {
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
          <Col role="button" onClick={() => setStep(2)}>
            <h2
              className={
                step === 2
                  ? "border-bottom-1 text-center pb-2"
                  : "text-center pb-2"
              }
            >
              Other Information
            </h2>
          </Col>
          <Col role="button" onClick={() => setStep(3)}>
            <h2
              className={
                step === 3
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
                    <h4>Groom Marital Status</h4>
                    <p>{details?.gMaritalStatus}</p>
                  </span>
                </Col>
                <Col md="6" lg="3">
                  <span>
                    <h4>Bride Marital Status</h4>
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

            {step === 3 && (
              <Row>
                {(details.gNationality === "Ugandan" ||
                  details.gNationality === "Other") && (
                  <FileView src={files?.gId} labelText="Groom National Id" />
                )}

                {(details.bNationality === "Ugandan" ||
                  details.bNationality === "Other") && (
                  <FileView src={files?.bId} labelText="Bride National Id" />
                )}

                {details.gNationality === "Ugandan" && (
                  <FileView
                    src={files?.gLC1}
                    labelText="Groom's LC1 Certificate"
                  />
                )}
                {details.bNationality === "Ugandan" && (
                  <FileView
                    src={files?.bLC1}
                    labelText="Bride's LC1 Certificate"
                  />
                )}

                <FileView
                  src={files?.gPhoto}
                  labelText="Groom's Passport Size Photo"
                />
                <FileView
                  src={files?.bPhoto}
                  labelText="Bride's Passport Size Photo"
                />
                <FileView src={files?.w1Id} labelText="Witness 1 Valid Id" />
                <FileView src={files?.w2Id} labelText="Witness 2 Valid Id" />
                {details.gMaritalStatus === "Divorced" && (
                  <FileView
                    src={files?.gDDA}
                    labelText="Groom's Divorce Decree Associate"
                  />
                )}
                {details.bMaritalStatus === "Divorced" && (
                  <FileView
                    src={files?.bDDA}
                    labelText="Bride's Divorce Decree Associate"
                  />
                )}
                {details.gMaritalStatus === "Widower" && (
                  <FileView
                    src={files?.gWDC}
                    labelText="Groom's Wife's Death Certificate "
                  />
                )}
                {details.bMaritalStatus === "Widow" && (
                  <FileView
                    src={files?.bHDC}
                    labelText="Bride's Husband's Death Certificate"
                  />
                )}
                {details.gMaritalStatus === "Single" && (
                  <FileView
                    src={files?.gSSL}
                    labelText="Groom's Single Status Letter"
                  />
                )}

                {details.bMaritalStatus === "Single" && (
                  <FileView
                    src={files?.bSSL}
                    labelText="Bride's Single Status Letter"
                  />
                )}

                {(details.gNationality === "Refugee" ||
                  details.gNationality === "Other") && (
                  <FileView src={files?.gVisa} labelText="Groom's Valid Visa" />
                )}
                {(details.bNationality === "Refugee" ||
                  details.bNationality === "Other") && (
                  <FileView src={files?.bVisa} labelText="Bride's Valid Visa" />
                )}

                <FileView
                  src={files?.rmAffidavits}
                  labelText="Registered Marriage Affidavits"
                />
              </Row>
            )}
          </div>
          {status !== "Rejected" && status !== "Approved" && (
            <Row className="justify-content-center mt-3">
              <Button
                size="md"
                className="bg-success text-white"
                onClick={(e) => {
                  e.preventDefault();
                  Approve();
                  updateStatus("Approved", id);
                }}
              >
                Approve
              </Button>
              {status !== "On Hold" && (
                <Button
                  size="md"
                  className="bg-warning text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    onHold();
                    updateStatus("On Hold", id);
                  }}
                >
                  On Hold
                </Button>
              )}
              <Button
                size="md"
                className="bg-danger text-white"
                onClick={(e) => {
                  e.preventDefault();
                  Rejected();
                  updateStatus("Rejected", id);
                }}
              >
                Reject
              </Button>
            </Row>
          )}
        </Card>
      </Container>
    </>
  );
}
