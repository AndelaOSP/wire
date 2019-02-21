import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Archive from 'material-ui/svg-icons/content/archive';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
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
      myNotes: true,
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
    this.props.addNote(this.state.content, this.props.incident.id);
    this.setState({ content: '' });
  };

  handleEditNoteChange = (e) => {
    e.preventDefault();
    this.setState({ note: { ...this.state.note, note: e.target.value } });
  }

  handleEditNote = (e) => {
    e.preventDefault();
    this.setState({ showEditDialog: !this.state.showEditDialog });
    this.props.editNote(this.state.note.note, this.state.note.id, this.state.index);
  };

  handleMineAllNotesChange = () => {
    this.setState({ myNotes: !this.state.myNotes });
  }

  filterMyNotes = (notes) => {
    const myEmail = localStorage.getItem('email');
    const myNotes = notes.filter(note => note.userEmail === myEmail);
    return myNotes;
  }

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
    const incidentNotes = (this.state.myNotes) ? notes : this.filterMyNotes(notes)

    return (
      <div className="notes-container">
        <List className="notes-list">
          <div className="toggle-notes">
            <span className={ !this.state.myNotes ? 'toggle-label mine' : 'toggle-label' }>Mine</span>
            <Toggle
              thumbSwitchedStyle={{ backgroundColor: 'yellow' }}
              labelStyle={{ color: 'red' }}
              thumbStyle={{
                backgroundColor: '#1273bc',
                top: '0px',
                width: '25px',
                height: '25px',
              }}
              thumbSwitchedStyle={{
                width: '25px',
                height: '25px',
                backgroundColor: '#1273bc',
              }}
              trackStyle={{
                overflow: 'hidden',
                width: '60px',
                backgroundColor: 'transparent',
                border: '1px solid #1273bc',
              }}
              trackSwitchedStyle={{ backgroundColor: 'rgba(18, 115, 188, 0.5)' }}
              style={{ width: '50px' }}
              onToggle={this.handleMineAllNotesChange}
              toggled={this.state.myNotes}
            />
            <span className={!this.state.myNotes ? 'toggle-label' : 'toggle-label all'}>All Notes</span>
          </div>
          {incidentNotes.length > 0 ? (
            incidentNotes.map((note, i) => (
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
          <TextField
            value={this.state.note.note}
            onChange={this.handleEditNoteChange}
            fullWidth
            multiLine
            rows={3}
            ref="notesTextField"
          />
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