import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Cards } from '../../api/card/Cards';

/**
 * Trade cards by swapping the owners of two cards.
 */
const tradeCardsMethod = 'Cards.trade';

Meteor.methods({
  // server side code

  'cards.setForSale'(cardId, isForSale) {
    check(cardId, String);
    check(isForSale, Boolean);
    Cards.collection.update(cardId, {
      $set: { isForSale: !isForSale },
    });
  },

  'Cards.trade'(cardId1, cardId2) {
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

    // Ensure rarity checks
    if (card2.rarity < card1.rarity) {
      throw new Meteor.Error('low-rarity', 'Cannot trade a card with a lower rarity.');
    }

    // Update the owners of the cards
    Cards.collection.update(card1._id, { $set: { owner: owner2 } });
    Cards.collection.update(card2._id, { $set: { owner: owner1 } });
    // Resets isForSale
    Cards.collection.update(card1._id, { $set: { isForSale: false } });
    Cards.collection.update(card2._id, { $set: { isForSale: false } });

    return 'Trade successful.';
  },

  'cards.giftRandom'(userId) {
    console.log('giftRandom');
    check(userId, String);

    // Ensure the user exists
    const user = Meteor.users.findOne(userId);
    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found.');
    }

    // // Check if the user has received a gift in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (user.lastGiftReceived && user.lastGiftReceived > oneDayAgo) {
      console.log('date/time err');
      // alert user on front end
      throw new Meteor.Error('gift-received', 'User has already received a gift in the last 24 hours.');
    }
    Meteor.users.update(userId, { $set: { lastGiftReceived: new Date() } });
    return 'Gift successful.';
  },
});

export { tradeCardsMethod };
