import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

const AddForm = ({ onChange, onSubmit, selects }) => {
  return (
    <Form onSubmit={onSubmit} horizontal>
      <FormGroup controlId="general_gender">
        <Col componentClass={ControlLabel} sm={2}>
          Gender
        </Col>
        <Col sm={2}>
          <FormControl
            componentClass="select"
            placeholder="Gender"
            onChange={onChange}
            name="general_gender"
          >
            <option defaultValue="">--choose--</option>
            {
              selects.genders.map(gender => <option key={gender} value={gender}>{gender}</option>)
            }
          </FormControl>
        </Col>
      </FormGroup>

      <FormGroup controlId="general_race">
        <Col componentClass={ControlLabel} sm={2}>
          Race
        </Col>
        <Col sm={2}>
          <FormControl
            type="text"
            placeholder="Race"
            onChange={onChange}
            name="general_race"
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="general_age_from">
        <Col componentClass={ControlLabel} sm={2}>
          From age
        </Col>
        <Col sm={2}>
          <FormControl type="number" placeholder="From age" onChange={onChange} name="general_age_from" />
        </Col>
      </FormGroup>

      <FormGroup controlId="general_age_to">
        <Col componentClass={ControlLabel} sm={2}>
          To age
        </Col>
        <Col sm={2}>
          <FormControl type="number" placeholder="To age" onChange={onChange} name="general_age_to" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Add
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

AddForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
};

export default AddForm;
