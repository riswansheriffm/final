import React from "react";

import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function DocumentPreview({
  children,
  modal,
  setModal,
  modalHeader,
}) {
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal className="w-50" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalHeader}</ModalHeader>
        <ModalBody className="mt--4" style={{ height: "80vh" }}>
          {children}
        </ModalBody>
      </Modal>
    </div>
  );
}
