import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Archive from 'material-ui/svg-icons/content/archive';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import moment from 'moment';

// styling
import './TimelineNotes.scss';

// Components
import CustomButton from '../Button/Button.Component';

export default class TimelineNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchiveDialog: false,
      showEditDialog: false,
      content: '',
      note: {},
      index: null
    };
  }

  handleOpenArchiveDialog = (note, index) => {
    this.setState({ showArchiveDialog: !this.state.showArchiveDialog, note: note, index: index });
  };

  handleCloseArchiveDialog = () => {
    this.setState({ note: {}, index: null, showArchiveDialog: !this.state.showArchiveDialog });
  };

  handleOpenEditDialog = (note, index) => {
    this.setState({ showEditDialog: !this.state.showEditDialog, note: note, index: index });
  };

  handleCloseEditDialog = () => {
    this.setState({ note: {}, index: null, showEditDialog: !this.state.showEditDialog });
  };

  handleArchiveNote = e => {
    e.preventDefault();
    this.props.archiveNote(this.state.note.id, this.state.index);
    this.setState({ showArchiveDialog: !this.state.showArchiveDialog, note: {}, index: null });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  };

  handleAddNote = e => {
    e.preventDefault();
    this.props.addNote(this.refs.noteInput.getValue(), this.props.incident.id);
    this.setState({ content: '' });
  };

  handleEditNote = e => {
    e.preventDefault();
    this.setState({ showEditDialog: !this.state.showEditDialog });
    this.props.editNote(this.refs.notesTextField.getValue(), this.state.note.id, this.state.index);
  };

  handleDateString = date => {
    return moment(date).format('MMM Do YYYY [at] h:mm a');
  };

  render() {
    const archiveActions = [
      <CustomButton key={1} label="Cancel" onClick={this.handleCloseArchiveDialog} />,
      <CustomButton key={2} label="Archive" onClick={this.handleArchiveNote} />
    ];
    const editActions = [
      <CustomButton key={3} label="Cancel" onClick={this.handleCloseEditDialog} />,
      <CustomButton key={4} label="Submit" onClick={this.handleEditNote} />
    ];
    const { notes } = this.props.incident;
    return (
      <div className="notes-container">
        <List className="notes-list">
          {notes.length > 0 ? (
            notes.map((note, i) => {
              return (
                <ListItem className="notes-list-item" key={i} disabled>
                  <div className="single-note-container">
                    <div className="note-header">
                      <span className="timestamp">
                        {' '}
                        {note.User ? note.User.username : 'Unknown'} on {this.handleDateString(note.createdAt)}{' '}
                      </span>
                    </div>
                    <Divider className="note-divider" />
                    <div className="note-content">{note.note}</div>
                    <div className="note-actions">
                      <ModeEdit className="note-action-edit" onClick={this.handleOpenEditDialog.bind(null, note, i)} />
                      <Archive
                        className="note-action-archive"
                        onClick={this.handleOpenArchiveDialog.bind(null, note, i)}
                      />
                    </div>
                  </div>
                </ListItem>
              );
            })
          ) : (
            <ListItem disabled> No Notes. </ListItem>
          )}
        </List>

        <div className="message-input">
          <form onSubmit={this.handleAddNote}>
            <TextField
              value={this.state.content}
              onChange={this.handleChange}
              hintText="Add a note"
              ref="noteInput"
              underlineShow={false}
              className="text-input"
            />
          </form>
        </div>

        <Dialog
          actions={archiveActions}
          modal={false}
          open={this.state.showArchiveDialog}
          onRequestClose={this.handleCloseArchiveDialog}
        >
          Are you sure you want to archive this note?
        </Dialog>

        <Dialog
          title={'Edit note'}
          actions={editActions}
          modal={false}
          open={this.state.showEditDialog}
          onRequestClose={this.handleCloseEditDialog}
        >
          <TextField defaultValue={this.state.note.note} fullWidth multiLine rows={3} ref="notesTextField" />
        </Dialog>
      </div>
    );
  }
}

TimelineNotes.propTypes = {
  incident: PropTypes.object.isRequired,
  addNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  loadIncidentDetails: PropTypes.func.isRequired,
  archiveNote: PropTypes.func.isRequired
};
