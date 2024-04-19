import { Meteor } from 'meteor/meteor';
import { Cards } from '../../api/stuff/Cards.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Cards.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Cards.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
