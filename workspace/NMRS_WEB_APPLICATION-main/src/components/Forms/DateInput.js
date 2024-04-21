import { Col, FormGroup, Input } from "reactstrap";
import FormError from "./FormError";

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
        <label className="form-control-label text-xs" htmlFor={id}>
          {labelText}
          <p className="d-inline text-danger">*</p>
        </label>
        <Input
          className="form-control mb-0"
          id={id}
          placeholder={labelText}
          type="date"
          name={id}
          value={value}
          onChange={onChange}
          max={max}
          min={min}
          disabled={disabled}
        />
        {hasError &&
          (hasError === "error" ? (
            <FormError>Enter {labelText}</FormError>
          ) : (
            <FormError>{hasError}</FormError>
          ))}
      </FormGroup>
    </Col>
  );
}
