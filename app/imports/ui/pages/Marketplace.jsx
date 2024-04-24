import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Cards } from '../../api/card/Cards';
import ProfCard from '../components/ProfCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Marketplace = () => {
  const { ready, cards } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Stuff documents.
  // Get access to all cards in Card collection.
    const subscription = Meteor.subscribe('allCards');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    // Get the cards
    const cardsList = Cards.collection.find().fetch();
    return {
      cards: cardsList,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container fluid className="py-3" id="marketplace">
      <Row className="text-center">
        <Col>
          <h1>Marketplace</h1>
          <p>Here you can see all cards available for trade from other users!</p>
        </Col>
      </Row>
      <hr className="style-two" />
      <Row>
        <Col sm={2} className="text-center">
          <h2>Card List</h2>
          <p>These cards are for sale!</p>
        </Col>

        {/* <img src="/images/johnson-card-mockup.png" alt="Philip Johnson" width={200} /> */}
        {cards.filter(prof => prof.isForSale).map((prof, index) => (
          <Col key={index} sm={3}>
            <ProfCard profCard={prof} />
            <Link to={`/trade/${prof._id}`} className="btn btn-dark">Request Trade</Link>
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Marketplace;
