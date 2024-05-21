import React from "react";
import Modal from "react-bootstrap/Modal";

const CustomModel = ({ show, handleClose, title, message, handleConfirm }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5 className="modal-title">{title}</h5>
        </Modal.Header>
        <div className="modal-body">{message}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleClose()}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleConfirm()}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CustomModel;
