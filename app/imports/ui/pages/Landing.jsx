import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">

    <Row className="align-middle text-center">
      <Col></Col>
      <Col className="justify-content-end d-inline-flex">
        <Image src="/images/temp-logo.png" height={200}/>
      </Col>
      <Col className="d-flex flex-column justify-content-center text-center">
        <h1 className="display-2 fw-bold">ProfTCG</h1>
        <p className="text-muted">Professor Trading Card Game</p>
      </Col>
      <Col></Col>
    </Row>

    <hr className="style-two"/>

    <Row className="align-middle text-center py-4">
      <Col></Col>
      <Col xs={2} className="d-flex flex-column justify-content-center">
        <h5>Collect cards, trade with friends, and learn more about your UH Manoa professors!</h5>
      </Col>
      <Col>
        <Container className="d-flex">
          <Image src="/images/chad-card-mockup.png" height={350} className="px-2"/>
          <Image src="/images/moore-card-mockup.png" height={350} className="px-2"/>
          <Image src="/images/johnson-card-mockup.png" height={350} className="px-2"/>
        </Container>
      </Col>
      <Col></Col>
    </Row>

  </Container>
);

export default Landing;
