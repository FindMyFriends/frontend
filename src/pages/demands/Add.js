import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './../../demands/Form';
import flat from 'flat';
import { unflatten as unflat } from 'flat';
import { add, genders, races, ages } from './../../demands/endpoints';
import validatedDemand from './../../demands/rules';

class Add extends React.Component {
  state = {
    step: 1,
    demand: {
      general: {
        gender: 'man',
        race: 'asian',
        age: {
          from: 18,
          to: 22,
        }
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(genders());
    this.props.dispatch(races());
    this.props.dispatch(ages());
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleNext = this.handleNext.bind(this);
  handlePrevious = this.handlePrevious.bind(this);

  handleChange(event) {
    this.setState({
      demand: {
        ...this.state.demand,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    const {
      genders, races, ages, dispatch,
    } = this.props;
    dispatch(add(validatedDemand(
      unflat(this.state.demand),
      { genders, races, ages },
    )));
    event.preventDefault();
  }

  handleNext() {
    this.setState({
      ...this.state,
      step: ++this.state.step,
    });
  }

  handlePrevious() {
    this.setState({
      ...this.state,
      step: --this.state.step,
    });
  }

  render() {
    const { genders, races } = this.props;
    return (
      <div>
        <h1>Add demand</h1>
        <Form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onNext={this.handleNext}
          onPrevious={this.handlePrevious}
          selects={{ genders, races }}
          values={flat(this.state.demand)}
          step={this.state.step}
          label="Add"
        />
      </div>
    );
  }
}

Add.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genders: PropTypes.array.isRequired,
  races: PropTypes.array.isRequired,
  ages: PropTypes.object.isRequired,
};

export default connect(state => ({
  genders: state.demand.genders || [],
  races: state.demand.races || [],
  ages: state.demand.ages || {},
}))(Add);
