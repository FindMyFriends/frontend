// @flow
import React from 'react';
import { connect } from 'react-redux';
import Table from './../../evolution/output/Table';
import { all, revert } from '../../evolution/endpoints';
import { toApiOrdering, withSort } from './../../dataset/sorts';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import { withPage, withPerPage } from '../../dataset/pagination';
import Loader from '../../ui/Loader';
import { requestedConfirm } from '../../ui/actions';
import {
  allFetching as evolutionsFetching,
  getTotal,
  mostPriorColumnIdentifiers,
  getScopeColumns,
} from '../../evolution/selects';
import { invalidatedAll } from '../../evolution/actions';
import * as columns from '../../dataset/columns';

type Props = {|
  +columns: Object,
  +evolutions: Array<Object>,
  +all: (SortType, PaginationType, () => (void)) => (void),
  +total: number,
  +fetching: boolean,
  +revert: (string, () => (void)) => (void),
  +requestedConfirm: (string, (Promise<any>) => (Promise<any>)) => (void),
  +invalidateAllEvolutions: () => (void),
|};
type State = {|
  sort: SortType,
  pagination: PaginationType,
  columns: Array<string>,
|};
class All extends React.Component<Props, State> {
  state = {
    sort: {
      order: 'desc',
      orderBy: 'evolved_at',
    },
    columns: [],
    pagination: {
      page: 1,
      perPage: 5,
    },
  };

  componentDidMount = () => (
    this.reload(() =>
      this.setState({ ...this.state, columns: mostPriorColumnIdentifiers(this.props.columns) }))
  );

  reload = (next: () => (void) = () => {}) => {
    const { sort, pagination } = this.state;
    this.props.all(sort, pagination, next);
  };

  handleSort = (column: string) => (
    this.setState(
      withSort(column, this.state),
      () => Promise.resolve()
        .then(this.props.invalidateAllEvolutions)
        .then(this.reload),
    )
  );

  handleChangePerPage = (perPage: number) => this.setState(
    withPerPage(perPage, this.state),
    () => Promise.resolve()
      .then(this.props.invalidateAllEvolutions)
      .then(this.reload),
  );

  handleChangePage = (page: number) => this.setState(
    withPage(page, this.state),
    () => Promise.resolve()
      .then(this.props.invalidateAllEvolutions)
      .then(this.reload),
  );

  handleRevert = (id: string) => {
    this.props.requestedConfirm(
      'Are you sure, you want to revert evolution change?',
      () => Promise.resolve()
        .then(this.props.invalidateAllEvolutions)
        .then(() => this.props.revert(id, this.reload)),
    );
  };

  handleSortSelectionChange = event => this.setState({
    ...this.state,
    columns: event.target.value,
  });

  render() {
    const { sort, pagination } = this.state;
    const {
      evolutions,
      total,
      fetching,
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Table
          columns={this.state.columns}
          possibleColumns={columns.translations(this.props.columns)}
          rows={evolutions}
          sort={sort}
          pagination={pagination}
          total={total}
          onSort={column => this.handleSort(column)}
          onPageChange={page => this.handleChangePage(page)}
          onPerPageChange={perPage => this.handleChangePerPage(perPage)}
          onRevert={this.handleRevert}
          onSortSelectionChange={this.handleSortSelectionChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  columns: getScopeColumns(state),
  evolutions: state.evolution.all.payload,
  total: getTotal(state),
  pagination: state.evolution.pagination,
  fetching: evolutionsFetching(state),
});
const mapDispatchToProps = dispatch => ({
  all: (
    sort: SortType,
    pagination: PaginationType,
    next: () => (void) = () => {},
  ) => dispatch(all([toApiOrdering(sort)], pagination, next)),
  requestedConfirm: (
    content: string,
    action: () => (void),
  ) => dispatch(requestedConfirm(content, action)),
  revert: (id: string, next: () => (void)) => dispatch(revert(id, next)),
  invalidateAllEvolutions: () => dispatch(invalidatedAll()),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
