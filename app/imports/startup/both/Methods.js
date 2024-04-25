import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Cards } from '../../api/card/Cards';

/**
 * Trade cards by swapping the owners of two cards.
 */
const tradeCardsMethod = 'Cards.trade';

Meteor.methods({
  'Cards.trade'(cardId1, cardId2) {
    console.log('method invoked');

    // Validate method arguments
    check(cardId1, String);
    check(cardId2, String);

    // Retrieve the cards by their IDs
    const card1 = Cards.collection.findOne(cardId1);
    const card2 = Cards.collection.findOne(cardId2);
    // Store owner info
    const owner1 = card1.owner;
    const owner2 = card2.owner;

    // Ensure both cards exist
    if (!card1 || !card2) {
      throw new Meteor.Error('invalid-cards', 'One or both cards do not exist.');
    }

    // Ensure both cards have different owners
    if (owner1 === owner2) {
      throw new Meteor.Error('same-owner', 'Cannot trade cards with the same owner.');
    }

    // Update the owners of the cards
    Cards.collection.update(card1._id, { $set: { owner: owner2 } });
    Cards.collection.update(card2._id, { $set: { owner: owner1 } });

    return 'Trade successful.';
  },
});

export { tradeCardsMethod };
