import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The Cards Collection. It encapsulates state and variable values for stuff.
 */
class CardsCollection {
    constructor() {
        // The name of this collection.
        this.name = 'CardsCollection';
        // Define the Mongo collection.
        this.collection = new Mongo.Collection(this.name);
        // Define the structure of each document in the collection.
        //TODO:determine what goes in card schema
        //TODO:determine method to determine rarity
        this.schema = new SimpleSchema({ // prof johnson example in comments
            profname: String, //Philip Johnson
            rarity: String, // dependent on some factors
            image: String, //link to image
            backtext: String, // Prof Johnson teaches ICS 314, and built OpenPowerQuality
            owner: String }); //user that the card belongs to

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
export const Contacts = new CardsCollection();