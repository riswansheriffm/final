import React from "react";
import { Col, FormGroup, Input } from "reactstrap";
import FormError from "./FormError";

export default function NumberInput({
  id,
  labelText,
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
        <label className="form-control-label text-xs" htmlFor={id}>
          {labelText}
          <p className="d-inline text-danger">*</p>
        </label>
        <Input
          className="form-control mb-0"
          id={id}
          placeholder={labelText}
          type="number"
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {hasError && <FormError>Enter {labelText}</FormError>}
      </FormGroup>
    </Col>
  );
}
