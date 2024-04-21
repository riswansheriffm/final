import DocumentPreview from "nmrs/components/modals/DocumentPreview";
import { useEditWithId } from "nmrs/hooks/useEditWithId";
import { useGetAll } from "nmrs/hooks/useGetAll";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Card, CardBody, Table } from "reactstrap";
import Swal from "sweetalert2";
import Edit from "../faq/Edit";
import { FaPen } from "react-icons/fa";
import PaymentEdit from "./PaymentEdit";

export default function Payment() {
  const location = useLocation();
  const routeName = location.pathname.split("/")[2];

  const dbName = routeName;

  const data = useGetAll({ dbName });

  const [editedData, editWithId] = useEditWithId({ dbName });

  const [modal, setModal] = useState(0);

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Question And Answer Added Successfully",
      confirmButtonText: "OK",
    });
  };

  const [mapper, setMapper] = useState();

  useEffect(() => {
    if (editedData) {
      setMapper(editedData);
    } else {
      setMapper(data);
    }
  }, [data, editedData]);

  return (
    <Card>
      <CardBody>
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
                S. No.
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Form
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Price for Ugandan(UGX)
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Price for Others(USD)
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {mapper?.map((elem, index) => (
              <tr key={elem?.id}>
                <td className="text-md text-dark text-center">{index + 1}</td>
                <td className="text-md text-dark text-center">{elem?.form}</td>
                <td className="text-md text-dark text-center">
                  {elem?.poUgandan}
                </td>
                <td className="text-md text-dark text-center">
                  {elem?.poOthers}
                </td>
                <td className="text-md text-dark text-center">
                  <Button
                    className="bg-usrb"
                    size="sm"
                    onClick={() => setModal(elem?.id)}
                  >
                    <i className="text-white">
                      <FaPen />
                    </i>
                  </Button>
                  {modal === elem?.id && (
                    <DocumentPreview modal={modal} setModal={setModal}>
                      {modal === elem?.id && (
                        <PaymentEdit
                          setModal={setModal}
                          id={elem?.id}
                          editWithId={editWithId}
                        />
                      )}
                    </DocumentPreview>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
