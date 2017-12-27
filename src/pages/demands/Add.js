import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import flat, * as f from 'flat';
import { add, genders, races, ages, bodyBuilds, skinColors, hairColors, lengthUnits, beardColors, shapes, ratings, eyebrowColors, eyeColors, nailColors } from './../../demands/endpoints';
import Form from './../../demands/Form';
import validatedDemand from './../../demands/rules';

class Add extends React.Component {
  state = {
    step: 11,
    demand: {
      general: {
        firstname: 'Dominik',
        gender: 'man',
        race: 'asian',
        age: {
          from: 18,
          to: 22,
        },
      },
      body: {
        build: 'skinny',
        skin: 'White',
        weight: 60,
        height: 181,
      },
      hair: {
        style: 'normal',
        color_id: 8,
        length: {
          value: 5,
          unit: 'cm',
        },
        highlights: false,
        roots: false,
        nature: true,
      },
      face: {
        care: 8,
        shape: 'oval',
        beard: {
          color_id: 8,
          length: {
            value: 2,
            unit: 'mm',
          },
        },
        eyebrow: {
          care: 7,
          color_id: 8,
        },
        eye: {
          left: {
            color_id: 8,
            lenses: true,
          },
          right: {
            color_id: 8,
            lenses: true,
          },
        },
        teeth: {
          care: 6,
          braces: false,
        },
      },
      hands: {
        care: 9,
        vein_visibility: 5,
        joint_visibility: 8,
        nails: {
          color_id: 8,
          length: {
            value: 1,
            unit: 'cm',
          },
          care: 4,
        },
        hair: {
          amount: 3,
          color_id: 8,
        },
      },
    },
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
    this.props.dispatch(nailColors());
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
  }

  handleSubmit(event) {
    const {
      genders, races, ages, dispatch,
    } = this.props;
    dispatch(add(validatedDemand(
      f.unflatten(this.state.demand),
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
          selects={{ ...this.props }}
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
  genders: state.demandSchema.genders || [],
  races: state.demandSchema.races || [],
  ages: state.demandSchema.ages || {},
  bodyBuilds: state.demandSchema.bodyBuilds || [],
  skinColors: state.demandSchema.skinColors || [],
  hairColors: state.demandSchema.hairColors || { hex: [], name: [] },
  beardColors: state.demandSchema.beardColors || { hex: [], name: [] },
  eyebrowColors: state.demandSchema.eyebrowColors || { hex: [], name: [] },
  eyeColors: state.demandSchema.eyeColors || { hex: [], name: [] },
  nailColors: state.demandSchema.nailColors || { hex: [], name: [] },
  ratings: state.demandSchema.ratings || { minimum: 0, maximum: 10 },
  lengthUnits: state.demandSchema.lengthUnits || [],
  shapes: state.demandSchema.shapes || [],
}))(Add);
