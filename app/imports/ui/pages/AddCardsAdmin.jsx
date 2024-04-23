import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, BoolField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  profName: String,
  rarity: Number,
  profImage: String,
  border: String,
  backImage: String,
  backText: String,
  isForSale: Boolean,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddCardsAdmin = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { profName, rarity, profImage, border, backImage, backText, isForSale } = data;
    Stuffs.collection.insert(
      { profName, rarity, profImage, border, backImage, backText, isForSale },
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
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField extra="Professor Name" name="profName" />
                {
                  // may need to set max to 5
                }
                <NumField min="1" max="4" name="rarity" decimal={null} />
                <TextField name="profImage" />
                <TextField name="border" />
                <TextField name="backImage" />
                <TextField name="backText" />
                <BoolField name="isForSale" />
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
