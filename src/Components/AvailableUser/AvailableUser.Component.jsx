import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from './styles';
import './AvailableUser.scss';

class AvailableUser extends Component {
  /**
   * Method to handle position change
   */
  handlePositionChange = (e, i, value) => {
    const { id, index } = this.props;
    this.props.handlePositionChange(value, id, index);
  };

  /**
   * Method to handle user removal
   */
  handleRemove = () => {
    const { id, index, username } = this.props;
    alert(`Are you sure you want to remove ${username}`);
    this.props.handleRemove(id, index);
  };

  render() {
    const {
      imageUrl, username, role, country,
    } = this.props;
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
  handleRemove: PropTypes.func.isRequired,
};

export default AvailableUser;
