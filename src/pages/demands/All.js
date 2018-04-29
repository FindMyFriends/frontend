import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styled from 'styled-components';
import Box from './../../demand/output/Box';
import { all as allDemands } from './../../demand/endpoints';
import Pagination from './../../components/Pagination';
import { twoSideSort } from './../../dataset/selection';

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
    sorts: {
      id: '+id',
    },
  };

  componentDidMount() {
    const { dispatch, handleMenu } = this.props;
    const { sorts } = this.state;
    dispatch(allDemands({ page: 1, perPage: 10 }, Object.values(sorts)));
    handleMenu({
      filter: {
        title: 'Demands',
      },
    });
  }

  handleSort = this.handleSort.bind(this);

  handleSort(sort) {
    const { dispatch } = this.props;
    this.setState({
      ...this.state,
      sorts: {
        ...twoSideSort(this.state.sorts, { [sort]: sort }),
      },
    }, () => dispatch(allDemands({ page: 1, perPage: 10 }, Object.values(this.state.sorts))));
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
    this.props.dispatch(allDemands({ ...this.state.pagination }));
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
    const { pagination: { page }, boxes, sorts } = this.state;
    const { pages, demands, history, dispatch } = this.props;
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
        <Box demands={demands} dispatch={dispatch} history={history} sorts={sorts} onSort={this.handleSort} />
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
