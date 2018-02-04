import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import extend from 'extend';
import flat, * as f from 'flat';
import * as R from 'ramda';
import Form from './../../demands/Form';
import { genders, ethnicGroups, bodyBuilds, hairColors, lengthUnits, beardColors, shapes, ratings, eyebrowColors, eyeColors, nailColors, breastSizes, hairStyles } from './../../description/endpoints';
import { reconsider, single, timelineSides } from './../../demands/endpoints';
import { initial } from './../../demands/sample';
import * as enumSet from './../../enum';

class Reconsider extends React.Component {
  state = {
    step: {
      major: 1,
      minor: 0,
    },
    demand: initial(),
  };

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(single(id))
      .then(demand => this.setState({
        demand: flat({
          ...this.state.demand,
          ...demand,
        }),
      }));
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
    event.preventDefault();
    const {
      dispatch, etag, demand, match: { params: { id } },
    } = this.props;
    dispatch(reconsider(
      id,
      extend(
        true,
        {},
        demand,
        f.unflatten(this.state.demand),
      ),
      etag,
    ));
  }

  handleTurn(major, minor) {
    this.setState({
      ...this.state,
      step: { major, minor },
    });
  }

  render() {
    if (R.isEmpty(this.state.demand)) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <h1>Reconsider demand</h1>
        <Form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onTurn={this.handleTurn}
          selects={{ ...this.props }}
          values={flat(this.state.demand)}
          step={this.state.step}
          label="Reconsider"
        />
      </div>
    );
  }
}

Reconsider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  etag: PropTypes.string.isRequired,
  demand: PropTypes.object.isRequired,
};

export default connect(state => ({
  genders: state.descriptionSchema.genders || [],
  timelineSides: state.demandSchema.timelineSides || [],
  ethnicGroups: state.descriptionSchema.ethnicGroups || enumSet.empty(),
  bodyBuilds: state.descriptionSchema.bodyBuilds || enumSet.empty(),
  hairColors: state.descriptionSchema.hairColors || enumSet.emptyColor(),
  beardColors: state.descriptionSchema.beardColors || enumSet.emptyColor(),
  eyebrowColors: state.descriptionSchema.eyebrowColors || enumSet.emptyColor(),
  eyeColors: state.descriptionSchema.eyeColors || enumSet.emptyColor(),
  nailColors: state.descriptionSchema.nailColors || enumSet.emptyColor(),
  ratings: state.descriptionSchema.ratings || enumSet.emptyRange(),
  lengthUnits: state.descriptionSchema.lengthUnits || [],
  shapes: state.descriptionSchema.shapes || enumSet.empty(),
  breastSizes: state.descriptionSchema.breastSizes || [],
  hairStyles: state.descriptionSchema.hairStyles || enumSet.empty(),
  demand: state.demand.single || {},
  etag: state.demand.etag || '',
}))(Reconsider);
