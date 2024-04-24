import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import ReactParallaxTilt from 'react-parallax-tilt';
import Cards from '../../../client/Collection';

const CardCloseups = () => {
  const [show, setShow] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardName, setCardName] = useState('');
  const [cardDesc, setCardDesc] = useState('');
  const [fade, setFade] = useState(false);
  const { items } = Cards.cards;

  const handleClose = () => setShow(false);
  const handleShow = (index, name, desc) => {
    setCardName(name);
    setCardDesc(desc);
    setCardIndex(index);
    setShow(true);
  };

  const handleSelect = (selectedIndex) => {
    setCardIndex(selectedIndex);
    setFade(true);
    setTimeout(() => {
      setCardName((items.find((item => item.index === selectedIndex))).name);
      setCardDesc((items.find((item => item.index === selectedIndex))).desc);
      setFade(false);
    }, 580);
  };

  return (
    <>
      <div>
        <div style={{ height: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: '20px', marginLeft: '40px', marginRight: '40px' }}>
          {items.map((item, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div key={index} onClick={() => handleShow(item.index, item.name, item.desc)}>
              <ReactParallaxTilt>{item.card}</ReactParallaxTilt>
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Body>
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <Carousel className="custom-carousel3" indicators={false} activeIndex={cardIndex} onSelect={handleSelect} interval={null}>
              {items.map((card, index) => (
                <Carousel.Item key={index}>
                  <div style={{ height: '410px', width: '290px', margin: '10vh auto auto 25vw' }}>
                    <ReactParallaxTilt
                      glareEnable
                      glarePosition="all"
                      glareMaxOpacity="0.15"
                    >
                      <img className="center-cards3" src={card.card.props.src} alt={card.card.props.alt} />
                    </ReactParallaxTilt>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            <div className={`card-text ${fade ? 'fade' : ''}`}>
              <h1>{cardName}</h1>
              <h3>{cardDesc}</h3>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardCloseups;
