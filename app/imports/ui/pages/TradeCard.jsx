import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Cards } from '../../api/card/Cards';
import ProfCard from '../components/ProfCard';

const TradeCard = () => {
// Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('TradeCard', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { current, myCards, ready } = useTracker(() => {
    // Get access to all cards.
    const sub1 = Meteor.subscribe('allCards');
    // Get access to current user's cards.
    const sub2 = Meteor.subscribe(Cards.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready();
    // Get documents
    const card = Cards.collection.findOne(_id);
    // Get current user's card collection
    const mine = Cards.collection.find(sub2).fetch();
    return {
      current: card,
      myCards: mine,
      ready: rdy,
    };
  }, [_id]);

  return ready ? (
    <Container fluid className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Trade Cards</h2>
          </Col>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={2}>
          <Col className="text-center">
            <ProfCard profCard={current} />
            <small>owner: {current.owner}</small>
          </Col>
        </Col>
        {myCards.map((card) => (
          <Col sm={2} key={card._id}>
            <ProfCard profCard={card} />
            <small>owner: {card.owner}</small>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center text-center py-1">
        <Col />
        <Col>
          <Button variant="dark">Trade</Button>
        </Col>
        <Col />
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default TradeCard;
