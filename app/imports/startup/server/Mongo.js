import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Cards } from '../../api/stuff/Cards';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

// Initialize the database with default cards.
const addCards = (data) => {
  console.log(`Adding ${data.profName}`);
  Cards.collection.insert(data);
};

// Initialize the Cards collection if empty.
if (Cards.collection.find().count() === 0) {
  if (Meteor.settings.defaultCards) {
    console.log('Creating default cards.');
    Meteor.settings.defaultCards.forEach(data => addCards(data));
  }
}
