import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Table } from "reactstrap";

export default function Favorite() {
  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  const navigate = useNavigate();
  const keysInLS = Object.keys(localStorage).filter((elem) => isNumeric(elem));
  const mapper = keysInLS.map((elem) => JSON.parse(localStorage.getItem(elem)));

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
                Search On
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                Search Date
              </th>
              <th
                className="text-center text-sm text-usrb-light font-weight-bolder"
                scope="col"
              >
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {mapper.map((elem, index) => (
              <tr>
                <td className="text-md text-dark text-center">{index + 1}</td>
                <td className="text-md text-dark text-center">
                  {elem.searchOn}
                </td>
                <td className="text-md text-dark text-center">
                  {elem.dateOfSearch}
                </td>
                <td className="text-md text-dark text-center">
                  <Button
                    className="bg-usrb"
                    size="sm"
                    onClick={() => {
                      navigate("/document/fullresult", {
                        state: { searchCategory: elem.searchOn.toUpperCase() },
                      });
                    }}
                  >
                    <i className="fa-solid text-white text-lg fa-eye"></i>
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
