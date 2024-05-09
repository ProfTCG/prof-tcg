import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Image, Row, Alert } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const CardPacks = () => {
  const { _id } = useParams();
  const user = Meteor.user()?.username;
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const calculateTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const timeString = [
      hours > 0 ? `${hours} hour(s)` : '',
      minutes > 0 ? `${minutes} minute(s)` : '',
      remainingSeconds > 0 ? `${remainingSeconds} second(s)` : '',
    ].filter(Boolean).join(', ');

    return timeString;
  };
  const addRandomCard = () => {
    Meteor.call('cards.giftRandom', Meteor.userId(), (error, result) => {
      console.log('trying to add random card');
      if (error) {
        if (error.error === 'gift-received') {
          setAlertMessage('You have already opened your daily pack. Please try again in 24 hours from the last time you opened a pack!');
          setShowAlert(true);
          console.error('You have already opened your daily pack. Please try again in 24 hours.');
        } else {
          console.error('Error gifting card:', error);
        }
      } else {
        console.log(result);
        setAlertMessage('New card added to your collection! Go to Your Cards to check it out! ');
        setShowAlert(true);
      }
    });
  };
  return (ready) ? (
    <Container className="py-4">
      <Row>
        <Col>
          <h3>
            Every 24 hours, all users can open a free <b>Standard Pack</b>.
          </h3>
          <Button className="mt-5" variant="dark" onClick={() => addRandomCard()}>Open New Card Pack</Button>
          {showAlert && (
            <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
        </Col>
        <Col className="justify-content-center d-flex">
          <Image src="https://tinyurl.com/mukdjetz" alt="Standard Pack Preview" />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default CardPacks;
