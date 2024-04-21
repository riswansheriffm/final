import { Col, FormGroup, Input } from "reactstrap";

export default function DateInput({
  id,
  labelText,
  value,
  onChange,
  hasError,
  max = "",
  min = "",
  md = "3",
  sm = "6",
  disabled,
}) {
  return (
    <Col md={sm} lg={md}>
      <FormGroup>
        <label
          className="form-control-label font-weight-bolder text-md"
          htmlFor={id}
        >
          {labelText}
          <span style={{ color: "red" }}>*</span>
        </label>
        <Input
          className="form-control mb-0"
          id={id}
          pattern="dd-mm-yyyy"
          type="date"
          name={id}
          value={value}
          onChange={onChange}
          max={max}
          min={min}
          disabled={disabled}
          style={{color:'#000000'}}
        />
        {/* {hasError &&
          (hasError === "error" ? (
            <FormError>Enter {labelText}</FormError>
          ) : (
            <FormError>{hasError}</FormError>
          ))} */}
      </FormGroup>
    </Col>
  );
}
