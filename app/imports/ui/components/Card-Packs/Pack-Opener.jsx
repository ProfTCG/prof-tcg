import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PackGenerator from './Pack-Generator';
import SortCollection from '../Sort-Collection';

// eslint-disable-next-line react/prop-types
const PackOpener = ({ packTypeCounter, buttonType }) => {
  // const [fixedPackCounter, setFixedPackCounter] = useState(packCounter);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* useEffect(() => {
    if (packCounter === undefined) {
      setButtonText('Open');
    } else if (packCounter > 5) {
      setFixedPackCounter(5);
      setButtonText('Open 5');
    } else {
      setFixedPackCounter(packCounter);
      setButtonText(`Open ${packCounter}`);
    }
  }, [packCounter]); */

  if (buttonType === 3 && packTypeCounter === 0) {
    return (
      <Button className="custom-button3">
        <h3
          className="custom-button-text2"
          style={{ fontSize: '24.8px' }}
        >
          You have no Standard Packs
        </h3>
      </Button>
    );
  }
  if (buttonType === 3) {
    return (
      <Button className="custom-button3">
        <h3 className="custom-button-text2">
          Not enough Standard Packs
        </h3>
      </Button>
    );
  }
  return (
    <>
      <ButtonShaper type={buttonType} onClick={handleShow} />
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
            <PackGenerator modalShow={show} packType={packTypeCounter} onClickExit={handleClose} />
            <SortCollection />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

// eslint-disable-next-line react/prop-types,consistent-return
const ButtonShaper = ({ type, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  if (type === 2) {
    return (
      <Button className="custom-button" onClick={handleClick}>
        <h3 className="custom-button-text">Open</h3>
      </Button>
    );
  }
  return (
    <Button className="custom-button2" onClick={handleClick}>
      <h3 className="custom-button-text">Open</h3>
    </Button>
  );
};

export default PackOpener;
