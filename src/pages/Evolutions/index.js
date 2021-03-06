// @flow
import React from 'react';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';
import { injectIntl } from 'react-intl';
import Table from '../../evolution/output/Table';
import { all, revert } from '../../evolution/endpoints';
import { toApiOrdering } from '../../dataset/formats';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import Loader from '../../ui/Loader';
import { requestedConfirm } from '../../ui/actions';
import {
  allFetching as evolutionsFetching,
  getTotal,
  mostPriorColumnIdentifiers,
  getScopeAvailableColumns,
  getColumns,
} from '../../evolution/selects';
import { invalidatedAll, receivedColumns } from '../../evolution/actions';
import {
  changePerPage,
  receivedInit,
  sort,
  turnPage,
} from '../../dataset/actions';
import { getSourcePagination, getSourceSorting } from '../../dataset/selects';

type Props = {|
  +availableColumns: Object,
  +evolutions: Array<Object>,
  +all: (SortType, PaginationType, () => (void)) => (void),
  +total: number,
  +fetching: boolean,
  +revert: (string, () => (void)) => (void),
  +requestedConfirm: (string, (Promise<any>) => (Promise<any>)) => (void),
  +invalidateAllEvolutions: () => (void),
  +intl: Object,
  +sorting: SortType,
  +sort: (string, SortType) => (void),
  +turnPage: (number, PaginationType) => (void),
  +changePerPage: (number, PaginationType) => (void),
  +initSortAndPaging: (SortType, PaginationType) => (void),
  +pagination: PaginationType,
  +columns: Object,
  +setColumns: (Array<string>) => (void)
|};
class All extends React.Component<Props> {
  componentDidMount = () => {
    const reload = () => this.reload(() => (
      this.props.setColumns(mostPriorColumnIdentifiers(this.props.availableColumns))
    ));
    Promise.resolve()
      .then(() => this.props.initSortAndPaging({ order: 'desc', orderBy: 'evolved_at' }, { page: 1, perPage: 5 }))
      .then(reload);
  };

  reload = (next: () => (void) = () => {}) => {
    const { sorting, pagination } = this.props;
    this.props.all(sorting, pagination, next);
  };

  handleSort = (orderBy: string) => (
    Promise.resolve()
      .then(() => this.props.sort(orderBy, this.props.sorting))
      .then(this.props.invalidateAllEvolutions)
      .then(this.reload)
  );

  handleChangePerPage = (perPage: number) => (
    Promise.resolve()
      .then(() => this.props.changePerPage(perPage, this.props.pagination))
      .then(this.props.invalidateAllEvolutions)
      .then(this.reload)
  );

  handleChangePage = (page: number) => (
    Promise.resolve()
      .then(() => this.props.turnPage(page, this.props.pagination))
      .then(this.props.invalidateAllEvolutions)
      .then(this.reload)
  );

  handleRevert = (id: string) => {
    this.props.requestedConfirm(
      'Are you sure, you want to revert evolution change?',
      () => Promise.resolve()
        .then(this.props.invalidateAllEvolutions)
        .then(() => this.props.revert(id, this.reload)),
    );
  };

  handleSortSelectionChange = event => this.props.setColumns(event.target.value);

  render() {
    const {
      evolutions,
      total,
      fetching,
      intl,
      sorting,
      pagination,
      columns,
      availableColumns,
    } = this.props;

    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Table
          columns={columns}
          possibleColumns={mapValues(availableColumns, (count, id) => intl.formatMessage({ id }))}
          rows={evolutions}
          sort={sorting}
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

const SOURCE_NAME = 'evolutions/all';

const mapStateToProps = state => ({
  availableColumns: getScopeAvailableColumns(state),
  evolutions: state.evolution.all.payload,
  total: getTotal(state),
  fetching: evolutionsFetching(state),
  sorting: getSourceSorting(SOURCE_NAME, state),
  pagination: getSourcePagination(SOURCE_NAME, state),
  columns: getColumns(state),
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
  sort: (orderBy: string, current: SortType) => dispatch(sort(SOURCE_NAME, orderBy, current)),
  turnPage: (
    page: number,
    current: PaginationType,
  ) => dispatch(turnPage(SOURCE_NAME, page, current)),
  changePerPage: (
    perPage: number,
    current: PaginationType,
  ) => dispatch(changePerPage(SOURCE_NAME, perPage, current)),
  initSortAndPaging: (
    sorting: SortType,
    paging: PaginationType,
  ) => dispatch(receivedInit(SOURCE_NAME, sorting, paging)),
  setColumns: (columns: Array<string>) => dispatch(receivedColumns(columns)),
});
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(All));
