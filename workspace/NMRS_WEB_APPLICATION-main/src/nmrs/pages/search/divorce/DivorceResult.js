import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Row, Table } from "reactstrap";

const DUMMYMARRIAGE = [
  {
    drNum: 6785677343,
    hName: "SomeOne",
    wName: "SomeAnother",
    doMarriage: "25-05-2024",
    doDivorce: "25-05-2024",
  },
];

export default function DivorceResult({ searchCategory }) {
  const navigate = useNavigate();
  const resultData = DUMMYMARRIAGE.filter(
    (elem) =>
      elem.drNum === 6785677343 &&
      elem.hName === "SomeOne" &&
      elem.wName === "SomeAnother" &&
      elem.doDivorce === "25-05-2024"
  );

  const { hName, wName, doDivorce, doMarriage, drNum } = resultData[0];

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
                Husband Name
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Wife Name
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
                Date Of Divorce
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-md text-dark text-center">{drNum}</td>
              <td className="text-md text-dark text-center">{hName}</td>
              <td className="text-md text-dark text-center">{wName}</td>
              <td className="text-md text-dark text-center">{doMarriage}</td>
              <td className="text-md text-dark text-center">{doDivorce}</td>
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
