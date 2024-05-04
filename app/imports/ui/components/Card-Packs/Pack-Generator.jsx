import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import Button from 'react-bootstrap/Button';
import { Meteor } from 'meteor/meteor';
import CardPool from '../../../../client/CardPool';
import { YourCards } from '../../../api/YourCards';

const { items } = CardPool.cards;
let cardPool = null;

const AddYourCard = (newCard) => {
  const owner = Meteor.user().username;
  for (let cards = 0; cards < newCard.length; cards++) {
    const currentCard = newCard[cards];
    YourCards.collection.insert({
      name: currentCard.name,
      image: currentCard.image,
      rarity: currentCard.rarity,
      desc: currentCard.desc,
      copies: 1,
      owner: owner,
      trade: false,
    });
  }
};

const generateCard = (rarity) => {
  cardPool = items.filter(cards => cards.rarity === rarity);
  return (cardPool[Math.floor(Math.random() * cardPool.length)]);
};

const StandardPack = () => {
  const random = (Math.floor(Math.random() * 100) + 1);
  switch (true) {
  case (random >= 1 && random <= 39):
    return generateCard(1);
  case (random >= 40 && random <= 74):
    return generateCard(2);
  case (random >= 75 && random <= 94):
    return generateCard(3);
  case (random >= 95 && random <= 99):
    return generateCard(4);
  case (random === 100):
    return generateCard(5);
  default:
    return null;
  }
};

const AdvancedPack = () => {
  const random = (Math.floor(Math.random() * 100) + 1);
  switch (true) {
  case (random >= 1 && random <= 39):
    return generateCard(2);
  case (random >= 40 && random <= 74):
    return generateCard(3);
  case (random >= 75 && random <= 94):
    return generateCard(4);
  case (random >= 95 && random <= 100):
    return generateCard(5);
  default:
    return null;
  }
};

const UltimatePack = () => {
  const random = (Math.floor(Math.random() * 100) + 1);
  switch (true) {
  case (random >= 1 && random <= 50):
    return generateCard(3);
  case (random >= 51 && random <= 90):
    return generateCard(4);
  case (random >= 91 && random <= 100):
    return generateCard(5);
  default:
    return null;
  }
};

const isCardDuplicate = (newCard, packItems) => packItems.some(card => card !== undefined && card.name === newCard.name && card.rarity === newCard.rarity);

const generatePack = (packType) => {
  const packItems = Array(4);
  switch (packType) {
  case 0:
    for (let index = 0; index < 4; index++) {
      let newCard = StandardPack();
      while (isCardDuplicate(newCard, packItems)) {
        newCard = StandardPack();
      }
      packItems[index] = newCard;
    }
    return packItems;
  case 1:
    for (let index = 0; index < 4; index++) {
      let newCard = AdvancedPack();
      while (isCardDuplicate(newCard, packItems)) {
        newCard = AdvancedPack();
      }
      packItems[index] = newCard;
    }
    return packItems;
  case 2:
    for (let index = 0; index < 4; index++) {
      let newCard = UltimatePack();
      while (isCardDuplicate(newCard, packItems)) {
        newCard = UltimatePack();
      }
      packItems[index] = newCard;
    }
    return packItems;
  default:
    return null;
  }
};
// eslint-disable-next-line react/prop-types
const FlippableCard = ({ frontImage, backImage, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Memoize the handleClick function using useCallback
  const handleClick = () => {
    setIsFlipped(prevIsFlipped => !prevIsFlipped);
    onClick();
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div key="front" onClick={handleClick}>
        <img style={{ width: '170px' }} src={frontImage} alt="Front" />
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div key="back">
        <img style={{ width: '170px' }} src={backImage} alt="Back" />
      </div>
    </ReactCardFlip>
  );
};
// eslint-disable-next-line consistent-return,react/prop-types
const ShowButton = ({ clicks, onClickLeave }) => {
  const handleClick = () => {
    onClickLeave();
  };
  if (clicks === 4) {
    return (
      <Button className="custom-button5" onClick={handleClick}>
        <h1 className="custom-button-text">Done</h1>
      </Button>
    );
  }
};

// eslint-disable-next-line react/prop-types
const ForESLint = ({ booleanHere }) => {
  if (booleanHere) {
    return null;
  }
  return null;
};

// eslint-disable-next-line consistent-return,react/prop-types
const FlippableCardsContainer = ({ modalShow, packType, onClickExit }) => {
  const [openedAll, setOpenedAll] = useState(false);
  const cardsOpened = useRef(0);
  const generateNewPack = useCallback((whichType) => {
    const pack = generatePack(whichType);
    AddYourCard(pack);
    return [
      { front: 'https://tinyurl.com/3fw8x78y', back: pack[0].image },
      { front: 'https://tinyurl.com/3fw8x78y', back: pack[1].image },
      { front: 'https://tinyurl.com/3fw8x78y', back: pack[2].image },
      { front: 'https://tinyurl.com/3fw8x78y', back: pack[3].image },
    ];
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // noinspection com.intellij.reactbuddy.ExhaustiveDepsInspection
  const images = useMemo(() => {
    if (!modalShow) {
      ForESLint(openedAll);
      return [];
    }
    return generateNewPack(packType);
    /* There's got to be a better way to code this lol.
       If you correct the warning from ES Lint, the pack
       generated by this file will essentially duplicate
       itself when you flip over the last flipped card.
    */
  }, [generateNewPack, packType, modalShow]);

  const handleClick = () => {
    cardsOpened.current += 1;
    if (cardsOpened.current === 4) {
      setOpenedAll(true);
    }
  };

  if (!modalShow) {
    return null;
  }

  return (
    <div>
      <div style={{ justifyContent: 'space-evenly', marginTop: '5vh', display: 'flex' }}>
        {images.map((image, index) => (
          <FlippableCard key={index} frontImage={image.front} backImage={image.back} onClick={handleClick} />
        ))}
      </div>
      <div style={{ justifyContent: 'center', marginTop: '126px', display: 'flex', marginRight: '15px' }}>
        <ShowButton clicks={cardsOpened.current} onClickLeave={onClickExit} />
      </div>
    </div>
  );
};

export default FlippableCardsContainer;
