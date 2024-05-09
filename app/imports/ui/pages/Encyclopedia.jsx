import React from 'react';
import CardPool from '../../../client/CardPool';
import ReactParallaxTilt from 'react-parallax-tilt';
import CardEntries from '../components/CardCloseups';
import { Col, Container, Row } from 'react-bootstrap';

/* Renders the Encyclopedia page for all cards. */
const EncyclopediaCards = () => {
  const { items } = CardPool.cards;

  const newRow = (rarity) => (
    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly' }}>
      <h3 className="encyclopedia-header">{rarity} Star Cards</h3>
      {items.filter(item => item.rarity === rarity)
        .map((item, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div key={index} style={{ margin: '60px 60px 60px 60px'}}>
            <CardEntries card={item} />
          </div>
        ))}
    </div>
  );

  return (
    <>
      <Container id="encyclopedia" fluid className="py-3" style={{ cursor: 'url(cursor.cur), auto' }}>
      <h1 className="text-center">Trading Card Encyclopedia</h1>
      <Row className="py-4">
        <Col xs={2}/>
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
        <Col xs={2}/>
      </Row>
      <div>
        <div style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px', marginLeft: '30px', marginRight: '40px', flexDirection: 'column' }}>
          {newRow(1)}
          {newRow(2)}
          {newRow(3)}
          {newRow(4)}
        </div>
      </div>
      </Container>
    </>
  );
};



export default EncyclopediaCards;
