import React, { Component } from 'react';
import List from 'material-ui/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import moment from 'moment';
import Chat from '../Chat/Chat.Component';
import InputBox from '../InputBox/InputBox.Component';
import './TimelineChat.scss';
import { allChats } from '../../../mock_endpoints/mockData';

class TimelineChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ message: e.target.value });
  };

  handlePostMessage = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.props.incident.id, this.refs.messageInput.getValue());
    this.setState({ message: '' });
  };

  handleDateString = date => moment(date).format('[at] h:mm a');

  groupedChatsDate = (date) => {
    let dateString = moment(date).format('MMMM Do YYYY');

    const today = moment();
    const yesterday = moment().subtract(1, 'day');

    if (moment(date).isSame(today, 'day')) {
      dateString = 'Today';
    } else if (moment(date).isSame(yesterday, 'day')) {
      dateString = 'Yesterday';
    }

    return dateString;
  }
  
  // moment(date).format('MMMM Do YYYY');

  groupChatByDate = (chats) => {
    const dayChat = chats.reduce((groupedChats, chat) => {
      const date = chat.createdAt.slice(0, 10);
      if (!groupedChats[date]) {
        // eslint-disable-next-line no-param-reassign
        groupedChats[date] = { date: chat.createdAt, chats: [chat] };
      } else {
        groupedChats[date].chats.push(chat);
      }
      return groupedChats;
    }, {});

    return dayChat;
  }

  sortGroupedChats = (chats) => {
    const ordered = {};
    Object.keys(chats).sort().forEach((key) => {
      ordered[key] = chats[key];
    });
    return ordered;
  }

  render() {
    const dayChats = this.sortGroupedChats(this.groupChatByDate(allChats));
    return (
      <div className="chat-container">
        {Object.entries(dayChats).map(([, { date, chats }]) => (
          <List className="chat-list" key={date}>
            <div className="chat-date">{this.groupedChatsDate(date)}</div>
            {chats.length > 0 ? (
              chats.map((chat, i) => (
                <ListItem key={i}>
                  <Chat chat={chat} handleDateString={this.handleDateString} />
                </ListItem>
                
              ))
            ) : (
              <div className="no-message">
                <p>No Messages</p>
              </div>
            )}
            <div className="chat-divider" />
          </List>
        ))}
        <InputBox 
          onSubmit={this.handlePostMessage}
          value={this.state.message}
          onChange={this.handleChange}
          hintText="Type a message"
          ref="messageInput"
        />
      </div>
    );
  }
}

TimelineChat.propTypes = {
  incident: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default TimelineChat;
