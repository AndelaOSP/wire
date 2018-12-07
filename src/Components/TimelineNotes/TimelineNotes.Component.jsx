import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Archive from 'material-ui/svg-icons/content/archive';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import moment from 'moment';
import './TimelineNotes.scss';
import CustomButton from '../Button/Button.Component';

export default class TimelineNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchiveDialog: false,
      showEditDialog: false,
      content: '',
      note: {},
      index: null,
    };
  }

  handleOpenArchiveDialog = (note, index) => {
    this.setState({ showArchiveDialog: !this.state.showArchiveDialog, note, index });
  };

  handleCloseArchiveDialog = () => {
    this.setState({ note: {}, index: null, showArchiveDialog: !this.state.showArchiveDialog });
  };

  handleOpenEditDialog = (note, index) => {
    this.setState({ showEditDialog: !this.state.showEditDialog, note, index });
  };

  handleCloseEditDialog = () => {
    this.setState({ note: {}, index: null, showEditDialog: !this.state.showEditDialog });
  };

  handleArchiveNote = (e) => {
    e.preventDefault();
    this.props.archiveNote(this.state.note.id, this.state.index);
    this.setState({ showArchiveDialog: !this.state.showArchiveDialog, note: {}, index: null });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  };

  handleAddNote = (e) => {
    e.preventDefault();
    this.props.addNote(this.refs.noteInput.getValue(), this.props.incident.id);
    this.setState({ content: '' });
  };

  handleEditNote = (e) => {
    e.preventDefault();
    this.setState({ showEditDialog: !this.state.showEditDialog });
    this.props.editNote(this.refs.notesTextField.getValue(), this.state.note.id, this.state.index);
  };

  handleDateString = date => moment(date).format('MMM Do YYYY [at] h:mm a');

  render() {
    const archiveActions = [
      <CustomButton key={1} label="Cancel" onClick={this.handleCloseArchiveDialog} />,
      <CustomButton key={2} label="Archive" onClick={this.handleArchiveNote} />,
    ];
    const editActions = [
      <CustomButton key={3} label="Cancel" onClick={this.handleCloseEditDialog} />,
      <CustomButton key={4} label="Submit" onClick={this.handleEditNote} />,
    ];
    const { notes } = this.props.incident;
    return (
      <div className="notes-container">
        <List className="notes-list">
          {notes.length > 0 ? (
            notes.map((note, i) => (
              <ListItem className="notes-list-item" key={i} disabled>
                <div className="single-note-container">
                  <div className="note-header">
                    <span className="timestamp">
                      {' '}
                      {this.handleDateString(note.createdAt)}
                      {' '}
                    </span>
                  </div>
                  <Divider className="note-divider" />
                  <div className="note-container">
                    <div className="note-content">
                      <p>{note.note}</p>
                    </div>
                  </div>
                  <div className="note-actions">
                    <ModeEdit className="note-action-edit" onClick={this.handleOpenEditDialog.bind(null, note, i)} />
                    <Archive
                        className="note-action-archive"
                        onClick={this.handleOpenArchiveDialog.bind(null, note, i)}
                      />
                  </div>
                </div>
              </ListItem>
            ))
          ) : (
            <div className="no-message">
              <p>No Notes Created</p>
            </div>
          )}
        </List>

        <div className="message-container">
          <img src="/assets/images/clip.svg" color="red" className="notification-icon" />
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
          <div className="message-icon">
            <img src="/assets/images/smile.svg" className="message-icon" />
          </div>
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
          title="Edit note"
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
  archiveNote: PropTypes.func.isRequired,
};
