import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from './../../demand/output/Box';
import { all } from './../../demand/endpoints';
import Pagination from './../../components/Pagination';

class All extends React.Component {
  state = {
    pagination: {
      page: 1,
      perPage: 2,
    },
    boxes: {},
  };

  componentDidMount() {
    this.props.dispatch(all({ ...this.state.pagination }));
  }

  handlePaginationChange = this.handlePaginationChange.bind(this);
  handleListing = this.handleListing.bind(this);

  handlePaginationChange(event) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        page: event,
      },
    });
    this.props.dispatch(all({ ...this.state.pagination }));
  }

  handleListing(box) {
    const { boxes } = this.state;
    this.setState({
      boxes: {
        [box]: {
          more: Object.prototype.hasOwnProperty.call(boxes, box) ? !boxes[box].more : true,
        },
      },
    });
  }

  render() {
    const { pagination: { page }, boxes } = this.state;
    const { pages, demands } = this.props;
    return (
      <div>
        <h1>All demands</h1>
        {
          pages &&
            <Pagination
              pages={pages}
              page={page}
              onChange={this.handlePaginationChange}
            />
        }
        {
          demands &&
            demands.map(demand =>
                (<Box
                  more={
                    Object.prototype.hasOwnProperty.call(boxes, demand.id)
                      ? boxes[demand.id].more
                      : false
                  }
                  onListing={this.handleListing}
                  key={demand.id}
                  demand={demand}
                />))
        }
      </div>
    );
  }
}

All.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pages: PropTypes.object,
  demands: PropTypes.array,
};

export default connect(state => ({
  demands: state.demand.all || [],
  pages: state.demand.pages,
}))(All);
