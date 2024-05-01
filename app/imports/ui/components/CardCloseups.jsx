import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import ReactParallaxTilt from 'react-parallax-tilt';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { YourCards } from '../../api/YourCards';
import LoadingSpinner from './LoadingSpinner';

const CardCloseups = () => {

  let { ready, yourCards } = useTracker(() => {
    const subscription = Meteor.subscribe(YourCards.userPublicationName);
    const rdy = subscription.ready();
    const yourCardItems = YourCards.collection.find({}, { sort: { rarity: 1, name: 1 } }).fetch();
    return {
      yourCards: yourCardItems,
      ready: rdy,
    };
  }, []);

  const [show, setShow] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardName, setCardName] = useState('');
  const [cardDesc, setCardDesc] = useState('');
  const [cardCopies, setCardCopies] = useState(1);
  const [fade, setFade] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (card, index, name, desc, copies) => {
    setCardName(name);
    setCardDesc(desc);
    setCardIndex(index);
    setCardCopies(copies);
    setShow(true);
  };

  const handleSelect = (selectedIndex) => {
    setCardIndex(selectedIndex);
    setFade(true);
    setTimeout(() => {
      setCardName(yourCards[selectedIndex].name);
      setCardDesc(yourCards[selectedIndex].desc);
      setCardCopies(yourCards[selectedIndex].copies);
      setFade(false);
    }, 580);
  };
  return (ready ? (
    <>
      <div>
        <div style={{ height: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '20px', marginLeft: '48px', marginRight: '40px' }}>
          {yourCards.map((yourCard, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div key={index} onClick={() => handleShow(yourCard, index, yourCard.name, yourCard.desc, yourCard.copies)}>
              <ReactParallaxTilt>
                <img className="card-entries" src={yourCard.image} alt="lol" />
              </ReactParallaxTilt>
            </div>
          ))}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Body>
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <Carousel className="custom-carousel3" indicators={false} activeIndex={cardIndex} onSelect={handleSelect} interval={null}>
              {yourCards.map((card, index) => (
                <Carousel.Item key={index}>
                  <div style={{ height: '410px', width: '290px', margin: '10vh auto auto 25vw' }}>
                    <ReactParallaxTilt
                      glareEnable
                      glareMaxOpacity="0.15"
                    >
                      <img className="center-cards3" src={card.image} alt="lol" />
                    </ReactParallaxTilt>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            <div className={`card-text ${fade ? 'fade' : ''}`}>
              <h1>{cardName}</h1>
              <h3>{cardDesc}</h3>
              <h3 style={{ marginTop: '380px', marginLeft: '-57vw'}}>You have: {cardCopies}</h3>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  ): <LoadingSpinner />);
};

export default CardCloseups;
