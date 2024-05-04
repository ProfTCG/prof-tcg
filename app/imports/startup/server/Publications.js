import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Cards } from '../../api/card/Cards';
import { YourCards } from '../../api/YourCards';
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
// for some reason this breaks the app, the cards don't show up when this is the publish we use. the below userpublicationname works fine
Meteor.publish(Cards.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Cards.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Cards.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Cards.collection.find();
  }
  return this.ready();
});

// Global-level publication.
// Publication for all cards, to be used on marketplace and encyclopedia.
Meteor.publish('allCards', function () {
  return Cards.collection.find();
});

// Planning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(YourCards.userPublicationName, function () {
  if (this.userId) {
    const userName = Meteor.users.findOne(this.userId).username;
    return YourCards.collection.find({ owner: userName });
  }
  return this.ready();
});

Meteor.publish(YourCards.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return YourCards.collection.find();
  }
  return this.ready();
});
