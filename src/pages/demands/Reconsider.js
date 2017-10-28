import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import extend from 'extend';
import Form from './../../demands/Form';
import { reconsider, genders, races, single } from './../../demands/endpoints';
import toRequest from './../../demands/toRequest';
import validatedDemand from './../../demands/rules';

class Reconsider extends React.Component {
  state = {
    demand: { },
  };
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch(single(id))
      .then(demand => this.setState({
        demand: {
          ...this.state.demand,
          general_gender: demand.general.gender,
          general_race: demand.general.race,
        },
      }));
    dispatch(genders());
    dispatch(races());
  }

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
      extend(true, {}, demand, validatedDemand(toRequest(this.state.demand), { genders, races })),
      etag,
    ));
  }

  render() {
    const { genders, races } = this.props;
    return (
      <div>
        <PageHeader>Reconsider demand</PageHeader>
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
