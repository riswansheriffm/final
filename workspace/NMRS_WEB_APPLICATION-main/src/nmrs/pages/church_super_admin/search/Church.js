import TextInput from "nmrs/components/forms/TextInput";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, Card, CardBody, CardHeader, Row, Table } from "reactstrap";

const DATA = [
  {
    cName: "Church of Uganda",
    denomination: "Catholic",
    county: "Kampala",
    district: "Kampala",
  },
  {
    cName: "Church of Uganda",
    denomination: "Pentacastrol",
    county: "Kampala",
    district: "SomeThing",
  },
];

export default function Church() {
  const [mapper, setMapper] = useState();
  const [details, setDetails] = useState({
    cName: "",
    district: "",
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

    if (!details?.cName) {
      toast.error(`Please Church Name`, {
        theme: "colored",
        toastId: "error-toast",
      });
      setMapper();
    } else if (!details?.district) {
      toast.error(`Please Enter Church District`, {
        theme: "colored",
        toastId: "error-toast",
      });
      setMapper();
    } else {
      setMapper(
        DATA.filter(
          (elem) =>
            elem.cName.toLowerCase() === details?.cName.toLowerCase() &&
            elem.district.toLowerCase() === details?.district.toLowerCase()
        )
      );
    }
  };
  return (
    <Card>
      <CardHeader>
        <Row className="justify-content-center align-items-center">
          <TextInput
            id="cName"
            labelText="Church Name"
            onChange={handleChange}
            value={details?.cName}
          />

          <TextInput
            id="district"
            labelText="District"
            onChange={handleChange}
            value={details?.district}
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
            </tr>
          </thead>
          <tbody>
            {(!mapper || !mapper.length) && (
              <tr className="text-center">
                <td colSpan="5" className="text-dark font-weight-bolder">
                  No Data Found
                </td>
              </tr>
            )}
            {mapper?.map((elem, index) => (
              <tr className=" font-weight-bolder" key={elem.id}>
                <td className="text-md text-dark text-center">{index + 1}</td>

                <td className="text-md text-dark text-center">{elem.cName}</td>
                <td className="text-md text-dark text-center">
                  {elem.denomination}
                </td>
                <td className="text-md text-dark text-center">{elem.county}</td>
                <td className="text-md text-dark text-center">
                  {elem.district}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
