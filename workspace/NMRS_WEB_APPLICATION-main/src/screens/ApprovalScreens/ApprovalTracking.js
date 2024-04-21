import useGetIndex from "Hooks/useGetIndex";

import PreviewModal from "components/Modal/PreviewModal";
import { useEffect, useState } from "react";

import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";

import "sweetalert2/dist/sweetalert2.css";

import MarriageApproval from "./MarriageApproval";
import Entries from "components/Filter&Sort/Entries";
import Search from "components/Filter&Sort/Search";
import SingleStatusApproval from "./SingleStatusApproval";
import LicenseApproval from "./LicenseApproval";
import SortBy from "components/Filter&Sort/SortBy";
import LostCertificateApproval from "./LostCertificateApproval";
import useUpdateStatus from "Hooks/useUpdateStatus";
import { useLocation } from "react-router-dom";

export default function ApprovalTracking() {
  const [mouse, handleMouse] = useState("0");
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];

  const dbName = routeName;

  const data = useGetIndex({ dbName });
  const [updatedData, updateStatus] = useUpdateStatus({ dbName });

  const [modal, setModal] = useState("");

  const [status, setStatus] = useState([]);

  let Sorted;
  useEffect(() => {
    if (updatedData) {
      setStatus(updatedData);
    } else {
      setStatus(data);
    }
  }, [data, updatedData]);
  const [sortBy, setSort] = useState("Date Of Application");
  const [entries, setEntries] = useState("10");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastItem = currentPage * entries;
  const indexOfFirstItem = indexOfLastItem - entries;

  if (sortBy === "Name") {
    Sorted = status.sort((a, b) =>
      (a.aName || a.gName || a.cOfficialName).localeCompare(
        b.aName || b.gName || b.cOfficialName
      )
    );
  } else if (sortBy === "Date Of Application") {
    Sorted = status.sort((a, b) => {
      const dateA = new Date(a.doA.split("/").reverse().join("/"));
      const dateB = new Date(b.doA.split("/").reverse().join("/"));
      return dateB - dateA;
    });
  } else if (sortBy === "Status") {
    Sorted = status.sort((a, b) => a.status.localeCompare(b.status));
  }

  if (search) {
    Sorted = Sorted.filter((elem) =>
      (elem.gName || elem.cOfficialName || elem.aName).includes(search)
    );
  }

  return (
    <Container fluid className="overflow-hidden">
      <Row className="mt-4">
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Approval </h3>
            </CardHeader>
            <Row className="text-center">
              <Entries getValue={entries} setValue={setEntries} />
              <SortBy getValue={sortBy} setValue={setSort} />
              <Search getData={search} setData={setSearch} />
            </Row>
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
                {!Sorted.length ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <h3>No Data Found</h3>
                    </td>
                  </tr>
                ) : entries === "All" ? (
                  Sorted.slice().map((elem, index) => {
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
                        <td className="text-center">
                          <>
                            <button
                              className="px-3 border-0 rounded-pill bg-usrb shadow-lg ml-1 py-1"
                              onMouseEnter={() => handleMouse(`${elem.id}2`)}
                              onMouseLeave={() => handleMouse("0")}
                              onClick={() => setModal(`${elem.id}2`)}
                            >
                              <i className="fa-solid text-white   fa-eye"></i>
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
                                    modalHeader=""
                                    modal={modal === `${elem.id}2` && true}
                                    setModal={setModal}
                                    className="bg-secondary"
                                  >
                                    {routeName === "civilmarriage" && (
                                      <MarriageApproval
                                        id={elem.id}
                                        updateStatus={updateStatus}
                                        status={elem.status}
                                      />
                                    )}

                                    {routeName === "singlestatusletter" && (
                                      <SingleStatusApproval
                                        updateStatus={updateStatus}
                                        status={elem.status}
                                        id={elem.id}
                                      />
                                    )}
                                    {routeName === "churchlicensing" && (
                                      <LicenseApproval
                                        id={elem.id}
                                        updateStatus={updateStatus}
                                        status={elem.status}
                                      />
                                    )}
                                    {routeName ===
                                      "lostcertificateretrieval" && (
                                      <LostCertificateApproval
                                        updateStatus={updateStatus}
                                        status={elem.status}
                                        id={elem.id}
                                      />
                                    )}
                                  </PreviewModal>
                                )}
                              </div>
                            </button>
                          </>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  Sorted.slice(indexOfFirstItem, indexOfLastItem).map(
                    (elem, index) => {
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
                          <td className="text-center">
                            <>
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
                                      modalHeader=""
                                      modal={modal === `${elem.id}2` && true}
                                      setModal={setModal}
                                      className="bg-secondary"
                                    >
                                      {routeName === "civilmarriage" && (
                                        <MarriageApproval
                                          id={elem.id}
                                          updateStatus={updateStatus}
                                          status={elem.status}
                                        />
                                      )}

                                      {routeName === "singlestatusletter" && (
                                        <SingleStatusApproval
                                          updateStatus={updateStatus}
                                          status={elem.status}
                                          id={elem.id}
                                        />
                                      )}
                                      {routeName === "churchlicensing" && (
                                        <LicenseApproval
                                          updateStatus={updateStatus}
                                          status={elem.status}
                                          id={elem.id}
                                        />
                                      )}
                                      {routeName ===
                                        "lostcertificateretrieval" && (
                                        <LostCertificateApproval
                                          updateStatus={updateStatus}
                                          status={elem.status}
                                          id={elem.id}
                                        />
                                      )}
                                    </PreviewModal>
                                  )}
                                </div>
                              </button>
                            </>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </Table>
            {Sorted.length > entries && (
              <Row className="justify-content-center mb-2">
                {currentPage === 1 || (
                  <Button
                    size="md"
                    className="bg-usrb text-white"
                    onClick={previousPage}
                  >
                    Previous
                  </Button>
                )}
                {indexOfLastItem >= data.length || (
                  <Button
                    size="md"
                    className="bg-usrb text-white"
                    onClick={nextPage}
                  >
                    Next
                  </Button>
                )}
              </Row>
            )}
          </Card>
        </div>
      </Row>
    </Container>
  );
}
