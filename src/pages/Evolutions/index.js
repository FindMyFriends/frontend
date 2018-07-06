// @flow
import React from 'react';
import { connect } from 'react-redux';
import Table from './../../evolution/output/Table';
import { all, getScopeColumns, options } from '../../evolution/endpoints';
import { toApiOrdering, withSort } from './../../dataset/sorts';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import { withPage, withPerPage } from '../../dataset/pagination';
import Loader from '../../ui/Loader';
import { isFetching } from '../../schema/reducers';
import { EVOLUTION } from '../../evolution/actions';

type Props = {|
  +options: () => (void),
  +evolutions: Array<Object>,
  +all: (SortType, PaginationType) => (void),
  +total: number,
  +fetching: boolean,
  +columns: Object,
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
    this.props.all(sort, [], pagination);
    this.props.options();
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
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  columns: getScopeColumns(state),
  evolutions: state.evolution.all || [],
  total: state.evolution.total || 0,
  pagination: state.evolution.pagination,
  fetching: state.evolution.fetching || isFetching(state, EVOLUTION),
});
const mapDispatchToProps = dispatch => ({
  all: (
    sort: SortType,
    fields: Array<string>,
    pagination: PaginationType,
  ) => dispatch(all([toApiOrdering(sort)], fields, pagination)),
  options: () => dispatch(options()),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
