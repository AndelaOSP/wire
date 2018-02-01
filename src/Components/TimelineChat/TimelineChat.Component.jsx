import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import moment from 'moment';

// styling
import './TimelineChat.scss';

export default class TimelineChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ message: e.target.value });
  };

  handlePostMessage = e => {
    e.preventDefault();
    this.props.sendMessage(this.props.incident.id, localStorage.getItem('userId'), this.refs.messageInput.getValue());
    this.setState({ message: '' });
  };

  handleDateString = date => {
    return moment(date).format('MMM Do YYYY [at] h:mm a');
  };

  render() {
    const { chats } = this.props.incident;
    return (
      <div className="chat-container">
        <List className="chat-list">
          {chats.length > 0 ? (
            chats.map((chat, i) => {
              return (
                <ListItem
                  leftAvatar={<Avatar src={chat.User.imageUrl} />}
                  primaryText={`${chat.User.name} on ${this.handleDateString(chat.createdAt)}`}
                  secondaryText={<p> {chat.chat} </p>}
                  secondaryTextLines={2}
                  className="chat-item"
                  key={i}
                  disabled
                />
              );
            })
          ) : (
            <ListItem disabled> No messages. </ListItem>
          )}
        </List>

        <div className="message-input">
          <form onSubmit={this.handlePostMessage}>
            <TextField
              hintText="Type a message"
              value={this.state.message}
              onChange={this.handleChange}
              ref="messageInput"
              underlineShow={false}
              className="text-input"
            />
          </form>
        </div>
      </div>
    );
  }
}

TimelineChat.propTypes = {
  incident: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};
