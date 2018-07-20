import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { open } = this.props;
    return (
      <div id="myModal" className="modal" style={{ display: open ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={this.props.handleClose}>
            &times;
          </span>
          <p className="modal-heading">Add Users</p>
          <div className="modal-body">
            <input type="email" id="email-input" placeholder="Email Address" />
            <input type="text" id="position-input" placeholder="Position" />
            <div className="invite-button">
              <button id="send-invite">Send Invite</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default Modal;
