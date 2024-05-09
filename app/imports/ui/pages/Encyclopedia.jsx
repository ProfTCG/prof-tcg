import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Cards } from '../../api/card/Cards';
import ProfCard from '../components/ProfCard';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders the Encyclopedia page for all cards. */
const Encyclopedia = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, cards } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to ALL cards.
    const subscription = Meteor.subscribe('allCards');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the cards from the encyclopedia account
    const cardsList = Cards.collection.find({ owner: 'encyclopedia' }).fetch();
    return {
      cards: cardsList,
      ready: rdy,
    };
  }, []);

  const renderCards = (rarity) => {
    const filteredCards = cards.filter(function (card) { return card.rarity === rarity; });
    return (
      <Row className="align-middle text-center py-4 px-5">
        <Col>
          <h2 className="py-3">{rarity} Star Cards</h2>
          <Row>
            {filteredCards.map((card) => (
              <div className="m-3" key={card._id} style={{ width: '300px', height: '400px' }}>
                <ProfCard profCard={card} />
              </div>
            ))}
          </Row>
        </Col>
      </Row>
    );
  };

  return (ready ? (
    <Container id="encyclopedia" fluid className="py-3" style={{ cursor: 'url(cursor.cur), auto' }}>
      <h1 className="text-center">Trading Card Encyclopedia</h1>
      <Row className="py-4">
        <Col xs={2} />
        <Col>
          <p>ProfTCG uses a rarity system to help determine how cards are awarded to users.</p>
          <p>Each trading card will be assigned one of the following rarities:</p>
          <ul>
            <li>1 star: For lower division courses</li>
            <li>2 star: For upper division courses</li>
            <li>3 star: For graduate division courses</li>
          </ul>
          <p>Additionally, a Professor&apos;s card(s) may receive additional &quot;embellishments&quot; to recognize some of their accomplishments from that academic year (i.e. awards or honors).</p>
          <p>Cards are being added regularly. Be sure to check back soon!</p>
        </Col>
        <Col xs={2} />
      </Row>
      {renderCards(1)}
      {renderCards(2)}
      {renderCards(3)}
      {renderCards(4)}
    </Container>
  ) : <LoadingSpinner />);
};

export default Encyclopedia;
