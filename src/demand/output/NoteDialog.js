// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Note from './Note';

type State = {|
  open: boolean,
  note: string,
|};
type Props = {|
  +note: ?string,
  +onSave: (text: string, next: (void) => (void)) => (void),
|};
export default class NoteDialog extends React.Component<Props, State> {
  state = {
    open: false,
    note: '',
  };

  componentDidMount() {
    this.clearNote();
  }

  clearNote = () => this.setState({ note: this.props.note || '' });
  handleClickOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false }, this.clearNote);
  handleNoteChange = (event: Object) => this.setState({ ...this.state, note: event.target.value });
  handleSave = () => this.props.onSave(this.state.note, this.handleClose);

  render() {
    return (
      <React.Fragment>
        <Note onClick={this.handleClickOpen}>{this.props.note}</Note>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Note</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="note"
              type="text"
              value={this.state.note}
              onChange={this.handleNoteChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}