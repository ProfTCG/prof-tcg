import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The Cards Collection. It encapsulates state and variable values for cards.
 */
class CardsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CardsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    // TODO:determine what goes in card schema
    // TODO:determine method to determine rarity
    this.schema = new SimpleSchema({ // prof johnson example in comments
      profName: String, // Philip Johnson
      rarity: Number, // dependent on some factors
      profImage: String, // link to image //I think this MUST be SQUARE
      border: String, // border thing
      backImage: String, // bg image if nesc - does not work rn
      backText: String, // Prof Johnson teaches ICS 314, and built OpenPowerQuality
      owner: String, // user that the card belongs to
      isForSale: Boolean, // is the card for sale on the marketplace?
    });

    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {CardsCollection}
 */
export const Cards = new CardsCollection();
