import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styled from 'styled-components';
import Box from './../../demand/output/Box';
import { all } from './../../demand/endpoints';
import Pagination from './../../components/Pagination';

const BottomRightNavigation = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
`;

class All extends React.Component {
  state = {
    pagination: {
      page: 1,
      perPage: 2,
    },
    boxes: {},
  };

  componentDidMount() {
    const { dispatch, handleMenu } = this.props;
    dispatch(all({ ...this.state.pagination }));
    handleMenu({
      filter: {
        title: 'Demands',
      },
    });
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
    const { pages, demands, history } = this.props;
    return (
      <React.Fragment>
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
        <BottomRightNavigation>
          <FloatingActionButton onClick={() => history.push('/demands/add')}>
            <ContentAdd />
          </FloatingActionButton>
        </BottomRightNavigation>
      </React.Fragment>
    );
  }
}

All.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pages: PropTypes.object,
  demands: PropTypes.array,
  handleMenu: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(state => ({
  demands: state.demand.all || [],
  pages: state.demand.pages,
}))(All);
