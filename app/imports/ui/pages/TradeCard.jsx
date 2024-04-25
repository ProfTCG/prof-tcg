import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import LoadingSpinner from '../components/LoadingSpinner';
import { Cards } from '../../api/card/Cards';
import ProfCard from '../components/ProfCard';
import { tradeCardsMethod } from '../../startup/both/Methods';

const TradeCard = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // Set default state for dropdown menu
  const [selectedCard, setSelectedCard] = useState(null);
  // console.log('TradeCard', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { current, myCards, ready } = useTracker(() => {
    // Get access to all cards.
    const sub1 = Meteor.subscribe('allCards');
    // Determine if the subscription is ready
    const rdy = sub1.ready();
    // Get documents
    const card = Cards.collection.findOne(_id);
    // Get current user's card collection
    const username = Meteor.user().username;
    const mine = Cards.collection.find({ owner: username }).fetch(); // Fetch cards based on username
    return {
      current: card,
      myCards: mine,
      ready: rdy,
    };
  }, [_id]);
  // Set default selected card to the first card in the list upon loading
  useEffect(() => {
    if (myCards.length > 0 && !selectedCard) {
      setSelectedCard(myCards[0]);
    }
  }, [myCards, selectedCard]);
  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };
  const handleTrade = () => {
    if (current && selectedCard) {
      // Swap owners
      Meteor.call(tradeCardsMethod, current._id, selectedCard._id, (error) => {
        if (error) {
          swal('Error', 'Error trading cards', 'error');
        } else {
          swal('Success', 'Cards traded successfully', 'success');
        }
      });
    }
  };
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
        <Col sm={2} />
        {selectedCard ? ( // Conditional rendering based on whether a card is selected or not
          <Col sm={2}>
            <ProfCard profCard={selectedCard} />
            <small>owner: {selectedCard.owner}</small>
          </Col>
        ) : (
          // load first card in the list otherwise
          <Col sm={2}>
            <ProfCard profCard={myCards[0]} />
            <small>owner: {myCards[0].owner}</small>
          </Col>
        )}
      </Row>
      <Row className="justify-content-center text-center py-1">
        <Col />
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {selectedCard ? selectedCard.profName : 'Select Card'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {myCards.map((card) => (
                <Dropdown.Item key={card._id} onClick={() => handleCardSelect(card)}>
                  {card.profName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col />
      </Row>
      <Row className="justify-content-center text-center pt-3">
        <Col className="mx-auto">
          <Link to="/marketplace" className="btn btn-dark"><ArrowLeft /></Link>
          <Button variant="dark" className="ms-2" onClick={handleTrade}>Trade</Button>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default TradeCard;
