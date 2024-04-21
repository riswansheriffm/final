import { Col, FormGroup, Input } from "reactstrap";
import FormError from "./FormError";
import { toast } from "react-toastify";

export default function FormSelect({
  children,
  labelText,
  id,
  value,
  onChange,
  hasError,
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
          type="select"
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          
          style={{color:'#000000'}}
        >
          {children}
        </Input>
        {/* {hasError && <FormError>Select {labelText}</FormError>} */}
      </FormGroup>
    </Col>
  );
}
