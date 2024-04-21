import FilePreview from "components/Forms/FilePreview";
import DocumentPreview from "components/Modal/DocumentPreview";

import { useState } from "react";

import { Button, Col } from "reactstrap";

export default function FileView({ src, labelText }) {
  const [modal, setModal] = useState(false);

  return (
    <Col md="6" lg="3" className="mb-5">
      <span>
        <h4>{labelText}</h4>
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
            <DocumentPreview
              modal={modal}
              modalHeader={labelText}
              setModal={setModal}
            >
              <FilePreview
                // src={JSON.parse(localStorage.getItem(name))}
                src={src}
                alt={labelText}
                title={labelText}
              />
            </DocumentPreview>
          )}
        </Button>
      </span>
    </Col>
  );
}
