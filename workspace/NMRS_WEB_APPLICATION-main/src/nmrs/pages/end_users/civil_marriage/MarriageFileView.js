import { useState } from "react";

import { Button, Col, Row } from "reactstrap";
import DocumentPreview from "../../../components/modals/DocumentPreview";
import FilePreview from "../../../components/forms/FilePreview";

export default function MarriageFileView({ name, id, src, labelText }) {
  const [modal, setModal] = useState(false);

  return (
    <Col key={name} sm="6" md="3" className="mb-5">
      <h3 className="text">{labelText}</h3>
      <Row className="align-items-baseline">
        <Col xs="9">
          <p className=" font-weight-bold text-sm">{name}</p>
        </Col>
        <Col xs="2">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setModal(true);
            }}
            size="sm"
            color="primary"
          >
            <i className="fa-solid fa-eye"></i>
            {modal && (
              <DocumentPreview modal={modal} setModal={setModal}>
                <FilePreview
                  // src={JSON.parse(localStorage.getItem(name))}
                  src={src}
                  alt={id}
                  title={name}
                />
              </DocumentPreview>
            )}
          </Button>
        </Col>
      </Row>
    </Col>
  );
}
