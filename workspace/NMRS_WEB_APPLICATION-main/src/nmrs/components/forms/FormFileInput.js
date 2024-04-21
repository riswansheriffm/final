import { Button, Col, FormGroup, Row } from "reactstrap";

import { useState } from "react";

import FilePreview from "./FilePreview";
import DocumentPreview from "../modals/DocumentPreview";

export default function FormFileInput({
  labelText,
  id,
  onChange,
  hasError,
  value,
  src,
  md = "3",
  sm = "6",
  disabled,
  important = true,
}) {
  const [modal, setModal] = useState(false);

  return (
    <Col md={sm} lg={md}>
      <FormGroup>
        <label className="form-control-label font-weight-bolder text-sm">
          {labelText}
          {important && <span style={{ color: "red" }}>*</span>}
        </label>

        <Row className="align-items-baseline">
          <Col xs="9">
            <input
              type="file"
              id={id}
              name={id}
              value={value ? undefined : ""}
              onChange={onChange}
              className="custom-file-input1 p-0 m-0"
            />
            <p className="font-weight-bold text-sm">{value?.name}</p>
          </Col>
          <Col xs="2">
            {value && (
              <span className="align-self-center">
                <Button
                  color="primary"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setModal(true);
                  }}
                >
                  &#128065;
                </Button>
              </span>
            )}
          </Col>
        </Row>

        {modal && (
          <DocumentPreview
            modalHeader={labelText}
            modal={modal}
            setModal={setModal}
          >
            <FilePreview
              // src={JSON.parse(localStorage.getItem(name))}
              src={src}
              alt={id}
            />
          </DocumentPreview>
        )}
        {/* {hasError && <FormError>Attach {labelText}</FormError>} */}
      </FormGroup>
    </Col>
  );
}
