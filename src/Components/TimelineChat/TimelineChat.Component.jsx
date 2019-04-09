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
<<<<<<< HEAD
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
=======
    const chats = [
      {
        id: 'cju19obkm0000etcb2oek5n6j',
        chat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        createdAt: '2019-04-03T13:48:25.367Z',
        updatedAt: '2019-04-03T18:50:05.864Z',
        incidentId: 'cjfkubrlv0002tgxs3mre',
        userEmail: 'esther.mutua@andela.com',
        User: {
          id: 'cjl6efcka00004tny9ilz7b66',
          imageUrl: 'https://ca.slack-edge.com/T02R3LKBA-UC102AB50-a677bd700540-48',
          username: 'Esther Mutua',
        },
      },
      {
        id: 'cju0up5qr0002jvcb8s3pbygn',
        chat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        createdAt: '2019-04-03T06:49:10.227Z',
        updatedAt: '2019-04-05T08:10:11.082Z',
        incidentId: 'cjfkubrlv0002tgxs3mre',
        userEmail: 'david.mathenge@andela.com',
        User: {
          id: 'cjl6efcka00004tny9ilz7b66',
          imageUrl: 'https://lh4.googleusercontent.com/-4BWBm9AMBW8/AAAAAAAAAAI/AAAAAAAAAAc/Qn70vH_Gp0Q/s50/photo.jpg',
          username: 'David Mathenge',
        },
      },
      {
        id: 'cju19obkm0000etcb2oek5n6j',
        chat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        createdAt: '2019-04-03T13:48:25.367Z',
        updatedAt: '2019-04-03T18:50:05.864Z',
        incidentId: 'cjfkubrlv0002tgxs3mre',
        userEmail: 'esther.mutua@andela.com',
        User: {
          id: 'cjl6efcka00004tny9ilz7b66',
          imageUrl: 'https://ca.slack-edge.com/T02R3LKBA-UC102AB50-a677bd700540-48',
          username: 'Esther Mutua',
        },
      },
    ];
    return (
      <div className="chat-container">
        <List className="chat-list">
          {chats.length > 0 ? (
            chats.map((chat, i) => (
              <Chat chat={chat} key={i} handleDateString={this.handleDateString} />
            ))
          ) : (
            <div className="no-message">
              <p>No Messages</p>
            </div>
          )}
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
>>>>>>> feat(chats): seperate incoming and outgoing messages
      </div>
    );
  }
}

TimelineChat.propTypes = {
  incident: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default TimelineChat;
