import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      position: null,
      location: null
    };
  }

  /**
   * Method to handle email selection
   */
  handleEmailChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  /**
   * Method to handle position selection
   */
  handlePositionChange = (event, index, value) => {
    this.setState({ position: value });
  };

  /**
   * Method to handle location selection
   */
  handleLocationChange = (event, index, value) => {
    this.setState({ location: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { email, position, location } = this.state;
    this.props.handleInvite(email, position, location);
  };

  render() {
    const { open } = this.props;
    const styles = {
      marginTop: '3.3rem',
      marginLeft: '.85rem',
      border: '1px solid #e0e0e0',
      width: '92%',
      height: '3.2rem'
    };
    return (
      <div id="myModal" className="modal" style={{ display: open ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={this.props.handleClose}>
            &times;
          </span>
          <div className="modal-header">
            <p className="modal-heading">Add Users</p>
            <div className="modal-underline" />
          </div>
          <form className="modal-body" onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              id="email-input"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <SelectField
              underlineStyle={{ display: 'none' }}
              iconStyle={{ display: 'none' }}
              labelStyle={{ top: '-0.3vh', marginLeft: '1rem', color: '#95989a' }}
              hintText="Position"
              hintStyle={{ top: '1.4vh', marginLeft: '1rem', color: '#95989a' }}
              value={this.state.position}
              onChange={this.handlePositionChange}
              style={styles}
            >
              <MenuItem value="Admin" primaryText="Admin" />
              <MenuItem value="Assignee" primaryText="Assignee" />
            </SelectField>
            <SelectField
              underlineStyle={{ display: 'none' }}
              iconStyle={{ display: 'none' }}
              labelStyle={{ top: '-0.3vh', marginLeft: '1rem', color: '#95989a' }}
              hintText="Country"
              hintStyle={{ top: '1.4vh', marginLeft: '1rem', color: '#95989a' }}
              value={this.state.location}
              onChange={this.handleLocationChange}
              style={styles}
            >
              <MenuItem value="Kenya" primaryText="Kenya" />
              <MenuItem value="Nigeria" primaryText="Nigeria" />
              <MenuItem value="USA" primaryText="USA" />
              <MenuItem value="Uganda" primaryText="Uganda" />
            </SelectField>
            <div className="invite-button">
              <button type="submit" id="send-invite" onClick={this.props.handleClose}>
                Send Invite
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleInvite: PropTypes.func
};

export default Modal;
