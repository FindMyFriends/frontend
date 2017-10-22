import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import AddForm from './../../demands/AddForm';
import { add } from './../../demands/endpoints';
import toRequest from './../../demands/toRequest';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demand: { },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      demand: Object.assign(
        { },
        this.state.demand,
        { [event.target.name]: event.target.value },
      ),
    });
  }

  handleSubmit(event) {
    add(toRequest(this.state.demand))(this.props.dispatch);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <PageHeader>Add demand</PageHeader>
        <AddForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

Add.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Add);
