import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Row, Table } from "reactstrap";

const DUMMYCHURCHDETAILS = [
  {
    name: "SomeOne",
    denomination: "Catholic",
    county: "Kampala",
    district: "Kampala",
  },
];

export default function ChurchResult({ searchCategory }) {
  const navigate = useNavigate();
  const resultData = DUMMYCHURCHDETAILS.filter(
    (elem) =>
      elem.denomination === "Catholic" &&
      elem.name === "SomeOne" &&
      elem.county === "Kampala" &&
      elem.district === "Kampala"
  );

  const { name, denomination, county, district } = resultData[0];

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
            <tr>
              <td className="text-md text-dark text-center">{name}</td>
              <td className="text-md text-dark text-center">{denomination}</td>
              <td className="text-md text-dark text-center">{county}</td>
              <td className="text-md text-dark text-center">{district}</td>
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
