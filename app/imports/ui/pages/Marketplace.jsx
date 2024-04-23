import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import ProfCard from '../components/ProfCard';

const sampleCards =
    [
      {
        profName: 'Chad Morita',
        rarity: 3,
        border: '/images/card-frame.png',
        profImage: '/images/morita-card.jpg',
        backText: 'on da back: Chad Morita is a first year instructor yada yada',
        isForSale: true,
      },
      {
        profName: 'Edo',
        rarity: 3,
        border: '/images/card-frame.png',
        profImage: '/images/edo-card.jpg',
        backText: 'on da back: Chad Morita is a first year instructor yada yada',
        isForSale: true,

      },

    ];

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
          {sampleCards.filter(prof => prof.isForSale).map((prof, index) => (<Row><Col key={index}><ProfCard profCard={prof} /></Col><Row><Button>Make Trade</Button></Row></Row>))}
        </ul>

      </Col>
    </Row>

  </Container>
);

export default Marketplace;
