import React, { useState } from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Cards } from '../../api/card/Cards';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfCard from '../components/ProfCard';

const YourCards = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, cards } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to ALL cards.
    const subscription = Meteor.subscribe(Cards.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the cards
    const cardsList = Cards.collection.find().fetch();
    return {
      cards: cardsList,
      ready: rdy,
    };
  }, []);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const addToMarketplace = (card) => {
    Meteor.call('cards.setForSale', card._id, card.isForSale, (error) => {
      if (error) {
        console.error('Error toggling card for sale', error);
      } else {
        setAlertMessage(card.isForSale ? `Card ${card.profName} removed from marketplace` : `Card ${card.profName} added to marketplace`);
        setShowAlert(true);
      }
    });
  };
  const Headers = ({ rarity }) => {
    const filteredCards = cards.filter(function (card) { return card.rarity === rarity; });
    if (filteredCards.length > 0) {
      return (
        <h3 className="encyclopedia-header">{rarity} Star Cards</h3>
      )
    }
  };
  const renderCards = (rarity) => {
    const filteredCards = cards.filter(function (card) { return card.rarity === rarity; });
    return (
      <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Headers rarity={rarity} />
        <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', marginLeft: '54px' }}>
        {filteredCards.map((card) => (
          <div key={card._id} style={{ margin: '60px 60px 0px 2px' }}>
            <ProfCard profCard={card}/>
            <Button
              variant="primary"
              style={{ position: 'relative', marginLeft: '24px', marginBottom: '50px' }}
              onClick={() => addToMarketplace(card)}>Add to Marketplace
            </Button>
          </div>
        ))}
        </div>
      </div>
    );
  };

  return (ready ? (
    <Container id="your-cards" fluid className="py-3" style={{ cursor: 'url(cursor.cur), auto' }}>
      <h1 className="text-center">Your Cards</h1>
      <Row className="py-4">
        <Col xs={2} />
        <Col style={{ textAlign: 'center' }}>
          <p> Here you can find all the cards you own, and add them to the marketplace</p>
        </Col>
        <Col xs={2} />
      </Row>
      {showAlert && (
        <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      {renderCards(1)}
      {renderCards(2)}
      {renderCards(3)}
      {renderCards(4)}
    </Container>
  ) : <LoadingSpinner />);
};

export default YourCards;
