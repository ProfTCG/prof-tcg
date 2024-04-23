import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'react-bootstrap';

/** Renders a single professor trading card in the Encyclopedia. See pages/Encyclopedia.jsx. */
const ProfCard = ({ profCard }) => {
  // TODO: Determine display format, determine card schema(s). See stuff/Cards.js
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {profCard.profName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Rarity:</strong> {profCard.rarity} Stars</p>
          {profCard.backText}
        </Modal.Body>
      </Modal>

      <div style={{
        position: 'relative',
        width: '300px',
        height: '400px',
      }}
      >
        <Image
          style={{
            backgroundImage: `url(${profCard.profImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '264px 350px',
            backgroundPosition: 'center',
            width: '300px',
            height: '400px',
            cursor: 'pointer',
          }}
          src={profCard.border}
          alt="professor card"
          onClick={handleShow}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
              handleShow();
            }
          }}
        />
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '30px',
          color: 'white',
        }}
        >
          <strong>{profCard.profName}</strong>
        </div>
      </div>
    </>
  );
};

// Require a document to be passed to this component.
ProfCard.propTypes = {
  profCard: PropTypes.shape({
    profName: PropTypes.string,
    rarity: PropTypes.number,
    border: PropTypes.string,
    profImage: PropTypes.string,
    backText: PropTypes.string,
  }).isRequired,
};

export default ProfCard;
