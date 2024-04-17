import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single professor trading card in the Encyclopedia. See pages/Encyclopedia.jsx. */
const ProfCard = ({ profCard }) => (
  // TODO: Determine display format, determine card schema(s). See stuff/Cards.js
  <div style={{ backgroundImage: `url(${profCard.image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '300px', height: '400px' }}>
    <p>{profCard.profName}</p>
    <p>{profCard.rarity}</p>
    <p>{profCard.backText}</p>
  </div>
);

// Require a document to be passed to this component.
ProfCard.propTypes = {
  profCard: PropTypes.shape({
    profName: PropTypes.string,
    rarity: PropTypes.number,
    image: PropTypes.string,
    backText: PropTypes.string,
  }).isRequired,
};

export default ProfCard;
