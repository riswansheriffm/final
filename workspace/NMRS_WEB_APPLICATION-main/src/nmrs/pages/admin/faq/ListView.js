import { useLocation } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Table } from "reactstrap";
import { IoMdAddCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import DocumentPreview from "components/Modal/DocumentPreview";
import Create from "./Create";
import { useGetAll } from "nmrs/hooks/useGetAll";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useDeleteWithId } from "nmrs/hooks/useDeleteWithId";
import Swal from "sweetalert2";
import Edit from "./Edit";
import { useEditWithId } from "nmrs/hooks/useEditWithId";

export default function ListView() {
  const location = useLocation();
  const routeName = location.pathname.split("/")[2];

  const dbName = routeName;

  const data = useGetAll({ dbName });

  const [editedData, editWithId] = useEditWithId({ dbName });
  const deleteWithKey = useDeleteWithId({ dbName });

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Question And Answer Added Successfully",
      confirmButtonText: "OK",
    });
  };

  const [mapper, setMapper] = useState([]);

  useEffect(() => {
    if (editedData) {
      setMapper(editedData);
    } else {
      setMapper(data);
    }
  }, [data, editedData]);

  const handleDelete = (id) => {
    const newData = mapper.filter((elem) => elem.id !== id);
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
        setMapper(newData);
        showSuccessAlert(id);
      }
    });
  };

  const [modal, setModal] = useState(0);
  return (
    <Card>
      <CardHeader>
        <Button
          size="md"
          onClick={() => setModal(1)}
          className="text-white bg-usrb"
        >
          <IoMdAddCircle className="text-lg" /> Add A Question And Answer
        </Button>
        {modal === 1 && (
          <DocumentPreview modal={modal === 1 && true} setModal={setModal}>
            {modal === 1 && <Create setModal={setModal} />}
          </DocumentPreview>
        )}
      </CardHeader>
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
                Question
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Answer
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Edit
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {mapper.map((elem, index) => (
              <tr key={elem.id}>
                <td className="text-md text-dark text-wrap text-center">
                  {index + 1}
                </td>
                <td className="text-md text-dark text-wrap text-center">
                  {elem.question}
                </td>
                <td className="text-md text-dark text-wrap text-center">
                  {elem.answer}
                </td>
                <td className="text-md text-dark text-center">
                  <Button
                    className="bg-usrb"
                    size="sm"
                    onClick={() => setModal(elem.id)}
                  >
                    <i className="text-white">
                      <FaPen />
                    </i>
                  </Button>
                  {modal === elem.id && (
                    <DocumentPreview modal={modal} setModal={setModal}>
                      {modal === elem.id && (
                        <Edit
                          setModal={setModal}
                          id={elem.id}
                          editWithId={editWithId}
                        />
                      )}
                    </DocumentPreview>
                  )}
                </td>
                <td className="text-md text-dark text-center">
                  <Button
                    className="bg-usrb"
                    size="sm"
                    onClick={() => {
                      handleDelete(elem.id);
                    }}
                  >
                    <i className=" text-white">
                      <FaTrash />
                    </i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
