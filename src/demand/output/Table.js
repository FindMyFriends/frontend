import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Table as MUITable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import NoteIcon from 'material-ui/svg-icons/av/note';
import { red500, grey500, black } from 'material-ui/styles/colors';
import { requestedConfirm, receivedSuccess } from './../../ui/actions';
import { retract, changeNote } from './../endpoints';
import { SortColumn } from '../../dataset/selection';
import NoteDialog from './NoteDialog';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Table extends React.Component {
  state = {
    note: {
      dialog: {
        opened: false,
      },
    },
  };

  handleRetract = (id) => {
    const { history, dispatch } = this.props;
    dispatch(requestedConfirm(
      'Are you sure, you want to retract demand?',
      () => dispatch(retract(id, history)),
    ));
  };

  handleNoteTextChange = (text) => {
    this.setState({
      note: {
        dialog: {
          ...this.state.note.dialog,
          text,
        },
      },
    });
  };

  handleNoteTextSave = () => {
    const { dispatch, onReload } = this.props;
    const { note: { dialog: { id, text } } } = this.state;
    dispatch(changeNote(id, text, () => {
      onReload();
      dispatch(receivedSuccess('Note has been saved.'));
    }));
  };

  handleOpenNoteDialog = (id) => {
    this.setState({
      note: {
        dialog: {
          ...this.state.note.dialog,
          id,
          text: this.props.demandNotes[id] || '',
          opened: true,
        },
      },
    });
  };

  handleCloseNoteDialog = () => {
    this.setState({
      note: {
        dialog: {
          ...this.state.note.dialog,
          opened: false,
        },
      },
    });
  };

  render() {
    const { demands, sorts, onSort } = this.props;
    if (demands.length === 0) {
      return (
        <Center>
          <h3>No demands, hit the button to add.</h3>
        </Center>
      );
    }
    return (
      <React.Fragment>
        <NoteDialog
          onSave={this.handleNoteTextSave}
          onTextChange={this.handleNoteTextChange}
          onClose={this.handleCloseNoteDialog}
          opened={this.state.note.dialog.opened}
        >
          {this.state.note.dialog.text}
        </NoteDialog>
        <MUITable selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>
                <SortColumn
                  name="id"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Position
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="general.firstname"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Firstname
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="general.lastname"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Lastname
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="general.sex"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Sex
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="general.age"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Age
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SortColumn
                  name="created_at"
                  sorts={sorts}
                  onSort={onSort}
                >
                  Created at
                </SortColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>Note</TableHeaderColumn>
              <TableHeaderColumn>Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {demands.map((demand, index) => {
              return (
                <TableRow key={demand.id}>
                  <TableRowColumn>{index + 1}</TableRowColumn>
                  <TableRowColumn>{demand.general.firstname || '-'}</TableRowColumn>
                  <TableRowColumn>{demand.general.lastname || '-'}</TableRowColumn>
                  <TableRowColumn>{demand.general.sex}</TableRowColumn>
                  <TableRowColumn>{`${demand.general.age.from} - ${demand.general.age.to}`}</TableRowColumn>
                  <TableRowColumn>{moment(demand.created_at).format('MM/DD/YYYY HH:mm')}</TableRowColumn>
                  <TableRowColumn title={demand.note ? null : 'No available note'}>
                    <NoteIcon
                      onClick={() => this.handleOpenNoteDialog(demand.id)}
                      color={demand.note ? black : grey500}
                      style={{ cursor: 'pointer' }}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    >
                      <IconMenuItems
                        demand={demand}
                        onRetract={id => this.handleRetract(id)}
                      />
                    </IconMenu>
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
      </React.Fragment>
    );
  }
}

const IconMenuItems = ({ demand, onRetract }) => ([
  <MenuItem
    key={0}
    primaryText="View"
    leftIcon={<VisibilityIcon />}
    containerElement={<Link to={`/demands/${demand.id}`} />}
  />,
  <MenuItem
    key={1}
    primaryText="Reconsider"
    leftIcon={<EditIcon />}
    containerElement={<Link to={`/demands/${demand.id}/reconsider`} />}
  />,
  <MenuItem
    key={2}
    primaryText="Retract"
    leftIcon={<DeleteIcon color={red500} />}
    onClick={() => onRetract(demand.id)}
  />,
]);

Table.propTypes = {
  demands: PropTypes.array.isRequired,
  demandNotes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  sorts: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
};

export default Table;
