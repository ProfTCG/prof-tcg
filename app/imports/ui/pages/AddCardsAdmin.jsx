import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import * as _ from 'underscore';
import { Cards } from '../../api/card/Cards.js';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  profName: String,
  rarity: {
    type: Number,
    // https://github.com/Meteor-Community-Packages/meteor-simple-schema#allowedvalues for information on acceptable input validation
    min: 1,
    max: 4,
  },
  backText: String,
  quantity: {
    type: Number,
    min: 1,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

// Add more templates when more images are available
const professorTemplates = [
  { profName: 'Edoardo Biagioni', image: '/images/profImages/edo-card.png' },
  { profName: 'Philip Johnson', image: '/images/profImages/johnson-card.png' },
  { profName: 'Chad Morita', image: '/images/profImages/morita-card.png' },
  { profName: 'Kate Binsted', image: '/images/profImages/binsted-card.png' },
  { profName: 'Henri Casanova', image: '/images/profImages/casanova-card.png' },
  { profName: 'Depeng Li', image: '/images/profImages/li-card.png' },
  { profName: 'Scott Robertson', image: '/images/profImages/robertson-card.png' },
  { profName: 'Dan Suthers', image: '/images/profImages/suthers-card.png' },
  { profName: 'Peter-Michael Seidel', image: '/images/profImages/seidel-card.png' },
  { profName: 'Nodari Sitchinava', image: '/images/profImages/sitchinava-card.png' },
];

/* Renders the AddCardsAdmin page for adding a document. */
const AddCardsAdmin = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    // Data from the form
    const { profName, rarity, backText, quantity } = data;
    let { profImage, backImage } = '/images/temp-logo.jpg';
    // If we have a template for this professor, use the image linked in the template instead of temp placeholder
    const professor = _.find(professorTemplates, (someone) => someone.profName === profName);
    if (professor !== undefined) {
      profImage = professor.image;
      backImage = profImage;
    }
    const border = `/images/${rarity}star-border.png`;
    const isForSale = false;
    const owner = 'testAdmin';
    for (let i = 0; i < quantity; i++) {
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
    }
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;

  const professorOptions = _.map(professorTemplates, (professor) => ({ label: professor.profName, value: professor.profName }));

  return (
    <Container className="py-3" id="add-cards">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Card</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <SelectField label="Professor Name" name="profName" options={professorOptions} />
                <NumField min="1" max="4" name="rarity" decimal={null} />
                <LongTextField label="Back Text" name="backText" />
                <NumField min="1" name="quantity" decimal={null} />
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
