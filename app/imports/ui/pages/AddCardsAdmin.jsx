import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Cards } from '../../api/card/Cards.js';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  profName: String,
  rarity: {
    type: Number,
    // https://github.com/Meteor-Community-Packages/meteor-simple-schema#allowedvalues for information on acceptable input validation
    allowedValues: [1, 2, 3, 4],
  },
  profImage: String,
  backImage: String,
  backText: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddCardsAdmin = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { profName, rarity, profImage, backImage, backText } = data;
    const border = `/images/${rarity}star-border.png`;
    const isForSale = false;
    const owner = 'testAdmin';
    Cards.collection.insert(
      { profName, rarity, profImage, border, backImage, backText, isForSale, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;

  return (
    <Container className="py-3" id="add-cards">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Card</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField label="Professor Name" name="profName" />
                <NumField min="1" max="4" name="rarity" decimal={null} />
                <TextField label="Professor Image" name="profImage" />
                <TextField label="Back Image" name="backImage" />
                <LongTextField label="Back Text" name="backText" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCardsAdmin;
