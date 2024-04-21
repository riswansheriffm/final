import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Table } from "reactstrap";
import { IoMdAddCircle,IoMdEye } from "react-icons/io";
import { useEffect, useState } from "react";
import DocumentPreview from "components/Modal/DocumentPreview";
import Create_church from "./Create_Church";
import { useGetAll } from "nmrs/hooks/useGetAll";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useDeleteWithId } from "nmrs/hooks/useDeleteWithId";
import Swal from "sweetalert2";
import Edit_church from "./Edit_church";
import { useEditWithId } from "nmrs/hooks/useEditWithId";
import View_church from "./ChurchView";

export default function ListView_church() {
  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  const location = useLocation();
  const routeName = location.pathname.split("/")[2];

  const dbName = routeName;

  const navigate = useNavigate();
  const data = useGetAll({ dbName });

  const deleteWithKey = useDeleteWithId({ dbName });

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Church Information are Deleted Successfully",
      confirmButtonText: "OK",
    });
  };

  const [mapper, setMapper] = useState([]);

  const [editedData, editWithId] = useEditWithId({ dbName });

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
          <IoMdAddCircle className="text-lg" /> Add Church Details
        </Button>
        {modal === 1 && (
          <DocumentPreview modal={modal === 1 && true} setModal={setModal}>
            {modal === 1 && <Create_church setModal={setModal} />}
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
                Church Name
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Denomination
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                County
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                District
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Action
              </th>
             
            </tr>
          </thead>
          <tbody>
            {mapper.map((elem, index) => (
              <tr key={elem.id}>
                <td className="text-md text-dark text-center">{index + 1}</td>

                <td className="text-md text-dark text-center">
                  {elem.churchName}
                </td>
                <td className="text-md text-dark text-center">
                  {elem.denomination}
                </td>
                <td className="text-md text-dark text-center">{elem.county}</td>
                <td className="text-md text-dark text-center">
                  {elem.district}
                </td>
                <td className="text-md text-dark text-center">
                  <Button
                    className="bg-usrb"
                    size="sm"
                    onClick={() => setModal(2)}
                  >
                    <i className="text-white">
                      <FaPen />
                    </i>
                  </Button>
                  <Button
                    className="bg-usrb ml-2"
                    size="sm"
                    onClick={() => setModal(3)}
                  >
                    <i className="text-white">
                      <IoMdEye />
                    </i>
                  </Button>
                  <Button
                    className="bg-usrb ml-2"
                    size="sm"
                    onClick={() => {
                      handleDelete(elem.id);
                    }}
                  >
                    <i className="text-white">
                      <FaTrash />
                    </i>
                  </Button>
                  {modal === 2 && (
                    <DocumentPreview modal={modal} setModal={setModal}>
                      {modal === 2 && (
                        <Edit_church
                          setModal={setModal}
                          id={elem.id}
                          editWithId={editWithId}
                        />
                      )}
                    </DocumentPreview>
                  )}
                   {modal === 3 && (
                    <DocumentPreview modal={modal} setModal={setModal}>
                      {modal === 3 && (
                        <View_church
                          setModal={setModal}
                          id={elem.id}
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
