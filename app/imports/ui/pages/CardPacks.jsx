import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const CardPacks = () => {
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

  const addRandomCard = () => {
    Meteor.call('cards.giftRandom', Meteor.userId(), (error, result) => {
      console.log('trying to add random card');
      if (error) {
        if (error.error === 'gift-received') {
          console.error('You have already opened your daily pack. Please try again in 24 hours.');
        } else {
          console.error('Error gifting card:', error);
        }
      } else {
        console.log(result);
      }
    });
  };
  return (ready) ? (
    <Container className="py-4">
      <Row>
        <Col>
          <h3>
            Every day at 8:00 A.M. HST, all users can open a free <b>Standard Pack</b>.
          </h3>
          <Button className="mt-5" variant="primary" onClick={() => addRandomCard()}>Open New Card Pack</Button>
        </Col>
        <Col className="justify-content-center d-flex">
          <Image src="https://tinyurl.com/mukdjetz" alt="Standard Pack Preview" />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default CardPacks;
