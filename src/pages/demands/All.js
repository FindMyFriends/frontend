import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Table from './../../demand/output/Table';
import { all as allDemands } from './../../demand/endpoints';
import { twoSideSort } from './../../dataset/selection';
import { getDemandNotes } from '../../demand/reducers';

const BottomRightNavigation = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
`;

class All extends React.Component {
  state = {
    sorts: {
      id: '+id',
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { sorts } = this.state;
    dispatch(allDemands(Object.values(sorts)));
  }

  handleReload = () => {
    const { dispatch } = this.props;
    const { sorts } = this.state;
    dispatch(allDemands(Object.values(sorts)));
  };

  handleSort = (sort) => {
    const { dispatch } = this.props;
    this.setState({
      ...this.state,
      sorts: {
        ...twoSideSort(this.state.sorts, { [sort]: sort }),
      },
    }, () => dispatch(allDemands({ page: 1, perPage: 10 }, Object.values(this.state.sorts))));
  };

  render() {
    const { sorts } = this.state;
    return (
      <React.Fragment>
        <Table
          {...this.props}
          sorts={sorts}
          onSort={this.handleSort}
          onReload={this.handleReload}
        />
        <BottomRightNavigation>
          <Link to="/demands/add">
            <Button variant="fab" color="primary" aria-label="add">
              <AddIcon />
            </Button>
          </Link>
        </BottomRightNavigation>
      </React.Fragment>
    );
  }
}

All.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pages: PropTypes.object,
  demands: PropTypes.array.isRequired,
  demandNotes: PropTypes.object.isRequired,
  handleMenu: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(state => ({
  demands: state.demand.all || [],
  pages: state.demand.pages,
  demandNotes: getDemandNotes(state),
}))(All);

// TODO: actions to props