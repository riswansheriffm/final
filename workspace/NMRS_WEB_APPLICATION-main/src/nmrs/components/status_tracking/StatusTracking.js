import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useGetAll } from "../../hooks/useGetAll";
import { useEditWithId } from "../../hooks/useEditWithId";
import { useDeleteWithId } from "../../hooks/useDeleteWithId";
import { Card, CardHeader, Container, Table, Row } from "reactstrap";
import PreviewModal from "../modals/PreviewModal";
import CivilMarriageEdit from "../../pages/end_users/civil_marriage/CivilMarriageEdit";
import SingleStatusEdit from "../../pages/end_users/single_status_letter/SingleStatusEdit";
import LicensingAChurchEdit from "../../pages/church_admin/licensing_a_church/LicensingAChurchEdit";
import RetrievalEdit from "../../pages/end_users/lost_certificate_retrieval/RetrievalEdit";
import MarriageView from "../../pages/end_users/civil_marriage/MarriageView";
import SingleStatusView from "../../pages/end_users/single_status_letter/SingleStatusView";
import LicensingAChurchView from "../../pages/church_admin/licensing_a_church/LicensingAChurchView";
import RetrievalView from "../../pages/end_users/lost_certificate_retrieval/RetreivalView";
import DocumentPreview from "../modals/DocumentPreview";
import MarriagePdf from "../../pages/end_users/civil_marriage/MarriagePdf";
import SingleStausCertificate from "../../pages/end_users/single_status_letter/SingleStausCertificate";
import FileDownloader from "../../pages/end_users/lost_certificate_retrieval/FileDownloader";
import LicensePDF from "nmrs/pages/church_admin/licensing_a_church/LicensePDF";
import LicenseRenewalEdit from "nmrs/pages/church_admin/license_renewal/LicenseRenewalEdit";
import LicenseRenewalView from "nmrs/pages/church_admin/license_renewal/LicenseRenewalView";
import LicenseRenewalPDF from "nmrs/pages/church_admin/license_renewal/LicenseRenewalPDF";

export default function StatusTracking({ btnText }) {
  const [mouse, handleMouse] = useState("0");
  const location = useLocation();
  const navigate = useNavigate();
  const routeName = location.pathname.split("/")[1];
  const dbName = routeName;
  const data = useGetAll({ dbName });
  const [modal, setModal] = useState("");
  const [editedData, editWithKey] = useEditWithId({ dbName });
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

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Application Successfully Removed",
      confirmButtonText: "OK",
    });
  };

  const editLabel =
    (routeName === "civilmarriage" && "Marriage Registration Form Edit") ||
    (routeName === "singlestatusletter" && "Single Status Letter Form Edit") ||
    (routeName === "churchlicensing" && "Church License Form Edit") ||
    (routeName === "LicenseRenewal" && "License Renewal Form Edit") ||
    (routeName === "lostcertificateretrieval" &&
      "Lost Certificate Retrieval Form Edit");

  const ViewLabel =
    (routeName === "civilmarriage" && "Marriage Registration Form Edit") ||
    (routeName === "singlestatusletter" && "Single Status Letter Form Edit") ||
    (routeName === "churchlicensing" && "Church License Form Edit") ||
    (routeName === "LicenseRenewal" && "License Renewal Form Edit") ||
    (routeName === "lostcertificateretrieval" &&
      "Lost Certificate Retrieval Form Edit");
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
                  <th
                    className="text-center text-sm text-usrb-light font-weight-bolder"
                    scope="col"
                  >
                    S.No
                  </th>
                  <th
                    className="text-center text-md text-usrb-light font-weight-bolder "
                    scope="col"
                  >
                    Applicant Name
                  </th>
                  <th
                    className="text-center text-md text-usrb-light font-weight-bolder "
                    scope="col"
                  >
                    Date Of Application
                  </th>
                  <th
                    className="text-center text-md text-usrb-light font-weight-bolder "
                    scope="col"
                  >
                    Status
                  </th>
                  <th
                    className="text-center text-md text-usrb-light font-weight-bolder "
                    scope="col"
                  >
                    Action
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
                        <td className="text-md text-dark text-center">
                          {index + 1}
                        </td>
                        <td className="text-md text-dark text-center">
                          {elem.gName || elem.cOfficialName || elem.aName}
                        </td>
                        <td className="text-md text-dark text-center">
                          {elem.doA}
                        </td>
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
                        <td className="text-md text-dark  align-items-center text-center">
                          {elem.status === "Rejected" && (
                            <p className="font-weight-bold">
                              Approval Rejected
                            </p>
                          )}
                          {elem.status === "On Hold" && (
                            <p className="text-md font-weight-bold">
                              Held In Review
                            </p>
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
                                      modalHeader={editLabel}
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

                                      {routeName === "LicenseRenewal" && (
                                        <LicenseRenewalEdit
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
                                  View
                                  {modal === `${elem.id}2` && (
                                    <PreviewModal
                                      modalHeader={ViewLabel}
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
                                      {routeName === "LicenseRenewal" && (
                                        <LicenseRenewalView id={elem.id} />
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
                                    {routeName ===
                                      "lostcertificateretrieval" && (
                                      <embed
                                        src={URL.createObjectURL(
                                          elem.certificate
                                        )}
                                        className="w-100 h-100"
                                      />
                                    )}
                                    <PDFViewer style={{ width: "100%" }}>
                                      {routeName === "civilmarriage" && (
                                        <MarriagePdf
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
                                        <LicensePDF
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
                                      {routeName === "LicenseRenewal" && (
                                        <LicenseRenewalPDF
                                          aName={elem.aName}
                                          church={elem.cName}
                                          county={elem.county}
                                          district={elem.district}
                                          doA={elem?.doA}
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
                                      <MarriagePdf
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
                                      <LicensePDF
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
                                    )) ||
                                    (routeName === "LicenseRenewal" && (
                                      <LicenseRenewalPDF
                                        aName={elem.aName}
                                        church={elem.cName}
                                        county={elem.county}
                                        district={elem.district}
                                        doA={elem?.doA}
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
