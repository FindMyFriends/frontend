import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import flat, * as f from 'flat';
import extend from 'extend';
import { add, genders, ethnicGroups, bodyBuilds, hairColors, lengthUnits, beardColors, shapes, ratings, eyebrowColors, eyeColors, nailColors, timelineSides, breastSizes, hairStyles } from './../../demands/endpoints';
import * as enumSet from './../../enum';
import Form from './../../demands/Form';

class Add extends React.Component {
  state = {
    step: {
      major: 1,
      minor: 0,
    },
    demand: {
      general: {
        firstname: 'Dominik',
        lastname: null,
        gender: 'woman',
        ethnic_group_id: 1,
        age: {
          from: 15,
          to: 20,
        },
      },
      body: {
        build_id: 1,
        weight: {
          unit: 'kg',
          value: 60,
        },
        height: {
          unit: 'cm',
          value: 180,
        },
        breast_size: 'A',
      },
      hair: {
        style_id: 1,
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
          moment: '2017-01-01T13:58:10+00:00',
          timeline_side: 'sooner or later',
          approximation: 'PT10H',
        },
      },
    },
  };

  componentDidMount() {
    this.props.dispatch(genders());
    this.props.dispatch(ethnicGroups());
    this.props.dispatch(bodyBuilds());
    this.props.dispatch(hairColors());
    this.props.dispatch(lengthUnits());
    this.props.dispatch(beardColors());
    this.props.dispatch(shapes());
    this.props.dispatch(ratings());
    this.props.dispatch(eyebrowColors());
    this.props.dispatch(eyeColors());
    this.props.dispatch(nailColors());
    this.props.dispatch(timelineSides());
    this.props.dispatch(breastSizes());
    this.props.dispatch(hairStyles());
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleTurn = this.handleTurn.bind(this);

  handleChange(event) {
    this.setState({
      demand: {
        ...extend(
          true,
          {},
          this.state.demand,
          f.unflatten({ [event.target.name]: event.target.value }),
        ),
      },
    });
  }

  handleSubmit(event) {
    const {
      genders, ethnicGroups, dispatch,
    } = this.props;
    dispatch(add(this.state.demand, { genders, ethnicGroups }));
    event.preventDefault();
  }

  handleTurn(major, minor) {
    this.setState({
      ...this.state,
      step: { major, minor },
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
  ethnicGroups: PropTypes.object.isRequired,
};

export default connect(state => ({
  genders: state.demandSchema.genders || [],
  timelineSides: state.demandSchema.timelineSides || [],
  ethnicGroups: state.demandSchema.ethnicGroups || enumSet.empty(),
  bodyBuilds: state.demandSchema.bodyBuilds || enumSet.empty(),
  hairColors: state.demandSchema.hairColors || enumSet.emptyColor(),
  beardColors: state.demandSchema.beardColors || enumSet.emptyColor(),
  eyebrowColors: state.demandSchema.eyebrowColors || enumSet.emptyColor(),
  eyeColors: state.demandSchema.eyeColors || enumSet.emptyColor(),
  nailColors: state.demandSchema.nailColors || enumSet.emptyColor(),
  ratings: state.demandSchema.ratings || enumSet.emptyRange(),
  lengthUnits: state.demandSchema.lengthUnits || [],
  shapes: state.demandSchema.shapes || [],
  breastSizes: state.demandSchema.breastSizes || [],
  hairStyles: state.demandSchema.hairStyles || enumSet.empty(),
}))(Add);
