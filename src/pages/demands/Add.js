import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import flat, * as f from 'flat';
import { add, genders, races, ages, bodyBuilds, skinColors, hairColors, lengthUnits, beardColors, shapes, ratings, eyebrowColors, eyeColors, nailColors } from './../../demands/endpoints';
import * as enumSet from './../../enum';
import Form from './../../demands/Form';

class Add extends React.Component {
  state = {
    step: 3,
    demand: {
      general: {
        firstname: 'Dominik',
        lastname: null,
        gender: 'man',
        race_id: 1,
        age: {
          from: 15,
          to: 20,
        },
      },
      body: {
        build_id: 1,
        skin_color_id: 8, // remove
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
      beard: {
        style: null,
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
      face: {
        freckles: false,
        care: 8,
        shape: 'oval',
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
      location: {
        coordinates: {
          latitude: 50.5,
          longitude: 50.6,
        },
        met_at: {
          from: '2017-01-01T13:58:10+00:00',
          to: '2017-01-01T16:58:10+00:00',
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
    dispatch(add(f.unflatten(this.state.demand), { genders, races, ages }));
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
  races: PropTypes.object.isRequired,
  ages: PropTypes.object.isRequired,
};

export default connect(state => ({
  genders: state.demandSchema.genders || [],
  races: state.demandSchema.races || enumSet.empty(),
  ages: state.demandSchema.ages || {},
  bodyBuilds: state.demandSchema.bodyBuilds || enumSet.empty(),
  skinColors: state.demandSchema.skinColors || enumSet.emptyColor(),
  hairColors: state.demandSchema.hairColors || enumSet.emptyColor(),
  beardColors: state.demandSchema.beardColors || enumSet.emptyColor(),
  eyebrowColors: state.demandSchema.eyebrowColors || enumSet.emptyColor(),
  eyeColors: state.demandSchema.eyeColors || enumSet.emptyColor(),
  nailColors: state.demandSchema.nailColors || enumSet.emptyColor(),
  ratings: state.demandSchema.ratings || enumSet.emptyRange(),
  lengthUnits: state.demandSchema.lengthUnits || [],
  shapes: state.demandSchema.shapes || [],
}))(Add);
