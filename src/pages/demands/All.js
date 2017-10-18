import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import Box from './../../demands/Box';
import { all } from './../../demands/endpoints';
import Pagination from './../../components/Pagination';

class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        current: 1,
      },
      boxes: {},
    };
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.onListing = this.onListing.bind(this);
  }

  componentDidMount() {
    all()(this.props.dispatch);
  }

  onPaginationChange(event) {
    this.setState({
      pagination: {
        current: event,
      }
    });
  }

  onListing(box) {
    const { boxes } = this.state;
    this.setState({
      boxes: {
        [box]: {
          more: boxes.hasOwnProperty(box) ? !boxes[box].more : true,
        }
      }
    });
  }

  render() {
    const { pagination: { current }, boxes } = this.state;
    return (
      <div>
      <PageHeader>All demands</PageHeader>
        {
          this.props.pages &&
            <Pagination
              pages={this.props.pages}
              current={current}
              onChange={this.onPaginationChange}
            />
        }
        {
          this.props.demands &&
            this.props.demands.map(
              demand =>
                <Box
                  more={boxes.hasOwnProperty(demand.id) ? boxes[demand.id].more : false}
                  onListing={this.onListing}
                  key={demand.id}
                  demand={demand}
                />
              )
        }
      </div>
    );
  }
};

All.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(state => ({
  demands: state.demands.all || [],
  pages: state.demands.pages,
}))(All);
