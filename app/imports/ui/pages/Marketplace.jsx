import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Cards } from '../../api/stuff/Cards';

const Marketplace = () => (
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
          {Cards.collection.find({isForSale: true}).map((card) => <li key={card._id}>{card.profName}</li>)}
        </ul>
        <ul>Make Trade Request Button</ul>
      </Col>
    </Row>

  </Container>
);

export default Marketplace;
