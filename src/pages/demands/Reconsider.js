import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import flat, * as f from 'flat';
import * as R from 'ramda';
import Form from './../../demand/input/Form';
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
import { getTimelineSides } from './../../demand/reducers';
import { ActionItems } from './menu/Reconsider/Items';
import { reconsider, single, options, schema } from './../../demand/endpoints';

class Reconsider extends React.Component {
  state = {
    step: {
      major: 1,
      minor: 0,
    },
    demand: {},
  };

  componentDidMount() {
    const { dispatch, handleMenu, match: { params: { id } } } = this.props;
    dispatch(options());
    dispatch(schema());
    dispatch(single(id))
      .then(demand => this.setState({
        demand: {
          ...this.state.demand,
          ...demand,
        },
      }));
    handleMenu({
      filter: {
        title: 'Reconsider',
      },
      action: <ActionItems id={id} />,
    });
  }

  handleChange = (event) => {
    this.setState({
      demand: {
        ...merge(
          this.state.demand,
          f.unflatten({ [event.target.name]: event.target.value }),
        ),
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      dispatch, etag, demand, match: { params: { id } }, history,
    } = this.props;
    dispatch(reconsider(
      id,
      merge(
        demand,
        f.unflatten(this.state.demand),
      ),
      etag,
      history,
    ));
  };

  handleTurn = (major, minor) => {
    this.setState({
      ...this.state,
      step: { major, minor },
    });
  };

  render() {
    if (R.isEmpty(this.state.demand)) {
      return <h1>Loading...</h1>;
    }
    return (
      <Form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onTurn={this.handleTurn}
        selects={{ ...this.props }}
        values={flat(this.state.demand)}
        step={this.state.step}
      >
        Reconsider
      </Form>
    );
  }
}

Reconsider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  etag: PropTypes.string.isRequired,
  demand: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  handleMenu: PropTypes.func.isRequired,
};

export default connect(state => ({
  sex: getSex(state.demand.options),
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
  demand: state.demand.single || {},
  etag: state.demand.etag || '',
}))(Reconsider);
