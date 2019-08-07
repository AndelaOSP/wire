import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';

class Chat extends Component {
  getClass = (email) => {
    const currentUser = localStorage.getItem('email');
    return currentUser === email
      ? ('--outgoing')
      : ('--incoming');
  }

  renderSenderImage = chat => (
    <img src={chat.slackUser.imageUrl} />
  )

  renderMessageContent = (chat, handleDateString) => (
    <div>
      <div className={`message-header message-header${this.getClass(chat.slackUser.email)}`}>
        <span className="username">{chat.slackUser.username}</span>
        {' '}
        <span className="time">{handleDateString(chat.createdAt)}</span>
      </div>
      <div className={`message-body message-body${this.getClass(chat.slackUser.email)}`}>
        <span>
          {chat.text}
        </span>
      </div>
    </div>
  )

  render() { 
    const { chat, handleDateString } = this.props;
    const currentUser = localStorage.getItem('email');
    return (
      <React.Fragment>
        {
          currentUser !== chat.slackUser.email ? (
            <div className={`message-item message-item${this.getClass(chat.slackUser.email)}`}>
              <div className="message-sender-image">
                {
                  this.renderSenderImage(chat)
                }
              </div>
              <div className="message-content">
                {
                  this.renderMessageContent(chat, handleDateString)
                }
              </div>
            </div>
          ) 
            : (
              <div className={`message-item message-item${this.getClass(chat.slackUser.email)}`}>
                <div className="message-content">
                  {
                    this.renderMessageContent(chat, handleDateString)
                  }
                </div>
                <div className="message-sender-image">
                  {
                    this.renderSenderImage(chat)
                  }
                </div>
              </div>
            )
        }
        
      </React.Fragment>
    );
  }
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  handleDateString: PropTypes.func.isRequired,
};
 
export default Chat;
