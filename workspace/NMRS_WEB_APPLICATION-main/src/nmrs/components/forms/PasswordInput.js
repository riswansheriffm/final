import React, { useState } from "react";
import { Col, FormGroup, Input } from "reactstrap";
import FormError from "./FormError";
import { toast } from "react-toastify";
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
  const [visible, setVisible] = useState(false);
  return (
    <Col md={sm} lg={md}>
      <FormGroup>
        <label
          className="form-control-label position-relative font-weight-bolder text-md"
          htmlFor={id}
        >
          {labelText}
          <span style={{ color: "red" }}>*</span>
        </label>
        <Input
          className="form-control mb-0"
          id={id}
          placeholder={labelText}
          type={visible ? "text" : "password"}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={{ color: "#000000" }}
        />
        {visible ? (
          <IoMdEye
            onClick={() => setVisible(!visible)}
            className="position-absolute"
            style={{
              right: "8%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        ) : (
          <IoMdEyeOff
            className="position-absolute"
            onClick={() => setVisible(!visible)}
            style={{
              right: "8%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        )}
        {/* {hasError && <FormError>Enter {labelText}</FormError>} */}
      </FormGroup>
    </Col>
  );
}
