// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Center from '../../components/Center';
import Table from '../../demand/output/Table';
import { all, saveNote, retract } from '../../demand/endpoints';
import { toApiOrdering } from '../../dataset/formats';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import Loader from '../../ui/Loader';
import { requestedConfirm } from '../../ui/actions';
import { getTotal, allFetching } from '../../demand/selects';
import { invalidatedAll } from '../../demand/actions';
import {
  sort,
  turnPage,
  changePerPage,
  receivedInit,
} from '../../dataset/actions';
import { getSourcePagination, getSourceSorting } from '../../dataset/selects';

const BottomRightNavigation = styled.div`
  bottom: 0;
  float: right;
  padding: 20px;
`;

type Props = {|
  +demands: Array<Object>,
  +all: (SortType, PaginationType) => (void),
  +total: number,
  +fetching: boolean,
  +saveNote: (string, string, () => (mixed)) => (void),
  +retract: (string, () => (void)) => (void),
  +requestedConfirm: (string, (Promise<any>) => (Promise<any>)) => (void),
  +invalidateAllDemands: () => (void),
  +sorting: SortType,
  +sort: (string, SortType) => (void),
  +turnPage: (number, PaginationType) => (void),
  +changePerPage: (number, PaginationType) => (void),
  +initSortAndPaging: (SortType, PaginationType) => (void),
  +pagination: PaginationType,
|};
class All extends React.Component<Props> {
  componentDidMount = () => {
    Promise.resolve()
      .then(() => this.props.initSortAndPaging({ order: 'desc', orderBy: 'created_at' }, { page: 1, perPage: 5 }))
      .then(this.reload);
  };

  reload = () => {
    const { sorting, pagination } = this.props;
    this.props.all(sorting, pagination);
  };

  handleSort = (orderBy: string) => (
    Promise.resolve()
      .then(() => this.props.sort(orderBy, this.props.sorting))
      .then(this.props.invalidateAllDemands)
      .then(this.reload)
  );

  handleChangePerPage = (perPage: number) => (
    Promise.resolve()
      .then(() => this.props.changePerPage(perPage, this.props.pagination))
      .then(this.props.invalidateAllDemands)
      .then(this.reload)
  );

  handleChangePage = (page: number) => (
    Promise.resolve()
      .then(() => this.props.turnPage(page, this.props.pagination))
      .then(this.props.invalidateAllDemands)
      .then(this.reload)
  );

  handleNoteSave = (id: string, note: string, next: () => (any)) => {
    this.props.saveNote(
      id,
      note,
      () => Promise.resolve()
        .then(next)
        .then(this.props.invalidateAllDemands)
        .then(this.reload),
    );
  };

  handleRetract = (id: string) => {
    this.props.requestedConfirm(
      'Are you sure, you want to retract demand?',
      () => Promise.resolve()
        .then(this.props.invalidateAllDemands)
        .then(() => this.props.retract(id, this.reload)),
    );
  };

  render() {
    const {
      demands,
      total,
      fetching,
      sorting,
      pagination,
    } = this.props;

    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        {
          total === 0
            ? (
              <Center>
                <Typography variant="display1">No demands.</Typography>
              </Center>
            )
            : (
              <Table
                rows={demands}
                sort={sorting}
                pagination={pagination}
                total={total}
                onNoteSave={this.handleNoteSave}
                onSort={column => this.handleSort(column)}
                onPageChange={page => this.handleChangePage(page)}
                onPerPageChange={perPage => this.handleChangePerPage(perPage)}
                onRetract={this.handleRetract}
              />
            )
        }
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


const SOURCE_NAME = 'demands/all';

const mapStateToProps = state => ({
  demands: state.demand.all.payload,
  total: getTotal(state),
  fetching: allFetching(state),
  sorting: getSourceSorting(SOURCE_NAME, state),
  pagination: getSourcePagination(SOURCE_NAME, state),
});
const mapDispatchToProps = dispatch => ({
  all: (
    sort: SortType,
    pagination: PaginationType,
  ) => dispatch(all([toApiOrdering(sort)], pagination)),
  saveNote: (id: string, text: string, next: Promise<any>) => dispatch(saveNote(id, text, next)),
  retract: (id: string, next: () => (void)) => dispatch(retract(id, next)),
  invalidateAllDemands: () => dispatch(invalidatedAll()),
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
  requestedConfirm: (
    content: string,
    action: () => (void),
  ) => dispatch(requestedConfirm(content, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
