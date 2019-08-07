import PropTypes from 'prop-types';
import React from 'react';

/**
 * REVIEW: Using the old experimental context API because of old React version
 * This component class makes down socket object available to children component
 */
export default class SocketProvider extends React.Component {
  /**
   * Makes socket object available to a child component
   */
  getChildContext() {
    return { socket: this.props.socket };
  }

  render() {
    // const children = this.props.messages.map(message => <Message text={message.text} />);
    return <div>{this.props.children}</div>;
  }
}

// Needed for passing context down to children
SocketProvider.childContextTypes = {
  socket: PropTypes.object,
};

SocketProvider.propTypes = {
  socket: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

SocketProvider.defaultProps = {
  socket: null,
  children: [],
};
