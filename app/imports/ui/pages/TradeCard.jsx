import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Cards } from '../../api/stuff/Cards';
import ProfCard from '../components/ProfCard';

const TradeCard = () => {
// Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('TradeCard', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { card, ready } = useTracker(() => {
    // Get access to Card documents.
    const subscription = Meteor.subscribe(Cards.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Cards.collection.findOne(_id);
    return {
      card: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('TradeCard', doc, ready);

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Trade Cards</h2></Col>
          <ProfCard profCard={card} />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default TradeCard;
