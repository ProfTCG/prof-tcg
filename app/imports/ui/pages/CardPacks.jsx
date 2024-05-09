import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import PackOpenButton from '../components/CardPacks/Pack-Opener';

const CardPacks = () => {
  return (
    <Container className="py-4" style={{ display: 'flex' }}>
      <Row style={{ marginLeft: '80px' }}>
        <Col style={{ position: 'relative', top: '120px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '34px', whiteSpace: 'nowrap' }}>
            Opening Your Card Packs
          </h3>
          <h3 style={{ fontSize: '26px', whiteSpace: 'nowrap'  }}>
            Every 24 hours, all users can open a free <b>Card Pack</b>.<br />
            Each Card Pack contains four random Professors.<br />
            Click on the button below to open one pack.
          </h3>
          <PackOpenButton />
        </Col>
        <Col style={{ position: 'relative', left: '150px', marginTop: '35px' }}>
          <Image style={{ height: '325px' }} src="https://res.cloudinary.com/dxiainweb/image/upload/v1715232501/stock_chest_d6bpok.jpg" alt="Standard Pack Preview" />
        </Col>
      </Row>
    </Container>
  )
};

export default CardPacks;
