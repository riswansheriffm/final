import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import useDeleteWithId from "Hooks/useDeleteWithId";
import useEditWithKey from "Hooks/useEditWithKey";
import useGetIndex from "Hooks/useGetIndex";

import PdfGenerator from "../../screens/EndUsers/CivilMarriage/PdfGenerator";

import SingleStausCertificate from "screens/EndUsers/SinglestatusView&Edit/singleStausCertificate";
import DocumentPreview from "components/Modal/DocumentPreview";
import PreviewModal from "components/Modal/PreviewModal";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, Container, Row, Table } from "reactstrap";
import LicensingAChurchEdit from "screens/ChurchAdmin/LicensingAChurch/LicensingAChurchEdit";
import LicensingAChurchView from "screens/ChurchAdmin/LicensingAChurch/LicensingAChurchView";

import CivilMarriageEdit from "screens/EndUsers/CivilMarriage/CivilMarriageEdit";
import SingleStatusEdit from "../../screens/EndUsers/SinglestatusView&Edit/singleStatusEdit";
import SingleStatusView from "screens/EndUsers/SinglestatusView&Edit/singleStatusView";
import MarriageView from "screens/EndUsers/CivilMarriage/MarriageView";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import LicensePdf from "screens/ChurchAdmin/LicensingAChurch/LicensePDF";
import RetrievalEdit from "screens/EndUsers/LostCertificateRetrieval/RetrievalEdit";
import RetrievalView from "screens/EndUsers/LostCertificateRetrieval/RetreivalView";
import FileDownloader from "screens/EndUsers/LostCertificateRetrieval/FileDownloader";

export default function StatusTracking({ btnText }) {
  const [mouse, handleMouse] = useState("0");
  const location = useLocation();

  const navigate = useNavigate();

  const routeName = location.pathname.split("/")[1];

  const dbName = routeName;

  const data = useGetIndex({ dbName });

  const [modal, setModal] = useState("");
  const [editedData, editWithKey] = useEditWithKey({ dbName });
  const deleteWithKey = useDeleteWithId({ dbName });

  const [status, setStatus] = useState([]);

  useEffect(() => {
    if (editedData) {
      setStatus(editedData);
    } else {
      setStatus(data);
    }
  }, [data, editedData]);

  const handleDelete = (id) => {
    const newData = status.filter((elem) => elem.id !== id);
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Once deleted, you won't be able to recover this data!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteWithKey(id);
        setStatus(newData);
        showSuccessAlert(id);
      }
    });
  };

  const showSuccessAlert = (id) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your action was successful.",
      confirmButtonText: "OK",
    });
  };

  return (
    <Container fluid className="overflow-hidden">
      {/* <Row>
        <Button
          onClick={() => navigate(location.pathname + "/form")}
          className="bg-usrb ml-3 text-white"
        >
          <span className="font-weight-bolder ">+</span> {btnText}
        </Button>
      </Row> */}
      {/* Table */}
      <Row className="mt-4">
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Status Of Applications</h3>
            </CardHeader>

            <Table
              className="align-items-center table-bordered table-hover "
              responsive
            >
              <thead className="thead-light">
                <tr>
                  <th className="text-center" scope="col">
                    S.No
                  </th>
                  <th className="text-center" scope="col">
                    Applicant Name
                  </th>
                  <th className="text-center" scope="col">
                    Date Of Application
                  </th>
                  <th className="text-center" scope="col">
                    Status
                  </th>
                  <th className="text-center" scope="col">
                    Certificate
                  </th>
                </tr>
              </thead>
              <tbody>
                {!status.length ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <h3>No Data Found</h3>
                    </td>
                  </tr>
                ) : (
                  status.map((elem, index) => {
                    // console.log(elem, "dbdb")
                    return (
                      <tr key={elem.id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          {elem.gName || elem.cOfficialName || elem.aName}
                        </td>
                        <td className="text-center">{elem.doA}</td>
                        <td>
                          <div
                            className={
                              (elem.status === "Applied" &&
                                "text-center text-white p-2 rounded-pill bg-usrb") ||
                              (elem.status === "Approved" &&
                                "text-center text-white p-2 rounded-pill bg-success") ||
                              (elem.status === "On Hold" &&
                                "text-center text-white p-2 rounded-pill bg-warning") ||
                              (elem.status === "Rejected" &&
                                "text-center text-white p-2 rounded-pill bg-danger")
                            }
                          >
                            {elem.status}
                          </div>
                        </td>
                        <td className=" align-items-center text-center">
                          {elem.status === "Rejected" && (
                            <p className="font-weight-bold">
                              Approval Rejected
                            </p>
                          )}
                          {elem.status === "On Hold" && (
                            <p className="font-weight-bold">Held In Review</p>
                          )}

                          {elem.status === "Applied" && (
                            <>
                              <button
                                className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                onMouseEnter={() => handleMouse(`${elem.id}1`)}
                                onMouseLeave={() => handleMouse("0")}
                                onClick={() => setModal(`${elem.id}1`)}
                              >
                                <i className="fa-solid text-white fa-pen-to-square m-0"></i>
                                <div
                                  className={
                                    mouse === `${elem.id}1`
                                      ? "tooltip tooltip-inner show"
                                      : "tooltip "
                                  }
                                >
                                  Edit
                                  {modal === `${elem.id}1` && (
                                    <PreviewModal
                                      modalHeader="Edit"
                                      modal={modal === `${elem.id}1` && true}
                                      setModal={setModal}
                                    >
                                      {routeName === "civilmarriage" && (
                                        <CivilMarriageEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                          editedData={editedData}
                                        />
                                      )}
                                      {routeName === "singlestatusletter" && (
                                        <SingleStatusEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                          editedData={editedData}
                                        />
                                      )}

                                      {routeName === "churchlicensing" && (
                                        <LicensingAChurchEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                        />
                                      )}
                                      {routeName ===
                                        "lostcertificateretrieval" && (
                                        <RetrievalEdit
                                          setModal={setModal}
                                          id={elem.id}
                                          editWithKey={editWithKey}
                                        />
                                      )}
                                    </PreviewModal>
                                  )}
                                </div>
                              </button>
                              <button
                                className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                onMouseEnter={() => handleMouse(`${elem.id}2`)}
                                onMouseLeave={() => handleMouse("0")}
                                onClick={() => setModal(`${elem.id}2`)}
                              >
                                <i className="fa-solid text-white  fa-eye"></i>
                                <div
                                  className={
                                    mouse === `${elem.id}2`
                                      ? "tooltip tooltip-inner show"
                                      : "tooltip "
                                  }
                                >
                                  view
                                  {modal === `${elem.id}2` && (
                                    <PreviewModal
                                      modalHeader="View"
                                      modal={modal === `${elem.id}2` && true}
                                      setModal={setModal}
                                    >
                                      {routeName === "civilmarriage" && (
                                        <MarriageView id={elem.id} />
                                      )}

                                      {routeName === "singlestatusletter" && (
                                        <SingleStatusView
                                          id={elem.id}
                                          setmodalClose={setModal}
                                        />
                                      )}
                                      {routeName === "churchlicensing" && (
                                        <LicensingAChurchView id={elem.id} />
                                      )}
                                      {routeName ===
                                        "lostcertificateretrieval" && (
                                        <RetrievalView id={elem.id} />
                                      )}
                                    </PreviewModal>
                                  )}
                                </div>
                              </button>
                              <button
                                className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                onMouseEnter={() => handleMouse(`${elem.id}3`)}
                                onMouseLeave={() => handleMouse("0")}
                                onClick={() => handleDelete(elem.id)}
                              >
                                <i className="fa-solid text-white fa-trash"></i>
                                <div
                                  className={
                                    mouse === `${elem.id}3`
                                      ? "tooltip tooltip-inner show"
                                      : "tooltip "
                                  }
                                >
                                  delete
                                </div>
                              </button>
                            </>
                          )}
                          {elem.status === "Approved" && (
                            <>
                              {routeName === ""}
                              <button
                                className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                onMouseEnter={() => handleMouse(`${elem.id}4`)}
                                onMouseLeave={() => handleMouse("0")}
                                onClick={() => setModal(`${elem.id}4`)}
                              >
                                <i className="fa-solid text-white  fa-file"></i>
                                <div
                                  className={
                                    mouse === `${elem.id}4`
                                      ? "tooltip tooltip-inner show"
                                      : "tooltip "
                                  }
                                >
                                  document view
                                  <DocumentPreview
                                    modal={modal === `${elem.id}4` && true}
                                    setModal={setModal}
                                  >
                                    <PDFViewer style={{ width: "100%" }}>
                                      {routeName === "civilmarriage" && (
                                        <PdfGenerator
                                          doMarriage={elem.doMarriage}
                                          gName={elem.gName}
                                          bName={elem.bName}
                                          placeofMarriage={
                                            elem.noRegistrarOffice ||
                                            elem.noChurch ||
                                            elem.noTemple ||
                                            elem.noMosque
                                          }
                                        />
                                      )}
                                      {routeName === "churchlicensing" && (
                                        <LicensePdf
                                          name={elem.cOfficialName}
                                          church={elem.cName}
                                          county={elem.county}
                                          district={elem.district}
                                          doA={elem?.doA}
                                        />
                                      )}
                                      {routeName === "singlestatusletter" && (
                                        <SingleStausCertificate
                                          doA={elem.doA}
                                          aName={elem.aName}
                                          // bName={elem.bName}
                                          // placeofMarriage={
                                          //   elem.noRegistrarOffice ||
                                          //   elem.noChurch ||
                                          //   elem.noTemple ||
                                          //   elem.noMosque
                                          // }
                                        />
                                      )}
                                    </PDFViewer>
                                    )
                                  </DocumentPreview>
                                </div>
                              </button>

                              {routeName !== "lostcertificateretrieval" ? (
                                <PDFDownloadLink
                                  document={
                                    (routeName === "civilmarriage" && (
                                      <PdfGenerator
                                        doMarriage={elem.doMarriage}
                                        gName={elem.gName}
                                        bName={elem.bName}
                                        placeofMarriage={
                                          elem.noRegistrarOffice ||
                                          elem.noChurch ||
                                          elem.noTemple ||
                                          elem.noMosque
                                        }
                                      />
                                    )) ||
                                    (routeName === "churchlicensing" && (
                                      <LicensePdf
                                        name={elem.cOfficialName}
                                        church={elem.cName}
                                        county={elem.county}
                                        district={elem.district}
                                        doA={elem?.doA}
                                      />
                                    )) ||
                                    (routeName === "singlestatusletter" && (
                                      <SingleStausCertificate
                                        doA={elem.doA}
                                        aName={elem.aName}
                                      />
                                    ))
                                  }
                                  className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                  onMouseEnter={() =>
                                    handleMouse(`${elem.id}5`)
                                  }
                                  onMouseLeave={() => handleMouse("0")}
                                >
                                  <i className="fa-solid  text-white fa-floppy-disk"></i>
                                  <div
                                    className={
                                      mouse === `${elem.id}5`
                                        ? "tooltip tooltip-inner show"
                                        : "tooltip "
                                    }
                                  >
                                    download
                                  </div>
                                </PDFDownloadLink>
                              ) : (
                                <FileDownloader
                                  className="d-inline px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                                  onMouseEnter={() =>
                                    handleMouse(`${elem.id}5`)
                                  }
                                  onMouseLeave={() => handleMouse("0")}
                                  fileObj={elem.certificate}
                                >
                                  <i className="fa-solid  text-white fa-floppy-disk"></i>
                                  <div
                                    className={
                                      mouse === `${elem.id}5`
                                        ? "tooltip tooltip-inner show"
                                        : "tooltip "
                                    }
                                  >
                                    download
                                  </div>
                                </FileDownloader>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Card>
        </div>
      </Row>
    </Container>
  );
}
