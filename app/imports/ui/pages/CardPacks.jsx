import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import PackOpenButton from '../components/CardPacks/Pack-Opener';

const CardPacks = () => {
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
    <Container className="py-4" style={{ display: 'flex' }}>
      <Row style={{ marginLeft: '50px' }}>
        <Col style={{ position: 'relative', top: '120px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '34px', whiteSpace: 'nowrap' }}>
            Opening Your Card Packs
          </h3>
          <h3 style={{ fontSize: '26px', whiteSpace: 'nowrap'  }}>
            Every 24 hours, all users can open a free <b>Card Pack</b>.<br />
            Each Card Pack contains four random Professors.<br />
            For the drop rates of each rarity, click here.
          </h3>
          <PackOpenButton
            packCounter={1}
            buttonType={1}
            packTypeCounter={0}
          />
        </Col>
        <Col style={{ position: 'relative', left: '150px', marginTop: '45px' }}>
          <Image src="https://tinyurl.com/mukdjetz" alt="Standard Pack Preview" />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default CardPacks;
