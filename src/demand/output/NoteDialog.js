import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { changeNote } from './../endpoints';

class NoteDialog extends React.PureComponent {
  state = {
    note: '',
  };

  componentDidMount() {
    this.setNote(this.props.children);
  }

  setNote = (note) => {
    this.setState({
      ...this.state,
      note: note || '',
    });
  };

  reset = () => {
    this.setState({
      ...this.state,
      note: this.props.children || '',
    });
  };

  same = () => (this.props.children || '') === this.state.note;

  render() {
    const {
      dispatch,
      opened,
      onClose,
      onReload,
      id,
    } = this.props;
    const { note } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={() => {
          this.reset();
          onClose();
        }}
      />,
      <RaisedButton
        label="Save"
        primary
        onClick={() => {
          dispatch(changeNote(id, note, onReload));
          onClose();
        }}
      />,
    ];
    return (
      <Dialog
        title="Note"
        actions={actions}
        modal={!this.same()}
        open={opened}
        onRequestClose={onClose}
      >
        <TextField
          hintText="Text"
          value={note}
          onChange={event => this.setNote(event.target.value)}
        />
      </Dialog>
    );
  }
}

NoteDialog.propTypes = {
  children: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect()(NoteDialog);
