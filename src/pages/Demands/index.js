// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Center from '../../components/Center';
import Table from './../../demand/output/Table';
import { all, saveNote, retract } from '../../demand/endpoints';
import { toApiOrdering, withSort } from './../../dataset/sorts';
import type { PaginationType } from '../../dataset/PaginationType';
import type { SortType } from '../../dataset/SortType';
import { withPage, withPerPage } from '../../dataset/pagination';
import Loader from '../../ui/Loader';
import { requestedConfirm } from '../../ui/actions';
import { getTotal, allFetching } from '../../demand/reducers';
import { invalidatedAll } from '../../demand/actions';

const BottomRightNavigation = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
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
|};
type State = {|
  sort: SortType,
  pagination: PaginationType,
|};
class All extends React.Component<Props, State> {
  state = {
    sort: {
      order: 'desc',
      orderBy: 'created_at',
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

  handleSort = (column: string) => (
    this.setState(
      withSort(column, this.state),
      () => Promise.resolve().then(this.props.invalidateAllDemands).then(this.reload),
    )
  );

  handleChangePerPage = (perPage: number) => this.setState(
    withPerPage(perPage, this.state),
    () => Promise.resolve().then(this.props.invalidateAllDemands).then(this.reload),
  );

  handleChangePage = (page: number) => this.setState(
    withPage(page, this.state),
    () => Promise.resolve().then(this.props.invalidateAllDemands).then(this.reload),
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
    const { sort, pagination } = this.state;
    const { demands, total, fetching } = this.props;
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
                sort={sort}
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

const mapStateToProps = state => ({
  demands: state.demand.all.payload,
  total: getTotal(state),
  pagination: state.demand.pagination,
  fetching: allFetching(state),
});
const mapDispatchToProps = dispatch => ({
  all: (
    sort: SortType,
    pagination: PaginationType,
  ) => dispatch(all([toApiOrdering(sort)], pagination)),
  saveNote: (id: string, text: string, next: Promise<any>) => dispatch(saveNote(id, text, next)),
  retract: (id: string, next: () => (void)) => dispatch(retract(id, next)),
  invalidateAllDemands: () => dispatch(invalidatedAll()),
  requestedConfirm: (
    content: string,
    action: () => (void),
  ) => dispatch(requestedConfirm(content, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
