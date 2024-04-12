import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const YourCards = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Your Cards</h2>
          </Col>
          <Carousel className="custom-carousel" indicators={false} slide>
            <Carousel.Item>
              <img
                className="your-cards"
                src="https://tinyurl.com/mucz4v5c"
                alt="unknown-card"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="your-cards"
                src="https://tinyurl.com/mucz4v5c"
                alt="unknown-card"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="your-cards"
                src="https://tinyurl.com/mucz4v5c"
                alt="unknown-card"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="your-cards"
                src="https://tinyurl.com/mucz4v5c"
                alt="unknown-card"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="your-cards"
                src="https://tinyurl.com/mucz4v5c"
                alt="unknown-card"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner/>);
};

export default YourCards;
