import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Row, Table } from "reactstrap";

const DUMMYMARRIAGE = [
  {
    gName: "SomeOne",
    bName: "SomeAnother",
    gFName: "SomeOneFather",
    bFName: "SomeAnotherFather",
    doMarriage: "25-05-2024",
    poMarriage: "Church",
    mrNum: 6785677343,
    celebrantName: "Joseph",
  },
];

export default function MarriageResult({ searchCategory }) {
  const navigate = useNavigate();
  const resultData = DUMMYMARRIAGE.filter(
    (elem) =>
      elem.mrNum === 6785677343 &&
      elem.gName === "SomeOne" &&
      elem.bName === "SomeAnother" &&
      elem.doMarriage === "25-05-2024"
  );

  const {
    gName,
    bName,
    gFName,
    bFName,
    doMarriage,
    poMarriage,
    mrNum,
    celebrantName,
  } = resultData[0];

  const firstLetterCapital = searchCategory.charAt(0);

  const firstLetterRemoved = searchCategory.slice(1).toLowerCase();
  const searchType = firstLetterCapital + firstLetterRemoved;
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
                Groom Father Name
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Bride Father Name
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
                Place Of Marriage
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Celebrant Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-md text-dark text-center">{mrNum}</td>
              <td className="text-md text-dark text-center">{gName}</td>
              <td className="text-md text-dark text-center">{bName}</td>
              <td className="text-md text-dark text-center">{gFName}</td>
              <td className="text-md text-dark text-center">{bFName}</td>
              <td className="text-md text-dark text-center">{doMarriage}</td>
              <td className="text-md text-dark text-center">{poMarriage}</td>
              <td className="text-md text-dark text-center">{celebrantName}</td>
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
