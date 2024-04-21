import { Col, Input } from "reactstrap";

export default function Entries({ getValue, setValue }) {
  return (
    <Col md="4" className="align-items-center mb-1">
      <span className="mr-1 text-dark">Show</span>

      <div className="w-50 d-inline-block">
        <Input
          className="form-control"
          id="entries"
          type="select"
          name="Entries"
          value={getValue}
          onChange={(e) => setValue(e.target.value)}
        >
          <option>10</option>
          <option>50</option>
          <option>100</option>
          <option>250</option>
          <option>All</option>
        </Input>
      </div>
      <span className="ml-1 text-dark">Entries</span>
    </Col>
  );
}
