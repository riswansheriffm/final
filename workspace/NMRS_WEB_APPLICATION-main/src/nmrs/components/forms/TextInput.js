import React from "react";
import { Col, FormGroup, Input } from "reactstrap";

export default function TextInput({
  labelText,
  id,
  value,
  type,
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
          className="form-control-label font-weight-bolder text-sm"
          htmlFor={id}
        >
          {labelText}
          <span style={{ color: "red" }}>*</span>
        </label>
        <Input
          className="form-control mb-0"
          id={id}
          placeholder={labelText}
          type={type}
          name={id}
          value={value}
          autoComplete="off"
          onChange={onChange}
          disabled={disabled}
          style={{ color: "#000000" }}
        />
        {/* {hasError && <FormError>Enter {labelText}</FormError>} */}
      </FormGroup>
    </Col>
  );
}
