import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProfCard from '../components/ProfCard';

const sampleCards =
    [{
    profName: 'Chad Morita',
    rarity: 3,
    border: '/images/card-frame.png',
    profImage: '/images/edo-card.jpg',
    backText: 'on da back: Chad Morita is a first year instructor yada yada',



  }];

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
            {sampleCards.map((prof, index) => (<Col key={index}><ProfCard profCard={prof} /></Col>))}
        </ul>
        <ul>Make Trade Request Button</ul>
      </Col>
    </Row>

  </Container>
);

export default Marketplace;
