import React from 'react';
import PropTypes from 'prop-types';
import {
  Form as BootstrapForm,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

const Form = ({
  onChange, onSubmit, selects, values, label,
}) => {
  return (
    <BootstrapForm onSubmit={onSubmit} horizontal>
      <FormGroup controlId="general.gender">
        <Col componentClass={ControlLabel} sm={2}>
          Gender
        </Col>
        <Col sm={2}>
          <FormControl
            componentClass="select"
            onChange={onChange}
            value={values['general.gender']}
            name="general.gender"
          >
            <option>--choose--</option>
            {
              selects.genders.map(gender => <option key={gender} value={gender}>{gender}</option>)
            }
          </FormControl>
        </Col>
      </FormGroup>

      <FormGroup controlId="general.race">
        <Col componentClass={ControlLabel} sm={2}>
          Race
        </Col>
        <Col sm={2}>
          <FormControl
            componentClass="select"
            onChange={onChange}
            name="general.race"
            value={values['general.race']}
          >
            <option>--choose--</option>
            {
              selects.races.map(race => <option key={race} value={race}>{race}</option>)
            }
          </FormControl>
        </Col>
      </FormGroup>

      <FormGroup controlId="general.age.from">
        <Col componentClass={ControlLabel} sm={2}>
          From age
        </Col>
        <Col sm={2}>
          <FormControl
            type="number"
            placeholder="From age"
            onChange={onChange}
            value={values['general.age.from']}
            name="general.age.from"
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="general.age.to">
        <Col componentClass={ControlLabel} sm={2}>
          To age
        </Col>
        <Col sm={2}>
          <FormControl
            type="number"
            placeholder="To age"
            onChange={onChange}
            value={values['general.age.to']}
            name="general.age.to"
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            {label}
          </Button>
        </Col>
      </FormGroup>
    </BootstrapForm>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default Form;
