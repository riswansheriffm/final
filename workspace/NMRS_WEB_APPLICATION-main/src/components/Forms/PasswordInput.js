import React from "react";
import { Col, FormGroup, Input } from "reactstrap";
import FormError from "./FormError";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

export default function PasswordInput({
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
        <label className="form-control-label text-xs" htmlFor={id}>
          {labelText}
          <p className="d-inline text-danger">*</p>
        </label>
        <Input
          className="form-control mb-0"
          id={id}
          placeholder={labelText}
          type="password"
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <IoMdEye />
        <IoMdEyeOff />
        {hasError && <FormError>Enter {labelText}</FormError>}
      </FormGroup>
    </Col>
  );
}
