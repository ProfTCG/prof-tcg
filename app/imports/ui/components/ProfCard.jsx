import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single professor trading card in the Encyclopedia. See pages/Encyclopedia.jsx. */
const ProfCard = ({ profCard }) => (
  // TODO: Determine display format, determine card schema(s). See stuff/Cards.js
  <div className="container">
    <img
      style={{ backgroundImage: `url(${profCard.profImage})`, backgroundRepeat: 'no-repeat', backgroundSize: '264px 350px', backgroundPosition: 'center', width: '300px', height: '400px' }}
      src={profCard.border}
      alt="professor card"
    />

    <div className="top-left">{profCard.profName}</div>
    <div className="bottom-left">{profCard.rarity}</div>
    <p>{profCard.backText}</p>
  </div>
);

// Require a document to be passed to this component.
ProfCard.propTypes = {
  profCard: PropTypes.shape({
    profName: PropTypes.string,
    rarity: PropTypes.number,
    border: PropTypes.string,
    profImage: PropTypes.string,
    backImage: PropTypes.string,
    backText: PropTypes.string,
  }).isRequired,
};

export default ProfCard;
