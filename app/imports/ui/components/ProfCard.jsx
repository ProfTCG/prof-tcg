import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import ReactParallaxTilt from 'react-parallax-tilt';

import { Image } from 'react-bootstrap';

/** Renders a single professor trading card in the Encyclopedia. See pages/Encyclopedia.jsx. */
const ProfCard = ({ profCard }) => {
  // TODO: Determine display format, determine card schema(s). See stuff/Cards.js
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} className="custom-modal" dialogClassName="modal-90w">
        <Modal.Body>
          <div style={{ justifyContent: 'space-around', display: 'flex' }}>
            <div style={{ height: '410px', width: '290px', marginRight: '100%' }}>
              <ReactParallaxTilt
                glareEnable
                glarePosition="all"
                glareMaxOpacity="0.15"
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
                />
              </ReactParallaxTilt>
            </div>
            <div className="card-text">
              <h1>{profCard.profName}</h1>
              <h3>Rarity: {profCard.rarity} Stars</h3>
              <p>{profCard.backText}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ReactParallaxTilt>
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
