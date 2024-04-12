import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Col, Row, Image } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container>
      <Row>
        <Col id="signout-page" className="text-center py-3"><h2>You have successfully signed out. Come again soon!</h2></Col>
      </Row>
      <Row>
        <Col />
        <Col>
          <Image src="/images/sunglasses-thumbsup.gif" />
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default SignOut;
