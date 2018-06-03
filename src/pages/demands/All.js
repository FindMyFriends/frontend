// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Table from './../../demand/output/Table';
import { all as allDemands } from './../../demand/endpoints';
import { toApiOrdering, sortWithReset } from './../../dataset/sorts';
import { getDemandNotes } from '../../demand/reducers';
import type { PaginationType } from './../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import { paginateWithReset } from '../../dataset/pagination';
import Loader from './../../ui/Loader';

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
  +allDemands: (SortType, PaginationType) => (void),
  +total: number,
|};
type AllState = {|
  sort: SortType,
  pagination: PaginationType,
|};
class All extends React.Component<AllProps, AllState> {
  state = {
    sort: {
      order: 'desc',
      orderBy: 'created_at',
    },
    pagination: {
      page: 1,
      perPage: 5,
    }
  };

  componentDidMount() {
    const { sort, pagination } = this.state;
    this.props.allDemands(sort, pagination);
  }

  handleSort = (column: string) => {
    const { sort, pagination } = this.state;
    this.setState({
      ...this.state,
      ...sortWithReset(sort, column, pagination),
    }, () => this.props.allDemands(this.state.sort, this.state.pagination));
  };

  handleChangePerPage = (perPage: number) => {
    this.setState({
      ...this.state,
      pagination: paginateWithReset(perPage),
    }, () => this.props.allDemands(this.state.sort, this.state.pagination));
  };

  handleChangePage = (page: number) => {
    const { pagination, sort } = this.state;
    this.setState({
      ...this.state,
      pagination: {
        ...pagination,
        page,
      },
    }, () => this.props.allDemands(sort, this.state.pagination));
  };

  render() {
    const { sort, pagination } = this.state;
    const { demands, total } = this.props;
    if (total === 0) { // TODO: 0 does not mean not loaded
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Table
          rows={demands}
          sort={sort}
          pagination={pagination}
          total={total}
          onSort={column => this.handleSort(column)}
          onPageChange={page => this.handleChangePage(page)}
          onPerPageChange={perPage => this.handleChangePerPage(perPage)}
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

const mapStateToProps = state => ({
  demands: state.demand.all || [],
  total: state.demand.total || 0,
  pagination: state.demand.pagination,
  demandNotes: getDemandNotes(state),
});
const mapDispatchToProps = dispatch => ({
  allDemands: (sort: SortType, pagination: PaginationType) => dispatch(allDemands([toApiOrdering(sort)], pagination)),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
