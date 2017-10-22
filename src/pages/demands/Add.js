import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import AddForm from './../../demands/AddForm';
import { add, genders, races } from './../../demands/endpoints';
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

  componentDidMount() {
    this.props.dispatch(genders());
    this.props.dispatch(races());
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
    this.props.dispatch(add(toRequest(this.state.demand)));
    event.preventDefault();
  }

  render() {
    const { genders, races } = this.props;
    return (
      <div>
        <PageHeader>Add demand</PageHeader>
        <AddForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          selects={{ genders, races }}
        />
      </div>
    );
  }
}

Add.propTypes = {
  dispatch: PropTypes.func.isRequired,
  genders: PropTypes.array.isRequired,
  races: PropTypes.array.isRequired,
};

export default connect(state => ({
  genders: state.demand.genders || [],
  races: state.demand.races || [],
}))(Add);
