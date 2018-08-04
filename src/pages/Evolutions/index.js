// @flow
import React from 'react';
import { connect } from 'react-redux';
import Table from './../../evolution/output/Table';
import { all, getScopeColumns, revert } from '../../evolution/endpoints';
import { toApiOrdering, withSort } from './../../dataset/sorts';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import { withPage, withPerPage } from '../../dataset/pagination';
import Loader from '../../ui/Loader';
import { requestedConfirm } from '../../ui/actions';

type Props = {|
  +evolutions: Array<Object>,
  +all: (SortType, PaginationType) => (void),
  +total: number,
  +fetching: boolean,
  +columns: Object,
  +revert: (string, () => (void)) => (void),
  +requestedConfirm: (string, () => (void)) => (void),
|};
type State = {|
  sort: SortType,
  pagination: PaginationType,
|};
class All extends React.Component<Props, State> {
  state = {
    sort: {
      order: 'desc',
      orderBy: 'evolved_at',
    },
    pagination: {
      page: 1,
      perPage: 5,
    },
  };

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    const { sort, pagination } = this.state;
    this.props.all(sort, pagination);
  };

  handleSort = (column: string) => this.setState(withSort(column, this.state), this.reload);

  handleChangePerPage = (perPage: number) => this.setState(
    withPerPage(perPage, this.state),
    this.reload,
  );

  handleChangePage = (page: number) => this.setState(
    withPage(page, this.state),
    this.reload,
  );

  handleRevert = (id: string) => {
    this.props.requestedConfirm(
      'Are you sure, you want to revert evolution change?',
      () => this.props.revert(id, this.reload),
    );
  };

  render() {
    const { sort, pagination } = this.state;
    const {
      evolutions,
      total,
      fetching,
      columns,
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Table
          columns={columns}
          rows={evolutions}
          sort={sort}
          pagination={pagination}
          total={total}
          onSort={column => this.handleSort(column)}
          onPageChange={page => this.handleChangePage(page)}
          onPerPageChange={perPage => this.handleChangePerPage(perPage)}
          onRevert={this.handleRevert}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  columns: getScopeColumns(state),
  evolutions: state.evolution.all.payload || [],
  total: state.evolution.total || 0,
  pagination: state.evolution.pagination,
  fetching: state.evolution.all.fetching,
});
const mapDispatchToProps = dispatch => ({
  all: (
    sort: SortType,
    pagination: PaginationType,
  ) => dispatch(all([toApiOrdering(sort)], pagination)),
  requestedConfirm: (
    content: string,
    action: () => (void),
  ) => dispatch(requestedConfirm(content, action)),
  revert: (id: string, next: () => (void)) => dispatch(revert(id, next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
