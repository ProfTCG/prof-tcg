import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PackGenerator from './Pack-Generator';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../LoadingSpinner';

// eslint-disable-next-line react/prop-types
const PackOpener = () => {
  const { _id } = useParams();
  // Set default state for dropdown menu
  // console.log('TradeCard', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Get access to all cards.
    const sub1 = Meteor.subscribe('allCards');
    // Determine if the subscription is ready
    const rdy = sub1.ready();
    // Get documents
    // Get current user's card collection
    return {
      current: sub1,
      ready: rdy,
    };
  }, [_id]);

  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleClose = () => setShow(false);
  const handleErrorClose = () => setShowError(false);
  const handleShow = () => {
    Meteor.call('cards.giftRandom', Meteor.userId(), (error, result) => {
      console.log('trying to add random cards');
      if (error) {
        if (error.error === 'gift-received') {
          setShowError(true);
        } else {
          setShowError(true);
        }
      } else {
        setShow(true);
      }
    });
  };
  return (ready) ? (
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
      <Modal
        show={showError}
        onHide={handleErrorClose}
        keyboard={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div>
            <h3 style={{ textAlign: 'center' }}>Your account has not waited 24 hours yet!</h3>
          </div>
        </Modal.Body>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

export default PackOpener;
