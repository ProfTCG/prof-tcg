import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { YourCards } from '../../api/YourCards';
import LoadingSpinner from './LoadingSpinner';

const SortCollection = () => {

  let { ready, yourCards } = useTracker(() => {
    const subscription = Meteor.subscribe(YourCards.userPublicationName);
    const rdy = subscription.ready();
    const yourCardItems = YourCards.collection.find({}, { sort: { rarity: 1, name: 1 } }).fetch();
    return {
      yourCards: yourCardItems,
      ready: rdy,
    };
  }, []);
  const filterCollection = (currentCards) => {
    const duplicates = [];
    const originals = [];
    for (let index = 0; index < currentCards.length; index++) {
      const current = currentCards[index];
      if (!duplicates.find(dupeCard => dupeCard._id === current._id)) {
        currentCards.forEach(card => {
          if (card.name === current.name
            && card.rarity === current.rarity
            && card._id !== current._id) {
            if (!duplicates.find(dupeCard => dupeCard._id === card._id)) {
              duplicates.push(card);
              if (!originals.find(originalCard => originalCard._id === current._id)) {
                originals.push(current);
              }
            }
          }
        });
      }
    }
    originals.forEach(original => {
      duplicates.forEach(duplicate => {
        if (original.name === duplicate.name
          && original.rarity === duplicate.rarity) {
          YourCards.collection.update({ _id: original._id }, { $set: { copies: original.copies + 1 } });
        }
      });
    });
    duplicates.forEach(dupeCard => {
      YourCards.collection.remove(dupeCard._id);
    });
    yourCards = YourCards.collection.find({}, { sort: { rarity: 1, name: 1 } }).fetch();
    return null;
  };
  return (ready ? (
    <>
      {filterCollection(yourCards)}
    </>
  ) : <LoadingSpinner />);
};

export default SortCollection;
