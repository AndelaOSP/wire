import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './Modal.scss';
import { width } from 'window-size';

class Modal extends Component {
  constructor(props) {
    super(props);
  }


  handleChange = (event, index, value) => {
    this.props.changeCountryFilter(value);
    this.setState({ value });
  };



  render() {
    const { open } = this.props;
    const styles = { marginTop: '5rem', border: '1px solid #e0e0e0', width: '21rem', height: '2.7rem' }
    return (
      <div id="myModal" className="modal" style={{ display: open ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={this.props.handleClose}>
            &times;
          </span>
          <div className="modal-header">
            <p className="modal-heading">Add Users</p>
            <div className="modal-underline"/>
          </div>
          <div className="modal-body">
            <input type="email" id="email-input" placeholder="Email Address" />
            <SelectField
              underlineStyle={{ display: 'none' }}
              iconStyle={{ display: 'none' }}
              floatingLabelText="Position"
              floatingLabelStyle={{ marginLeft: '1rem', color: '#95989a'}}
              labelStyle={{ textAlign: 'center', marginLeft: '1.85vw' }}
              menuItemStyle={{ textAlign: 'center'}}
              value={{}}
              onChange={this.handleChange}
              className="custom-menu"
              style={styles}
            >
              <MenuItem value="Admin" primaryText="Admin" />
              <MenuItem value="Assignee" primaryText="Assignee" />
            </SelectField>
            <SelectField
              underlineStyle={{ display: 'none' }}
              iconStyle={{ display: 'none' }}
              floatingLabelText="Country"
              floatingLabelStyle={{ marginLeft: '1rem', color: '#95989a' }}
              labelStyle={{ textAlign: 'center', marginLeft: '1.85vw' }}
              menuItemStyle={{ textAlign: 'center' }}
              value={{}}
              onChange={this.handleChange}
              className="custom-menu"
              style={styles}
            >
              <MenuItem value="Kenya" primaryText="Kenya" />
              <MenuItem value="Nigeria" primaryText="Nigeria" />
              <MenuItem value="USA" primaryText="USA" />
              <MenuItem value="Uganda" primaryText="Uganda" />
            </SelectField>
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
