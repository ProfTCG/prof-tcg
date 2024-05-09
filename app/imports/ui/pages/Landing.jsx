import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Cards } from '../../api/card/Cards';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfCard from '../components/ProfCard';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array]; // Create a new array to hold shuffled elements
    let currentIndex = shuffledArray.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap elements between currentIndex and randomIndex
      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  };

  const { ready, cards } = useTracker(() => {
  // Get access to admin cards.
    const subscription = Meteor.subscribe('allCards');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Retrieve admin cards docs
    const docs = Cards.collection.find({ owner: 'encyclopedia' }).fetch();
    // Pick 3 random cards
    const random = shuffleArray(docs).slice(0, 3); // shuffleArray is a function to shuffle the array
    return {
      cards: random,
      ready: rdy,
    };
  }, []);

  return (ready ? (
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

      <Row className="align-middle text-center d-flex justify-content-center">
        <Col className="px-5 mx-5 d-flex flex-column justify-content-center align-items-center">
          <h4>Collect cards, trade with friends, and learn more about your UH Manoa professors!</h4>
          <Button href="/signup" variant="dark" className="my-2" size="lg">Join Today!</Button>
        </Col>
        <Col className="mx-5 d-flex justify-content-center">
          { // Display 3 random cards from Admins collection
            cards.map((prof, index) => (
              <div className="m-3" key={index} style={{ width: '300px', height: '400px' }}>
                <ProfCard profCard={prof} />
              </div>
            ))
          }
        </Col>
      </Row>

      <Row className="align-middle text-center">
        <h5 className="text-muted fw-light">Click on the cards to learn more about each professor!</h5>
      </Row>

    </Container>
  ) : <LoadingSpinner />);
};

export default Landing;
