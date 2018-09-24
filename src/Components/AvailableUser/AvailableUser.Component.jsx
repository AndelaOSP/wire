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
   * Method to handle position change
   */
  handlePositionChange = (e, i, value) => {
    this.setState({ position: value });
    let { id, index } = this.props;
    this.props.handlePositionChange(value, id, index);
  };

  /**
   * Method to handle user removal
   */
  handleRemove = () => {
    let { id, index,username} = this.props;
    alert(`Are you sure you want to remove ${username}`);
    this.props.handleRemove(id, index);
  };

  render() {
    const { imageUrl, username, role, country } = this.props;
    const styles = {
      selectField: {
        fontSize: '1.2rem',
        width: '10vw',
        height: '5vh',
        backgroundColor: '#ffffff'
      },
      iconStyles: {
        fill: '#00000',
        left: '3vw'
      },
      labelStyles: {
        textAlign: 'center',
        paddingRight: '0',
        color: '#49abb0',
        fontFamily: 'DIN Pro',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        letterSpacing: '0.3px'
      },
      hintStyles: {
        backgroundColor: '#F1F6F8',
        color: '#000',
        fontSize: '.9rem',
        height: '40px',
        width: '90px',
        lineHeight: '40px',
        paddingTop: '0',
        paddingRight: '0',
        top: '3px',
        textAlign: 'center',
        verticalAlign: 'none',
        borderRadius: '6px'
      },
      menuStyles: {
        width: '7vw',
        left: '2vw'
      },
      menuItemStyles: {
        fontSize: '1rem',
        fontFamily: 'DIN Pro',
        fontWeight: '300',
        fontStyle: 'normal',
        fontStretch: 'normal',
        letterSpacing: '0.3px'
      }
    };
    return (
      <div className="user-card">
        <img className="user-img" src={imageUrl} />
        <div className="username">{username}</div>
        <div className="user-country">{country}</div>
        <div className="change-role">
          <SelectField
            underlineStyle={{ display: 'none' }}
            iconStyle={styles.iconStyles}
            labelStyle={styles.labelStyles}
            hintText={role}
            hintStyle={styles.hintStyles}
            menuStyle={styles.menuStyles}
            menuItemStyle={styles.menuItemStyles}
            value={null}
            onChange={this.handlePositionChange}
            className="available-user-menu"
            style={styles.selectField}
          >
            <MenuItem value="Admin" primaryText="Admin" />
            <MenuItem value="Assignee" primaryText="Assignee" />
          </SelectField>
        </div>
        <div className="remove" onClick={this.handleRemove}>
          Remove
        </div>
      </div>
    );
  }
}

AvailableUser.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  index: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  handlePositionChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default AvailableUser;
