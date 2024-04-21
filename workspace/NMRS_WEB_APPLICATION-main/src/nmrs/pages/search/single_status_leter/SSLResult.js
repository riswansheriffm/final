import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Row, Table } from "reactstrap";

const DUMMYSSL = [
  {
    sslNum: 6785677343,
    name: "SomeOne",
    fName: "SomeOneFather",
    mName: "SomeOneMother",
    expiryDate: "25-05-2024",
  },
];

export default function SSLResult({ searchCategory }) {
  const navigate = useNavigate();
  const resultData = DUMMYSSL.filter(
    (elem) => elem.sslNum === 6785677343 && elem.name === "SomeOne"
  );

  const { sslNum, name, fName, mName, expiryDate } = resultData[0];

  const searchType = searchCategory
    .split(" ")
    .map((element) => element.charAt(0) + element.slice(1).toLowerCase())
    .join(" ");

  return (
    <Card>
      <CardHeader>
        <h2>Your Search On {searchType}</h2>
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
                Registration Number
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Name
              </th>

              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Father Name
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Mother Name
              </th>

              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Expiry Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-md text-dark text-center">{sslNum}</td>
              <td className="text-md text-dark text-center">{name}</td>
              <td className="text-md text-dark text-center">{fName}</td>
              <td className="text-md text-dark text-center">{mName}</td>
              <td className="text-md text-dark text-center">{expiryDate}</td>
            </tr>
          </tbody>
        </Table>
        <Row className="justify-content-center mt-2">
          <Button
            size="md"
            className="bg-usrb text-white"
            onClick={() =>
              navigate("/document/fullresult", {
                state: { searchCategory: searchCategory },
              })
            }
          >
            Pay 100 Ugx For More Details
          </Button>
        </Row>
      </CardBody>
    </Card>
  );
}
