import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PackGenerator from './Pack-Generator';

// eslint-disable-next-line react/prop-types
const PackOpener = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="custom-button" onClick={handleShow}>
        <h3 className="custom-button-text">Open</h3>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custom-modal2"
      >
        <Modal.Body>
          <div>
            <PackGenerator modalShow={show} packType={0} onClickExit={handleClose} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PackOpener;
