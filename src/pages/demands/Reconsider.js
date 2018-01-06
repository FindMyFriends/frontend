import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import extend from 'extend';
import flat, * as f from 'flat';
import * as R from 'ramda';
import Form from './../../demands/Form';
import { reconsider, genders, races, single } from './../../demands/endpoints';
import validatedDemand from './../../demands/rules';

class Reconsider extends React.Component {
  state = {
    demand: { },
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
    dispatch(genders());
    dispatch(races());
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(event) {
    this.setState({
      demand: {
        ...this.state.demand,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      dispatch, etag, demand, match: { params: { id } }, genders, races,
    } = this.props;
    dispatch(reconsider(
      id,
      extend(
        true,
        {},
        demand,
        validatedDemand(f.unflatten(this.state.demand), { genders, races }),
      ),
      etag,
    ));
  }

  render() {
    const { genders, races } = this.props;
    if (R.isEmpty(this.state.demand)) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <h1>Reconsider demand</h1>
        <Form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          selects={{ genders, races }}
          values={this.state.demand}
          label="Reconsider"
        />
      </div>
    );
  }
}

Reconsider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genders: PropTypes.array.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ }) }).isRequired,
  races: PropTypes.array.isRequired,
  etag: PropTypes.string.isRequired,
  demand: PropTypes.object.isRequired,
};

export default connect(state => ({
  genders: state.demand.genders || [],
  races: state.demand.races || [],
  demand: state.demand.single || {},
  etag: state.demand.etag || '',
}))(Reconsider);
