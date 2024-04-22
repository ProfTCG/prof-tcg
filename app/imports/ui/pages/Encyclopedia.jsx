import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Image, Col, Container, Row } from 'react-bootstrap';
import { Cards } from '../../api/stuff/Cards';
import ProfCard from '../components/ProfCard';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders the Encyclopedia page for all cards. */
const Encyclopedia = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, cards } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Cards.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const cardsList = Cards.collection.find({}).fetch();
    return {
      cards: cardsList,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="encyclopedia" fluid className="py-3">
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
      <Row className="align-middle text-center py-4 px-5">
        <Col>
          <h2 className="py-3">1 Star Cards</h2>
          <Row>
            {cards.map((card) => (<Col key={card._id}><ProfCard profCard={card} /></Col>))}
          </Row>
        </Col>
      </Row>
      <Row className="align-middle text-center py-4 px-5">
        <Col>
          <h2 className="py-3">2 Star Cards</h2>
          <p>
            In progress!<br />
            More coming soon!
          </p>
        </Col>
      </Row>
      <Row className="align-middle text-center py-4 px-5">
        <Col>
          <h2 className="py-3">3 Star Cards</h2>
          <Image className="px-5" src="/images/johnson-card-mockup.png" height={400} />
          <Image className="px-5" src="/images/moore-card-mockup.png" height={400} />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Encyclopedia;
