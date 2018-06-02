// @flow
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Table from './../../demand/output/Table';
import { all as allDemands } from './../../demand/endpoints';
import { toApiOrdering, toggleSort } from './../../dataset/sorts';
import { getDemandNotes } from '../../demand/reducers';
import { PaginationType } from './../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';

const BottomRightNavigation = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
`;

type AllProps = {|
  +pagination: PaginationType,
  +demands: Array<Object>,
  +demandNotes: Object,
  +history: Object,
|};
type AllState = {|
  +sort: SortType,
|};
class All extends React.Component<AllProps, AllState> {
  state = {
    sort: {
      order: 'asc',
      orderBy: 'id',
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { sort } = this.state;
    dispatch(allDemands([toApiOrdering(sort)]));
  }

  handleSort = (column) => {
    const { dispatch } = this.props;
    const { sort } = this.state;
    this.setState({
      ...this.state,
      sort: toggleSort(sort),
    }, () => dispatch(allDemands([toApiOrdering(sort)])));
  };

  render() {
    const { sort } = this.state;
    const { demands, pagination } = this.props;
    return (
      <React.Fragment>
        <Table
          rows={demands}
          sort={sort}
          onSort={column => this.handleSort(column)}
          pagination={pagination}
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

export default connect(state => ({
  demands: state.demand.all || [],
  pagination: state.demand.pagination,
  demandNotes: getDemandNotes(state),
}))(All);

// TODO: actions to props