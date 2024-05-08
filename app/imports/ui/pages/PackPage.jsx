import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const PackPage = () => {
  const { _id } = useParams();
  // Set default state for dropdown menu
  // console.log('TradeCard', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Get access to all cards.
    const sub1 = Meteor.subscribe('allCards');
    // Determine if the subscription is ready
    const rdy = sub1.ready();
    // Get documents
    // Get current user's card collection
    return {
      current: sub1,
      ready: rdy,
    };
  }, [_id]);

  const addRandomCard = () => {
    Meteor.call('cards.giftRandom', Meteor.userId(), (error, result) => {
      console.log('trying to add random card');
      if (error) {
        if (error.error === 'gift-received') {
          console.error('You have already opened your daily pack. Please try again in 24 hours.');
        } else {
          console.error('Error gifting card:', error);
        }
      } else {
        console.log(result);
      }
    });
  };
  return (ready) ? (
    <div className="container3" style={{ height: '500px' }}>
      <div style={{ textAlign: 'center', color: 'black', height: '0px', marginRight: '8vw', flexDirection: 'column', marginBottom: '840px' }}>
        <h3 className="center-header3">Every day at 8:00 A.M. HST, all users get a free card pack,<br />
          the <b>Standard Pack</b>.
        </h3>
        <div style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '4vh' }}>
          <img
            className="pack-previews"
            src="https://tinyurl.com/yus9ra3j"
            alt="lol"
          />
        </div>
      </div>
      <div style={{ marginTop: '5vh' }}>
        <div>
          <h1 className="center-header5">Standard</h1>
        </div>
        <div>
          <img className="center-cards6" src="https://tinyurl.com/mukdjetz" alt="lol" />
        </div>
        <div>
          <Button variant="primary" onClick={() => addRandomCard()}>Add to Marketplace</Button>
        </div>
      </div>
    </div>
  ) : <LoadingSpinner />;
};

const PackPageAndButtons = () => (
  <PackPage />
);
export default PackPageAndButtons;
