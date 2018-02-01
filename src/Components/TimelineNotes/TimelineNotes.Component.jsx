import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Archive from 'material-ui/svg-icons/content/archive';
import Dialog from 'material-ui/Dialog';

// styling
import './TimelineNotes.scss';

// Components
import CustomButton from '../Button/Button.Component';

export default class TimelineNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchiveDialog: false
    };
  }

  handleOpenArchiveDialog = () => {
    this.setState({ showArchiveDialog: !this.state.showArchiveDialog });
  };

  handleCloseArchiveDialog = () => {
    this.setState({ showArchiveDialog: !this.state.showArchiveDialog });
  };

  handleArchiveNote = e => {
    e.preventDefault();
    this.setState({ showArchiveDialog: !this.state.showArchiveDialog });
  };

  render() {
    const actions = [
      <CustomButton key={1} label="Cancel" onClick={this.handleCloseArchiveDialog} />,
      <CustomButton key={2} label="Archive" onClick={this.handleArchiveNote} />
    ];
    return (
      <div className="notes-container">
        <List className="notes-list">
          <Subheader className="subheader">Yesterday</Subheader>
          <ListItem className="notes-list-item">
            <div className="single-note-container">
              <div className="note-header">
                <span className="timestamp"> 11:45 PM </span>
              </div>
              <Divider className="note-divider" />
              <div className="note-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat
                volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
                pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui
                mauris, mattis quis lacus id, pellentesque lobortis odio.
              </div>
              <div className="note-actions">
                <ModeEdit className="note-action-edit" />
                <Archive className="note-action-archive" onClick={this.handleOpenArchiveDialog} />
              </div>
            </div>
          </ListItem>

          <ListItem className="notes-list-item">
            <div className="single-note-container">
              <div className="note-header">
                <span className="timestamp"> 11:45 PM </span>
              </div>
              <Divider className="note-divider" />
              <div className="note-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat
                volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
                pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui
                mauris, mattis quis lacus id, pellentesque lobortis odio.
              </div>
              <div className="note-actions">
                <ModeEdit className="note-action-edit" />
                <Archive className="note-action-archive" onClick={this.handleOpenArchiveDialog} />
              </div>
            </div>
          </ListItem>

          <ListItem className="notes-list-item">
            <div className="single-note-container">
              <div className="note-header">
                <span className="timestamp"> 11:45 PM </span>
              </div>
              <Divider className="note-divider" />
              <div className="note-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat
                volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
                pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui
                mauris, mattis quis lacus id, pellentesque lobortis odio.
              </div>
              <div className="note-actions">
                <ModeEdit className="note-action-edit" />
                <Archive className="note-action-archive" onClick={this.handleOpenArchiveDialog} />
              </div>
            </div>
          </ListItem>

          <Divider />

          <Subheader className="subheader">Today</Subheader>
          <ListItem className="notes-list-item">
            <div className="single-note-container">
              <div className="note-header">
                <span className="timestamp"> 11:45 PM </span>
              </div>
              <Divider className="note-divider" />
              <div className="note-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat
                volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
                pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui
                mauris, mattis quis lacus id, pellentesque lobortis odio.
              </div>
              <div className="note-actions">
                <ModeEdit className="note-action-edit" />
                <Archive className="note-action-archive" onClick={this.handleOpenArchiveDialog} />
              </div>
            </div>
          </ListItem>

          <ListItem className="notes-list-item">
            <div className="single-note-container">
              <div className="note-header">
                <span className="timestamp"> 11:45 PM </span>
              </div>
              <Divider className="note-divider" />
              <div className="note-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat
                volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
                pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui
                mauris, mattis quis lacus id, pellentesque lobortis odio.
              </div>
              <div className="note-actions">
                <ModeEdit className="note-action-edit" />
                <Archive className="note-action-archive" onClick={this.handleOpenArchiveDialog} />
              </div>
            </div>
          </ListItem>

          <ListItem className="notes-list-item">
            <div className="single-note-container">
              <div className="note-header">
                <span className="timestamp"> 11:45 PM </span>
              </div>
              <Divider className="note-divider" />
              <div className="note-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat
                volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
                pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui
                mauris, mattis quis lacus id, pellentesque lobortis odio.
              </div>
              <div className="note-actions">
                <ModeEdit className="note-action-edit" />
                <Archive className="note-action-archive" onClick={this.handleOpenArchiveDialog} />
              </div>
            </div>
          </ListItem>
        </List>

        <div className="message-input">
          <TextField hintText="Add a note" underlineShow={false} multiLine className="text-input" />
        </div>

        <Dialog
          actions={actions}
          modal={false}
          open={this.state.showArchiveDialog}
          onRequestClose={this.handleCloseArchiveDialog}
        >
          Are you sure you want to archive this note?
        </Dialog>
      </div>
    );
  }
}
