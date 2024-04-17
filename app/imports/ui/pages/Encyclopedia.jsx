import React from 'react';
import { Image, Col, Container, Row } from 'react-bootstrap';
import ProfCard from '../components/ProfCard';

const sampleCards = [
  {
    profName: 'Chad Morita',
    rarity: 3,
    image: '/images/card-frame.png',
    backText: 'Chad Morita is a first year instructor yada yada',
  },
];

/* Renders the Encyclopedia page for all cards. */
const Encyclopedia = () => (
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
    {/* TODO: Generate more cards, populate encyclopedia with said cards. */}
    <Row className="align-middle text-center py-4 px-5">
      <Col>
        <h2 className="py-3">1 Star Cards</h2>
        {sampleCards.map((prof, index) => (<Col key={index}><ProfCard profCard={prof} /></Col>))}
        <p>In progress!</p>
      </Col>
    </Row>
    <Row className="align-middle text-center py-4 px-5">
      <Col>
        <h2 className="py-3">2 Star Cards</h2>
        <p>In progress!</p>
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
);

export default Encyclopedia;
