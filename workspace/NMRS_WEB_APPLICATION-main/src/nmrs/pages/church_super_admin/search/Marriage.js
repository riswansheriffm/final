import TextInput from "nmrs/components/forms/TextInput";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, Card, CardBody, CardHeader, Row, Table } from "reactstrap";

const DATA = [
  {
    MRegNum: "123456",
    gName: "Aravind",
    bName: "Samantha",
    doMarriage: "05/04/2024",
    gFather: "Aravind Appa",
    bFather: "Aravind Amma",
    church: "Church Of Uganda",
  },
  {
    MRegNum: "",
    gName: "",
    bName: "",
    doMarriage: "",
    gFather: "",
    bFather: "",
    church: "",
  },
];

export default function Marriage() {
  const [mapper, setMapper] = useState();
  const [details, setDetails] = useState({
    MRegNum: "",
    church: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    const detailsKey = Object.keys(details);
    detailsKey.forEach((value) => {
      if (e.target.name === value) {
        setDetails({ ...details, [value]: e.target.value });
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!details?.MRegNum) {
      toast.error(`Please Enter Marriage Registration Number`, {
        theme: "colored",
        toastId: "error-toast",
      });
      setMapper();
    } else if (!details?.church) {
      toast.error(`Please Enter Church Name`, {
        theme: "colored",
        toastId: "error-toast",
      });
      setMapper();
    } else {
      setMapper(
        DATA.filter(
          (elem) =>
            elem.MRegNum.toLowerCase() === details?.MRegNum.toLowerCase() &&
            elem.church.toLowerCase() === details?.church.toLowerCase()
        )
      );
    }
  };
  return (
    <Card>
      <CardHeader>
        <Row className="justify-content-center align-items-center">
          <TextInput
            id="MRegNum"
            labelText="Marriage Registration Number"
            onChange={handleChange}
            value={details?.MRegNum}
          />

          <TextInput
            id="church"
            labelText="Church"
            onChange={handleChange}
            value={details?.church}
          />

          <Button className="bg-usrb text-white" onClick={handleSubmit}>
            Search
          </Button>
        </Row>
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
                Marriage Registration Number
              </th>

              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Groom Name
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Bride Name
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Date Of Marriage
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Groom Father Name
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Groom Mother Name
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Church
              </th>
            </tr>
          </thead>
          <tbody>
            {(!mapper || !mapper.length) && (
              <tr className="text-center">
                <td colSpan="7" className="text-dark font-weight-bolder">
                  No Data Found
                </td>
              </tr>
            )}
            {mapper?.map((elem, index) => (
              <tr className=" font-weight-bolder" key={elem.id}>
                <td className="text-md text-dark text-center">{index + 1}</td>

                <td className="text-md text-dark text-center">
                  {elem.MRegNum}
                </td>
                <td className="text-md text-dark text-center">{elem.gName}</td>
                <td className="text-md text-dark text-center">{elem.bName}</td>
                <td className="text-md text-dark text-center">
                  {elem.doMarriage}
                </td>
                <td className="text-md text-dark text-center">
                  {elem.gFather}
                </td>
                <td className="text-md text-dark text-center">
                  {elem.bFather}
                </td>
                <td className="text-md text-dark text-center">{elem.church}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
