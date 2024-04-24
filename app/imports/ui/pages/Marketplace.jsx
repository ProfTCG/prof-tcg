import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Cards } from '../../api/stuff/Cards';
import ProfCard from '../components/ProfCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Marketplace = () => {
  const { ready, cards } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Stuff documents.
  // Get access to cards.
    const subscription = Meteor.subscribe(Cards.userPublicationName);
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
    <Container>
      <Row>
        <Col>
          <h1>Marketplace</h1>
          <p>Here you can see all cards available for trade from other users!
            WIP!
          </p>
        </Col>
        <Col>
          <h2>Card List</h2>
          <p>These cards are for sale!</p>
          <ul>
            {/* <img src="/images/johnson-card-mockup.png" alt="Philip Johnson" width={200} /> */}
            {cards.filter(prof => prof.isForSale).map((prof, index) => (<Row><Col key={index}><ProfCard profCard={prof} /></Col><Row><Button>Make Trade</Button></Row></Row>))}
          </ul>

        </Col>
      </Row>

    </Container>
  ) : <LoadingSpinner />);
};

export default Marketplace;
