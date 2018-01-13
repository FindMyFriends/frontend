import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import extend from 'extend';
import flat, * as f from 'flat';
import * as R from 'ramda';
import Form from './../../demands/Form';
import { reconsider, genders, ethnicGroups, single } from './../../demands/endpoints';
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
    dispatch(ethnicGroups());
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
      dispatch, etag, demand, match: { params: { id } }, genders, ethnicGroups,
    } = this.props;
    dispatch(reconsider(
      id,
      extend(
        true,
        {},
        demand,
        validatedDemand(f.unflatten(this.state.demand), { genders, ethnicGroups }),
      ),
      etag,
    ));
  }

  render() {
    const { genders, ethnicGroups } = this.props;
    if (R.isEmpty(this.state.demand)) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <h1>Reconsider demand</h1>
        <Form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          selects={{ genders, ethnicGroups }}
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
  ethnicGroups: PropTypes.array.isRequired,
  etag: PropTypes.string.isRequired,
  demand: PropTypes.object.isRequired,
};

export default connect(state => ({
  genders: state.demand.genders || [],
  ethnicGroups: state.demand.ethnicGroups || [],
  demand: state.demand.single || {},
  etag: state.demand.etag || '',
}))(Reconsider);
