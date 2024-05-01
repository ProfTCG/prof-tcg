import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class YourCardsCollection {
  constructor() {
    this.name = 'YourCardsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      name: String,
      image: String,
      owner: String,
      desc: String,
      rarity: Number,
      copies: Number,
      trade: false,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * @type {YourCardsCollection}
 */
export const YourCards = new YourCardsCollection();
