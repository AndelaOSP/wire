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
    this.props.sendMessage(this.props.incident.id, this.refs.messageInput.getValue());
    this.setState({ message: '' });
  };

  handleDateString = date => {
    return moment(date).format('[at] h:mm a');
  };

  render() {
    const { chats } = this.props.incident;
    return (
      <div className="chat-container">
        <List className="chat-list">
        {
          chats.length > 0 ? (
            chats.map((chat, i) => {
              return <div className="message-header" key={i}>
              <span>
                  {chat.User ? `${chat.User.username}${this.handleDateString(chat.createdAt)}` : 'You'
                  }
              </span>
                {/* <img src={chat.User.imageUrl} /> */}
                  <div className="message-bubble">
                    <p>{chat.chat}</p>
                  </div>
                </div>;
            })
          ):
          <div>
            <p>No Messages</p>
            </div>
        }
        </List>
        <div className="message-container">
          <img src="/assets/images/clip.svg" color="red" className="notification-icon" />
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
          <div className="message-icon">
            <img src="/assets/images/smile.svg" className="message-icon" />
        </div>
         </div>
      </div>
    );
  }
}

TimelineChat.propTypes = {
  incident: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};
