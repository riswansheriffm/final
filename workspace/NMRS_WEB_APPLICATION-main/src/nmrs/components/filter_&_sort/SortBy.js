import { Col, Input } from "reactstrap";

export default function SortBy({ getValue, setValue }) {
  return (
    <Col md="4" className="align-items-center mb-1">
      <span className="mr-1 text-dark">Sort By</span>
      <div className="w-75 d-inline-block">
        <Input
          className="form-control"
          id="entries"
          type="select"
          name="Entries"
          value={getValue}
          onChange={(e) => setValue(e.target.value)}
        >
          <option>Name</option>
          <option>Date Of Application</option>
          <option>Status</option>
        </Input>
      </div>
    </Col>
  );
}
