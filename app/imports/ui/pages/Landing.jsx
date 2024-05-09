import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

const Landing = () => {

  return (
    <Container id="landing-page" fluid className="py-3 overflow-hidden">

      <Row className="align-middle text-center py-3">
        <Col />
        <Col className="justify-content-end d-inline-flex">
          <Image src="/images/temp-logo.png" height={275} />
        </Col>
        <Col className="d-flex flex-column justify-content-center text-center">
          <h1 className="display-2 fw-bold">ProfTCG</h1>
          <p className="text-muted">Professor Trading Card Game</p>
        </Col>
        <Col />
      </Row>

      <hr className="style-two" />

      <Row className="align-middle text-center">
        <Col />
        <Col sm={4} className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '30px' }}>
          <h4>Collect cards, trade with friends, and learn more about your UH Manoa professors!</h4>
          <Button href="/signup" variant="dark" className="my-2" size="lg">Join Today!</Button>
        </Col>
        <Col />
      </Row>

    </Container>
  );
};

export default Landing;
