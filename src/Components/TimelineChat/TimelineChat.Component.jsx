import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

// styling
import './TimelineChat.scss';

export default class TimelineChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="chat-container">
        <List className="chat-list">
          <Subheader>Yesterday</Subheader>
          <ListItem
            leftAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="Robley Gori at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-left"
          />

          <ListItem
            rightAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="You at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-right"
          />

          <Divider inset />

          <Subheader>Today</Subheader>
          <ListItem
            leftAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="Robley Gori at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-left"
          />

          <ListItem
            rightAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="You at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-right"
          />

          <ListItem
            leftAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="Robley Gori at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-left"
          />

          <ListItem
            rightAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="You at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-right"
          />

          <ListItem
            leftAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="Robley Gori at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-left"
          />

          <ListItem
            rightAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="You at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-right"
          />

          <ListItem
            leftAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="Robley Gori at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-left"
          />

          <ListItem
            rightAvatar={<Avatar src={localStorage.getItem('user_avatar')} />}
            primaryText="You at 10:30 am"
            secondaryText={
              <p>I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
            }
            secondaryTextLines={2}
            className="chat-item-right"
          />
        </List>

        <div className="message-input">
          <TextField hintText="Type a message" underlineShow={false} multiLine className="text-input" />
        </div>
      </div>
    );
  }
}
