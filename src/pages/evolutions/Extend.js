import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import flat, * as f from 'flat';
import * as R from 'ramda';
import Form from './../../evolution/input/Form';
import {
  getSex,
  getEthnicGroups,
  getBreastSizes,
  getBodyBuilds,
  getHairStyles,
  getLengthUnits,
  getShapes,
  getHairColors,
  getBeardColors,
  getEyebrowColors,
  getEyeColors,
  getNailColors,
  getRatings,
} from './../../description/selects';
import { ActionItems } from './menu/Extend/Items';
import { extend, single, options, schema } from './../../evolution/endpoints';
import { test } from '../../evolution/sample';

class Extend extends React.Component {
  state = {
    step: {
      major: 1,
      minor: 0,
    },
    progress: {},
  };

  componentDidMount() {
    const { dispatch, handleMenu, match: { params: { id } } } = this.props;
    dispatch(options());
    dispatch(schema());
    dispatch(single(id))
      .then(change => this.setState({
        progress: merge(
          test(),
          {
            ...this.state.progress,
            ...change,
          },
        ),
      }));
    handleMenu({
      filter: {
        title: 'Extend',
      },
      action: <ActionItems id={id} />,
    });
  }

  handleChange = (event) => {
    this.setState({
      progress: {
        ...merge(
          this.state.progress,
          f.unflatten({ [event.target.name]: event.target.value }),
        ),
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, progress, history } = this.props;
    const evolution = merge(
      progress,
      f.unflatten(this.state.progress),
    );
    delete evolution.general.age;
    dispatch(extend(evolution, history));
  };

  handleTurn = (major, minor) => {
    this.setState({
      ...this.state,
      step: { major, minor },
    });
  };

  render() {
    if (R.isEmpty(this.state.progress)) {
      return <h1>Loading...</h1>;
    }
    return (
      <Form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onTurn={this.handleTurn}
        selects={{ ...this.props }}
        values={flat(this.state.progress)}
        step={this.state.step}
      >
        Extend
      </Form>
    );
  }
}

Extend.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  progress: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleMenu: PropTypes.func.isRequired,
};

export default connect(state => ({
  sex: getSex(state.evolution.options),
  ethnicGroups: getEthnicGroups(state.evolution.options),
  bodyBuilds: getBodyBuilds(state.evolution.options),
  hairColors: getHairColors(state.evolution.options),
  beardColors: getBeardColors(state.evolution.options),
  eyebrowColors: getEyebrowColors(state.evolution.options),
  eyeColors: getEyeColors(state.evolution.options),
  nailColors: getNailColors(state.evolution.options),
  ratings: getRatings(state.evolution.schema),
  lengthUnits: getLengthUnits(state.evolution.options),
  shapes: getShapes(state.evolution.options),
  breastSizes: getBreastSizes(state.evolution.options),
  hairStyles: getHairStyles(state.evolution.options),
  progress: state.evolution.single || {},
}))(Extend);
