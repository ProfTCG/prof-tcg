import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import ReactParallaxTilt from 'react-parallax-tilt';

import { Image } from 'react-bootstrap';

/** Renders a single professor trading card. See pages/Encyclopedia.jsx. */
const ProfCard = ({ profCard }) => {
  // TODO: Determine display format, determine card schema(s). See stuff/Cards.js
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} className="custom-modal" dialogClassName="modal-90w">
        <Modal.Body>
          <div style={{ justifyContent: 'center', flexDirection: 'row', display: 'flex', position: 'absolute' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginTop: '120px', marginLeft: '-30px' }}>
                <ReactParallaxTilt
                  glareEnable
                  glareMaxOpacity="0.15"
                >
                  <img className="encyclopedia-closeup" src={profCard.profImage} alt="lol"/>
                </ReactParallaxTilt>
              </div>
              <div style={{ position: 'absolute', left: '250px', textAlign: 'center' }}>
                <h3 style={{ color: 'white', marginLeft: '90px', fontSize: '38px', whiteSpace: 'nowrap', marginTop: '100px', fontFamily: 'Orbitron, serif' }}>{profCard.profName}</h3>
                <h3 style={{ color: 'white', marginLeft: '90px', fontSize: '30px', marginTop: '20px', width: '550px', textAlign: 'center' }}>
                  {profCard.backText}
                </h3>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ReactParallaxTilt>
        <Image
          className="card-entries"
          src={profCard.border}
          alt="professor card"
          onClick={handleShow}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'Space') {
              handleShow();
            }
          }}
        />
      </ReactParallaxTilt>
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
    isForSale: PropTypes.bool,
  }).isRequired,
};

export default ProfCard;
