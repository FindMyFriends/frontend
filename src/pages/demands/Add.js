import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import flat, * as f from 'flat';
import merge from 'lodash/merge';
import {
  getGenders,
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
import { getTimelineSides } from './../../demand/reducers';
import { add, options, schema } from './../../demand/endpoints';
import { test } from './../../demand/sample';
import Form from './../../demand/input/Form';

class Add extends React.Component {
  state = {
    step: {
      major: 3,
      minor: 1,
    },
    demand: test(),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(options());
    dispatch(schema());
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleTurn = this.handleTurn.bind(this);

  handleChange(event) {
    this.setState({
      demand: {
        ...merge(
          this.state.demand,
          f.unflatten({ [event.target.name]: event.target.value }),
        ),
      },
    });
  }

  handleSubmit(event) {
    const { dispatch, history } = this.props;
    dispatch(add(this.state.demand, history));
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
      <Form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onTurn={this.handleTurn}
        selects={{ ...this.props }}
        values={flat(this.state.demand)}
        step={this.state.step}
      >
      Add
      </Form>
    );
  }
}

Add.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(state => ({
  genders: getGenders(state.demand.options),
  ethnicGroups: getEthnicGroups(state.demand.options),
  bodyBuilds: getBodyBuilds(state.demand.options),
  hairColors: getHairColors(state.demand.options),
  beardColors: getBeardColors(state.demand.options),
  eyebrowColors: getEyebrowColors(state.demand.options),
  eyeColors: getEyeColors(state.demand.options),
  nailColors: getNailColors(state.demand.options),
  ratings: getRatings(state.demand.schema),
  lengthUnits: getLengthUnits(state.demand.options),
  shapes: getShapes(state.demand.options),
  breastSizes: getBreastSizes(state.demand.options),
  hairStyles: getHairStyles(state.demand.options),
  timelineSides: getTimelineSides(state.demand.options),
}))(Add);
