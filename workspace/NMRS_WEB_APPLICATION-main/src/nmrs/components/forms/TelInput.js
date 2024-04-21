import React from "react";
import { Col, FormGroup, Input } from "reactstrap";
import FormError from "./FormError";
import { toast } from "react-toastify";

export default function TelInput({
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
          type="tel"
          name={id}
          value={value}
          onChange={onChange}
          autoComplete="off"
          disabled={disabled}
          style={{ color: "#000000" }}
          title="Please enter a valid Ugandan mobile number"
        />
        {/* {hasError && <FormError>Enter {labelText}</FormError>} */}
      </FormGroup>
    </Col>
  );
}
