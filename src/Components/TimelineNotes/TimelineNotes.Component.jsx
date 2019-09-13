import React, { Component } from 'react';
import List from 'material-ui/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Archive from 'material-ui/svg-icons/content/archive';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
import moment from 'moment';
import InputBox from '../InputBox/InputBox.Component';
import './TimelineNotes.scss';

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
    this.props.editNote(this.state.note.note, this.state.note.id, this.state.index);
    this.setState({ showEditDialog: !this.state.showEditDialog });
  };

  handleMineAllNotesChange = () => {
    this.setState({ myNotes: !this.state.myNotes });
  }

  filterMyNotes = (notes) => {
    const myEmail = localStorage.getItem('email');
    const myNotes = notes.filter(note => note.userEmail === myEmail);
    return myNotes;
  }

  groupNotesByDate = (notes) => {
    const dayNotes = notes.reduce((groupedNotes, note) => {
      const date = note.createdAt.slice(0, 10);
      if (!groupedNotes[date]) {
        // eslint-disable-next-line no-param-reassign
        groupedNotes[date] = { date: note.createdAt, notes: [note] };
      } else {
        groupedNotes[date].notes.push(note);
      }
      return groupedNotes;
    }, {});

    return dayNotes;
  }

  sortGroupedNotes = (notes) => {
    const ordered = {};
    Object.keys(notes).sort().forEach((key) => {
      ordered[key] = notes[key];
    });
    return ordered;
  }

  handleDateString = (date) => {
    let dateString = moment(date).format('LL');

    const today = moment();
    const yesterday = moment().subtract(1, 'day');

    if (moment(date).isSame(today, 'day')) {
      dateString = 'Today';
    } else if (moment(date).isSame(yesterday, 'day')) {
      dateString = 'Yesterday';
    }

    return dateString;
  };

  handleTimeString = date => moment(date).format('h:mm a');

  render() {
    const styles = {
      archiveButton: {
        backgroundColor: '#1273bc',
        color: '#ffffff',
        marginLeft: '10px',
      },
      dialogtext: {
        paddingRight: '150px',
        marginBottom: '20px',
      },
    };
    const { notes: propNotes } = this.props.incident;
    const incidentNotes = (this.state.myNotes) ? propNotes : this.filterMyNotes(propNotes);
    const dayNotes = this.sortGroupedNotes(this.groupNotesByDate(incidentNotes));

    return (
      <div>
        <div className="notes-toggle">
          <span className={!this.state.myNotes ? 'toggle-label mine' : 'toggle-label'}>Mine</span>
          <Toggle
            thumbSwitchedStyle={{ backgroundColor: 'yellow' }}
            labelStyle={{ color: 'red' }}
            thumbStyle={{
              backgroundColor: '#1273bc',
              top: '0px',
              width: '25px',
              height: '25px',
            }}
            thumbSwitchedStyle={{ // eslint-disable-line
              backgroundColor: '#1273bc', // eslint-disable-line
            }} // eslint-disable-line
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
        <div className="notes-container">
          <List className="notes-messages">
            {/* Iterate through the each day entry */}
            {Object.entries(dayNotes).map(([, { date, notes }]) => (
              <List className="notes-list" key={date}>
                {/* DATE */}
                <div className="note-date">{this.handleDateString(date)}</div>
                {notes.length > 0 ? (
                  notes.map((note, i) => (
                    <ListItem className="notes-list-item" key={i} disabled>
                      <div className="single-note-container">
                        <div className="note-header">
                          <span className="timestamp">
                            {' '}
                            {this.handleTimeString(note.createdAt)}
                            {' '}
                          </span>
                        </div>
                        <Divider className="note-time-underline" />
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
                <div className="note-divider" />
              </List>
            ))
            }
          </List>
          <div className="message-border" />

          <InputBox
            onSubmit={this.handleAddNote}
            value={this.state.content}
            onChange={this.handleChange}
            hintText="Add a note"
            ref="noteInput"
          />

          <Dialog
            modal={false}
            open={this.state.showArchiveDialog}
            onClose={this.handleCloseArchiveDialog}
            PaperProps={
              {
                style:
                  {
                    paddingTop: '20px',
                    paddingRight: '5px',
                    paddingLeft: '20px',
                  },
              }
            }
          >
            <DialogContentText style={styles.dialogtext}>
              Are you sure you want to archive this note?
            </DialogContentText>
            <DialogActions>
              <div className="archive-note-dialog">
                <Button size="small" onClick={this.handleCloseArchiveDialog}> Cancel </Button>
                <Button variant="contained" style={styles.archiveButton} size="small" onClick={this.handleArchiveNote}> Archive </Button>
              </div>
            </DialogActions>
          </Dialog>

          <Dialog
            title="Edit note"
            modal={false}
            open={this.state.showEditDialog}
            onClose={this.handleCloseEditDialog}
            PaperProps={
              {
                style:
                  {
                    width: '2500px',
                  },
              }
            }
          >
            <DialogContent>
              <TextField
                value={this.state.note.note}
                onChange={this.handleEditNoteChange}
                fullWidth
                multiLine
                rows={2}
                ref="notesTextField"
              />
            </DialogContent>
            <DialogActions>
              <div className="archive-note-dialog">
                <Button size="small" onClick={this.handleCloseEditDialog}> Cancel </Button>
                <Button variant="contained" style={styles.archiveButton} size="small" onClick={this.handleEditNote}> Submit </Button>
              </div>
            </DialogActions>
          </Dialog>
        </div>
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
