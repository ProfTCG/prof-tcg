import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
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
    const sub = Meteor.subscribe(Cards.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub.ready();
    // Get documents
    const document = Cards.collection.findOne(_id);
    return {
      card: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('TradeCard', doc, ready);
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
            <ProfCard profCard={card} />
            <small>owner: {card.owner}</small>
          </Col>
        </Col>
        <Col sm={2}>
          <Col className="text-center">
            <ProfCard profCard={card} />
            <small>owner: {card.owner}</small>
            {/* Dropdown menu for selecting a card to trade with */}
            <Dropdown>
              <Dropdown.Toggle variant="dark" size="sm" id="dropdown-basic">
                Select a Card to Trade
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Col>
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
