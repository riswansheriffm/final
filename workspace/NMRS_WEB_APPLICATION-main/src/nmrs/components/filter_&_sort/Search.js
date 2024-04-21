import { Col, Input, Row } from "reactstrap";

export default function Search({ getData, setData }) {
  return (
    <Col md="4" className="align-items-center mb-1">
      <span className="mr-1 text-dark">Search</span>
      <div className="w-75 d-inline-block">
        <Input
          className="form-control "
          id="search"
          type="text"
          name="search"
          placeholder="search..."
          value={getData}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
    </Col>
  );
}
