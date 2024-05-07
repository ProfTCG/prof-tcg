import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import UserPacks from '../../../../client/UserPacks';
import PackOpenButton from './Pack-Opener';

const userPacks = UserPacks.count;

const PackPage = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [packsRequired, setPacksRequired] = useState(1);
  const [packType, setPackType] = useState('Standard Pack');
  const [packCountingButton, setPackCountingButton] = useState(userPacks);

  const handleSlide = (index) => {
    setActiveIndex(index);
    if (index === 1) {
      setPacksRequired(3);
      setPackType('Advanced Pack');
      setPackCountingButton(Math.floor(userPacks / 3));
    } else if (index === 2) {
      setPacksRequired(5);
      setPackType('Graduate Pack');
      setPackCountingButton(Math.floor(userPacks / 5));
    } else {
      setPacksRequired(1);
      setPackType('Standard Pack');
      setPackCountingButton(userPacks);
    }
  };
  const handlePreviewClick = (index) => {
    handleSlide(index);
  };
  return (
    <div className="container3" style={{ height: '500px' }}>
      <div style={{ textAlign: 'center', color: 'black', height: '0px', marginRight: '8vw', flexDirection: 'column', marginBottom: '840px' }}>
        <YouHavePacks packCount={userPacks} />
        <h3 className="center-header3">Every day at 8:00 A.M. HST, all users get a free card pack,<br />
          the <b>Standard Pack</b>. You can either open these packs now,<br />
          or trade them in later for card packs of <b>improved rarities</b>.<br />
        </h3>
        <div style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '4vh' }}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            className="pack-previews"
            onClick={() => handlePreviewClick(0)}
            src="https://tinyurl.com/yus9ra3j"
            alt="lol"
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            className="pack-previews"
            onClick={() => handlePreviewClick(1)}
            src="https://tinyurl.com/48ph88t5"
            alt="lol"
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            className="pack-previews"
            onClick={() => handlePreviewClick(2)}
            src="https://tinyurl.com/5acw59jf"
            alt="lol"
          />
        </div>
      </div>
      <div style={{ marginTop: '5vh' }}>
        <div>
          <h1 className="center-header5">{packType}</h1>
        </div>
        <div>
          <Carousel className="custom-carousel4" indicators={false} interval={null} fade activeIndex={activeIndex} onSelect={handleSlide}>
            <Carousel.Item>
              <img className="center-cards6" src="https://tinyurl.com/mukdjetz" alt="lol" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="center-cards6" src="https://tinyurl.com/867yyupe" alt="lol" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="center-cards6" src="https://tinyurl.com/5axftyey" alt="lol" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div>
          <OpenPack
            packsAvailable={packCountingButton}
            requiredPacks={packsRequired}
            packType={activeIndex}
          />
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const YouHavePacks = ({ packCount }) => {
  if (packCount === 1) {
    return (
      <h1 className="center-header4">You have 1 Standard Pack</h1>
    );
  }
  return (
    <h1 className="center-header4">You have {packCount} Standard Packs</h1>
  );
};

// eslint-disable-next-line react/prop-types
const OpenPack = ({ packType, requiredPacks }) => {

  if (userPacks < requiredPacks) {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', margin: '-7vh 1vw auto 0', position: 'relative' }}>
          <PackOpenButton
            buttonType={3}
            packTypeCounter={packType}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', margin: '-7vh 1vw auto 0', position: 'relative' }}>
        <PackOpenButton
          packCounter={1}
          buttonType={1}
          packTypeCounter={packType}
        />
      </div>
    </div>
  );
};

const PackPageAndButtons = () => (
  <PackPage />
);
export default PackPageAndButtons;
