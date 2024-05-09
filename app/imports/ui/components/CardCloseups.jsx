import React, { useState } from 'react';
import ReactParallaxTilt from 'react-parallax-tilt';
import Modal from 'react-bootstrap/Modal';

const EncyclopediaCards = ({ card }) => {

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }

  return (
    <div>
      <div>
        <ReactParallaxTilt>
          <img
            className="card-entries"
            onClick={handleShow}
            src={card.image}
            alt={card.name}
          />
        </ReactParallaxTilt>
      </div>
      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Body>
          <div style={{ justifyContent: 'center', flexDirection: 'row', display: 'flex', position: 'absolute' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginTop: '110px', marginLeft: '-30px' }}>
                <ReactParallaxTilt
                  glareEnable
                  glareMaxOpacity="0.15"
                >
                  <img className="encyclopedia-closeup" src={card.image} alt="lol"/>
                </ReactParallaxTilt>
              </div>
              <div style={{ position: 'absolute', left: '250px', textAlign: 'center' }}>
                <h3 style={{ color: 'white', marginLeft: '90px', fontSize: '38px', whiteSpace: 'nowrap', marginTop: '100px', fontFamily: 'Orbitron, serif' }}>{card.name}</h3>
                <h3 style={{ color: 'white', marginLeft: '90px', fontSize: '34px', whiteSpace: 'nowrap', marginTop: '20px' }}>{card.title}</h3>
                <h3 style={{ color: 'white', marginLeft: '90px', fontSize: '30px', whiteSpace: 'nowrap', marginTop: '20px' }}>{card.classes}</h3>
                <h3 style={{ color: 'white', marginLeft: '90px', fontSize: '30px', whiteSpace: 'nowrap', marginTop: '20px' }}>
                  <i>For more information,<br/>
                  check out this Professor<br/>
                    in the Your Cards page.</i>
                </h3>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};


export default EncyclopediaCards;
