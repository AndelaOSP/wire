import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './AvailableUser.scss';

class AvailableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null
    };
  }

  /**
   * Method to handle position selection
   */
  handlePositionChange = (event, index, value) => {
    this.setState({ position: value });
  };

  handleRemove = userId => {};

  render() {
    const { imageUrl, username, role, country } = this.props;
    const styles = {
      fontSize: '1.2rem',
      width: '15vw',
      height: '5vh',
      backgroundColor: '#ffffff',
      marginTop: '1%'
    };
    return (
      <div className="user-card">
        <img className="user-img" src={imageUrl} />
        <div className="username">{username}</div>
        <div className="user-role">
          <span>{role}</span>
        </div>
        <div className="user-country">{country}</div>
        <div className="change-role">
          <SelectField
            underlineStyle={{ display: 'none' }}
            iconStyle={{ display: 'none' }}
            labelStyle={{
              textAlign: 'center',
              marginRight: '1vw',
              paddingRight: '0',
              color: '#49abb0',
              fontFamily: 'DIN Pro Extra Light',
              fontWeight: 'normal',
              fontStyle: 'normal',
              fontStretch: 'normal',
              letterSpacing: '0.3px'
            }}
            hintText="Change Position"
            hintStyle={{
              top: '1.5vh',
              textAlign: 'center',
              marginLeft: '1.85vw',
              color: '#49abb0',
              fontFamily: 'DIN Pro Extra Light',
              fontWeight: 'normal',
              fontStyle: 'normal',
              fontStretch: 'normal',
              letterSpacing: '0.3px'
            }}
            menuStyle={{
              width: '7vw',
              left: '2vw'
            }}
            menuItemStyle={{
              fontSize: '1rem',
              fontFamily: 'DIN Pro Extra Light',
              fontWeight: '300',
              fontStyle: 'normal',
              fontStretch: 'normal',
              letterSpacing: '0.3px'
            }}
            value={this.state.position}
            onChange={this.handlePositionChange}
            className="available-user-menu"
            style={styles}
          >
            <MenuItem value="Admin" primaryText="Admin" />
            <MenuItem value="Assignee" primaryText="Assignee" />
          </SelectField>
        </div>
        <div className="remove" onClick={() => {}}>
          Remove
        </div>
      </div>
    );
  }
}

AvailableUser.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired
};

export default AvailableUser;
