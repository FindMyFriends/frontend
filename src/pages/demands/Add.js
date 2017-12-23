import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './../../demands/Form';
import flat from 'flat';
import { unflatten as unflat } from 'flat';
import { add, genders, races, ages, bodyBuilds, skinColors, hairColors, lengthUnits, beardColors, shapes, ratings, eyebrowColors, eyeColors } from './../../demands/endpoints';
import validatedDemand from './../../demands/rules';

class Add extends React.Component {
  state = {
    step: 5,
    demand: {
      general: {
        firstname: 'Dominik',
        gender: 'man',
        race: 'asian',
        age: {
          from: 18,
          to: 22,
        }
      },
      body: {
        build: 'skinny',
        skin: 'white',
        weight: 60,
        height: 181,
      },
      hair: {
        style: 'normal',
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(genders());
    this.props.dispatch(races());
    this.props.dispatch(ages());
    this.props.dispatch(bodyBuilds());
    this.props.dispatch(skinColors());
    this.props.dispatch(hairColors());
    this.props.dispatch(lengthUnits());
    this.props.dispatch(beardColors());
    this.props.dispatch(shapes());
    this.props.dispatch(ratings());
    this.props.dispatch(eyebrowColors());
    this.props.dispatch(eyeColors());
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleTurn = this.handleTurn.bind(this);

  handleChange(event) {
    this.setState({
      demand: {
        ...this.state.demand,
        [event.target.name]: event.target.value,
      },
    });
    console.log(this.state);
  }

  handleSubmit(event) {
    const { genders, races, ages, dispatch } = this.props;
    dispatch(add(validatedDemand(
      unflat(this.state.demand),
      { genders, races, ages },
    )));
    event.preventDefault();
  }

  handleTurn(move) {
    this.setState({
      ...this.state,
      step: this.state.step + move,
    });
  }

  render() {
    return (
      <div>
        <h1>Add demand</h1>
        <Form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onTurn={this.handleTurn}
          selects={{...this.props}}
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
  bodyBuilds: PropTypes.array.isRequired,
  skinColors: PropTypes.array.isRequired,
  hairColors: PropTypes.object.isRequired,
  beardColors: PropTypes.object.isRequired,
  eyebrowColors: PropTypes.object.isRequired,
  eyeColors: PropTypes.object.isRequired,
  ratings: PropTypes.object.isRequired,
  lengthUnits: PropTypes.array.isRequired,
  shapes: PropTypes.array.isRequired,
};

export default connect(state => ({
  genders: state.demand.genders || [],
  races: state.demand.races || [],
  ages: state.demand.ages || {},
  bodyBuilds: state.demand.bodyBuilds || [],
  skinColors: state.demand.skinColors || [],
  hairColors: state.demand.hairColors || { hex: [], name: [] },
  beardColors: state.demand.beardColors || { hex: [], name: [] },
  eyebrowColors: state.demand.eyebrowColors || { hex: [], name: [] },
  eyeColors: state.demand.eyeColors || { hex: [], name: [] },
  ratings: state.demand.ratings || { minimum: 0, maximum: 1 },
  lengthUnits: state.demand.lengthUnits || [],
  shapes: state.demand.shapes || [],
}))(Add);
