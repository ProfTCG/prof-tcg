import React from 'react';
import { Image, Col, Container, Row } from 'react-bootstrap';

/* Renders the Encyclopedia page for all cards. */
const Encyclopedia = () => (
  <Container id="encyclopedia" fluid className="py-3">
    <Row className="align-middle text-center py-4">
      <Col />
      <Col>
        <h1 className="pb-3">4 Star Cards</h1>
        <Image src="/images/chad-card-mockup.png" height={175} />
        <h1 className="py-3">3 Star Cards</h1>
        <Image className="px-2" src="/images/johnson-card-mockup.png" height={175} />
        <Image className="px-2" src="/images/moore-card-mockup.png" height={175} />
      </Col>
      <Col />
    </Row>
  </Container>
);

export default Encyclopedia;
