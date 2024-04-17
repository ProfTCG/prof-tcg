import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single professor trading card in the Encyclopedia. See pages/Encyclopedia.jsx. */
const ProfCard = ({ profCard }) => (
  // TODO: Determine display format, determine card schema(s). See stuff/Cards.js
  <Card>
    <Card.Header>
      <Image width="75" src={profCard.image} />
      <Card.Title>{profCard.profName}</Card.Title>
      <Card.Subtitle>{profCard.rarity}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{profCard.backText}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfCard.propTypes = {
  profCard: PropTypes.shape({
    profName: PropTypes.string,
    rarity: PropTypes.string,
    image: PropTypes.string,
    backText: PropTypes.string,
  }).isRequired,
};

export default ProfCard;
